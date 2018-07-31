import React from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { receiveChatItem as receiveChatItemAC,
  receiveChatHistory as receiveChatHistoryAC,
  flushChatHistory as flushChatHistoryAC,
} from '../../actions';
import ChatItem from './chatItem';
import { GuestMenu } from '../common';

const socket = openSocket();

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      _id: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillReceiveProps() {
    const { _id, name } = this.props.account;
    const connection = {
      emitterId: _id,
      emitterName: name,
      targetId: this.props.match.params.id,
    };
    if (_id && _id !== this.state._id) {
      this.setState({ _id });
      socket.emit('chatMessage', connection);
    }
    socket.on(_id, data => {
      if (data.history) {
        this.props.receiveChatHistory(data.history);
      } else if (data.item && !this.props.chatHistory.includes(data.item)) {
        this.props.receiveChatItem(data.item);
      } else {
        console.log('Item already in store');
      }
    });
  }


  componentWillUnmount() {
    socket.close();
    this.props.flushChatHistory();
  }

  handleChange(event) {
    this.setState({ msg: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.msg.length > 0) {
      const { _id } = this.props.account;
      const newMsg = {
        emitterId: _id,
        targetId: this.props.match.params.id,
        content: this.state.msg,
        timestamp: Date.now(),
      };
      socket.emit(_id, newMsg);
      this.props.receiveChatItem(newMsg);
      this.setState({ msg: '' });
    }
  }


  render() {
    if (this.props.account && this.props.account.isLogged) {
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
    return <GuestMenu />;
  }
}

const mapStateToProps = state => state.dataReducer;

const mapDispatchToProps = dispatch => ({
  receiveChatItem: data => dispatch(receiveChatItemAC(data)),
  receiveChatHistory: data => dispatch(receiveChatHistoryAC(data)),
  flushChatHistory: () => dispatch(flushChatHistoryAC()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
