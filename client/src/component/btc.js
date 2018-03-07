import React from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket();


class Btc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            btc: 'no data'
        }

        this.getBTC((err, msg) => this.setState({'btc': JSON.stringify(msg)}));
    }

    getBTC(cb) {
        socket.on('btc',  msg => {
            //console.log('[React] socket.io client:', msg)
            cb(null, msg)
        });
        
      }

    render() {
        return (
            <div>
                <h2>Realtime BTC (via CEX.io)</h2>
                <p>This.state.btc: { this.state.btc }</p>
            </div>
    )}
}


export default Btc;