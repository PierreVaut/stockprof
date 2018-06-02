import React from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket();

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      msgArray: [],
      timestamp: 'no timestamp yet',
    };

    this.getArray((err, array) => this.setState({ msgArray: array }));
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  getArray(cb) {
    socket.on('arrayMessage', array => cb(null, array));
  }

  handleChange(event) {
    this.setState({ msg: event.target.value });
  }

  handleSubmit(event) {
    socket.emit('chatMessage', this.state.msg);
    event.preventDefault();
  }


  render() {
    return (
      <div>
            This is the timer value: {this.state.timestamp}

        <form onSubmit={this.handleSubmit}>
          <input
            name="msg"
            value={this.state.msg}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>

            Msg :     {this.state.msg} <br />
            result :  {this.state.msgArray}
      </div>
    );
  }
}

export default Chat;
