import React from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { receiveChatItem as receiveChatItemAC,
} from '../../actions';
import ChatItem from './chatItem';

const socket = openSocket();

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      _id: '',
      // lastMsg: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillReceiveProps() {
    const { _id } = this.props.account;
    const connection = {
      emitterId: _id,
      targetId: this.props.match.params.id,
    };
    if (_id && _id !== this.state._id) {
      this.setState({ _id });
      console.log('Emitting', connection);
      socket.emit('chatMessage', connection);
    }
    socket.on(_id, data => {
      this.props.receiveChatItem(data);
    });
  }


  componentWillUnmount() {
    socket.close();
  }

  handleChange(event) {
    this.setState({ msg: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { _id } = this.props.account;
    const newMsg = {
      emitterId: _id,
      targetId: this.props.match.params.id,
      content: this.state.msg,
      timestamp: Date.now(),
    };
    socket.emit(_id, newMsg);
    this.props.receiveChatItem([newMsg]);
    this.setState({ msg: '' });
  }


  render() {
    const targetUser = this.props.userList.find(el => el._id === this.props.match.params.id);
    return (
      <div className="list-item-center">
        Chat with : { targetUser ? `${targetUser.name} (${targetUser._id})` : '' }

        <form onSubmit={this.handleSubmit}>
          <input
            name="msg"
            value={this.state.msg}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
            Msg :     {this.state.msg} <br /><br />

        {this.props.chatHistory ? this.props.chatHistory.map(props => (
          <ChatItem
            currentUser={this.props.account}
            targetUser={targetUser}
            {...props}
            key={props._id}
          />)) : <i>Pas encore de données</i>
            }

      </div>
    );
  }
}

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  receiveChatItem: data => dispatch(receiveChatItemAC(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
