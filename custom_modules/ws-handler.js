import { args }    from '../config/connect';
import { server }  from '../api/routes.js';
import { priceDB } from './price-handler';
import { db }      from './db-handler';
const chalk = require('chalk');
const io = require('socket.io')(server, { wsEngine: 'ws' });
const WebSocket = require('ws');

console.log(chalk.green('[Chalk] Hello world!'));

let arrayMsg = [];
let data = 'data incoming...'


const cexioWS = function(client){
    
    // Connect to CEX.io ws-APi
    const cexWS = new WebSocket('wss://ws.cex.io/ws/', { perMessageDeflate: false });
    console.log('[cexioWS] - starting'); 
    cexWS.on('open', function(){
        // console.log(chalk.green('[cexioWS] - open') ); 

        cexWS.on('message', function(el){
            // console.log('[CEX server] message:', el);
            let msg = JSON.parse(el);

            if(client){
                // Gets all prices from Database
                priceDB.get(function(docs){client.emit('btc', docs)} )
            }
            else(
                console.log(chalk.red('[CEX server] WS client error'))
            )
            if(msg['e'] === 'ping'){
                //console.log('[CEX client] Connection active')
                cexWS.send(JSON.stringify({"e":"pong"}));
            }
    
            if(client && msg.data){
                if(msg.data.symbol1){
                    // We consider only price in USD            
                    if(msg.data.symbol2 === 'USD'){
                        // Update price in the Database and emit new price via WS
                        priceDB.handle(msg.data, function(docs){client.emit('btc', docs)} )
                    } else {
                        // Prices updates in other currencies
                        //console.log('[CEX server] BTC', JSON.stringify(msg.data) );
                    }
                }
            }
        });
    
    
        cexWS.on('open',    (el) => console.log('[CEX.io] open: ',el) );
        cexWS.on('error',   (el) => console.log('[CEX.io] error: ',el) );
        cexWS.on('close',   (el) => console.log('[CEX.io] close: ',el) );
        cexWS.send( JSON.stringify(args) );
    
        cexWS.send(JSON.stringify({
            e: 'subscribe',
            rooms: ['tickers']
            })
        )
    });

}


const getUsers = (client) => {
    db.getUsers(
        (list) => {
            client.emit('userList', list)
            //console.log(chalk.blue('[WS-handler] Emitting...'))
            setTimeout(() => {
                getUsers(client)
            }, 4000);
        }
    )
}

export const ioServer = io.on('connection', function(client){
    
    console.log(chalk.blue('[Socket.io] Connected'));

    client.on('chatMessage', (msg) => {
        console.log('[Socket.io] receiving Msg: ', msg);
        arrayMsg.push(msg);
        client.emit('arrayMessage', arrayMsg)
    });

    client.on('subscribeToListUpdates', () => {
        console.log('[Socket.io] Client is subscribing to timer with interval 4000');
        getUsers(client);
});
    client.on('btc', () => priceDB.get(function(docs){client.emit('btc', docs)} ) )
    cexioWS(client);

});