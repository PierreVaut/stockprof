import React from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket();

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };

    this.getArray(stuff => this.setState({ response: stuff }));
  }

  getArray(cb) {
    console.log('getArray !');
    socket.on('timeline', stuff => cb(stuff));
  }


  render() {
    return (
      <div>
        response :  {JSON.stringify(this.state.response)}
      </div>
    );
  }
}

export default Timeline;
