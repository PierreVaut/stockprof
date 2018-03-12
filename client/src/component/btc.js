import React from 'react';
import openSocket from 'socket.io-client';
import Currency from './currency';
const socket = openSocket();


class Btc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            btc: [
                {symbol1: 'TEST',
                symbol2: 'USD',
                price: 12000,
                open24: 10000,
                timestamp: 0}
            ]
        }

        this.getBTC((err, msg) => {
            console.log('[BTC-component]', this.state.btc);
            this.setState({'btc': msg})
            
        });
    }

    getBTC(cb) {
        socket.on('btc',  msg => {
            //console.log('[React] socket.io client:', msg)
            socket.emit('getBTCprices')
            cb(null, msg)
        });
        
      }

    render() {
        let newPrices;
        return (
            <div>
                <h2>Realtime BTC (via CEX.io)</h2>
                {this.state.btc.map( el => <Currency {...el} key={el.symbol1} />)}
            </div>
    )}
}


export default Btc;