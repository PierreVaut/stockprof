import React from 'react';
import openSocket from 'socket.io-client';
import { TimelineItem } from './timelineItem';

const socket = openSocket();

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };

    this.getArray(stuff => this.setState({ response: stuff }));
  }

  componentDidMount() {
    socket.on('timeline', stuff => {
      console.log({ stuff });
      this.setState({ response: stuff });
    });
    socket.emit('timeline', 'salut!');
  }

  getArray(cb) {
    console.log('getArray !');
    socket.on('timeline', stuff => cb(stuff));
  }

  render() {
    return (
      <div className="user">
        { this.state.response.map(el =>
          <TimelineItem {...el} />) }
      </div>
    );
  }
}

export default Timeline;
