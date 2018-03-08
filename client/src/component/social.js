import React from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket();

class Social extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      msgArray: [],
      timestamp: 'no timestamp yet'
    };

    this.subscribeToTimer((err, timestamp) => this.setState({ 'timestamp': timestamp } ));
    this.getArray((err, array) => this.setState({ 'msgArray': array }));
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }

  getArray(cb) {
    socket.on('arrayMessage', array => cb(null, array));
  }

  handleChange(event) {
    this.setState({msg: event.target.value});
}

handleSubmit(event){
  socket.emit('chatMessage', this.state.msg);
  //console.log('[React-ws] chatMessage:', this.state.msg)
  event.preventDefault();
}


  render() {
    return (
      <div>
            <h2>Activity feed</h2>
            This is the timer value: {this.state.timestamp}

            <form onSubmit={this.handleSubmit}>
            <input 
              name= 'msg'
              value= {this.state.msg}
              onChange={this.handleChange}
           >
            </input>
            <button type='submit'>Send</button>
            </form>

            Msg :     {this.state.msg} <br/>
            result :  {this.state.msgArray}
      </div>
    );
  }
}

export default Social;