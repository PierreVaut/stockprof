const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const server = app.listen(port);
const io = require('socket.io')(server);
console.log(`[Server] Node and Socket.io : listening on port ${port}`)
import { cookie } from './custom_modules/cookie-handler';
import { db } from './custom_modules/db-handler';
import { session } from './custom_modules/session-handler';
import { args } from './config/connect';

// Connect to CEX.io ws-APi
const WebSocket = require('ws');
const cexWS = new WebSocket('wss://ws.cex.io/ws/', { perMessageDeflate: false });

db.init();

app.use(express.static('client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post('/register', (req, res) => {

    let data =  {
        'cookie': '',
        'session': {},
        'account': {}
    }
    
    // Set or retrieve cookie
    cookie.handle( req, res, data, (data) => {

        // First create user in the DB
        db.register( req, res, data, (data) => {

            // Then create/update session File
            session.register( req, res, data);
        });
    });
});

app.post('/login', (req, res) => {
    let data =  {
        'cookie': '',
        'session': {},
        'account': {}
    }

    // Set or retrieve cookie
    cookie.handle( req, res, data, (data) => {

        // Get user in the DB
        db.login( req, res, data, (data) => {

            // Then create/update session
            session.register( req, res, data );
        });
    });
    
});

app.post('/disconnect', (req, res) => {
    let data =  {
        'cookie': '',
        'session': {},
        'account': {}
    }

    // Set or retrieve cookie
    cookie.remove( req, res, data, (data) => {
        session.disconnect( req, res, data )
    })

    
});

app.get('/api/', (req, res) => {
    
    let data =  {
        'cookie': '',
        'session': {},
        'account': {}
    }
        
    // Set or retrieve cookie
    cookie.handle( req, res, data, function(data){

        // Set or retrieve session info
        session.handle( req, res, data, function(data){

            // Pass session info to DB to get user info
            db.handle( req, res, data );
        });
    })
    
});

/*

*/

let arrayMsg = [];
io.on('connection', function(client){
    
    console.log('[Socket.io] Connected');
    client.on('subscribeToTimer', (interval) => {
        console.log('[Socket.io] Client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    client.on('chatMessage', (msg) => {
        console.log('[Socket.io] receiving Msg: ', msg);
        arrayMsg.push(msg);
        client.emit('arrayMessage', arrayMsg)
    });

    cexWS.on('open', function(){
        cexWS.on('message', function(el){
            console.log('[CEX server] message:', el)
            let msg = JSON.parse(el);
    
            client.emit('btc', msg);
    
            if(msg['e'] === 'ping'){
                console.log('[CEX client] Connection active')
                cexWS.send(JSON.stringify({"e":"pong"}));
            }
    
            if(msg.data){
                if((msg.data.symbol1 === "BTC" && msg.data.symbol2 === "EUR") ){
                    console.log('[CEX server] BTC: ', msg.data)
                    let temp = msg.data;
    
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

});


cexWS.on('open', function(){
    cexWS.on('message', function(el){
        console.log('[CEX server2] message:', el)
        let msg = JSON.parse(el);

        //client.emit('btc', msg);

        if(msg['e'] === 'ping'){
            console.log('[CEX client2] Connection active')
            cexWS.send(JSON.stringify({"e":"pong"}));
        }

        if(msg.data){
            if((msg.data.symbol1 === "BTC" && msg.data.symbol2 === "EUR") ){
                console.log('[CEX server2] BTC: ', msg.data)
                let temp = msg.data;

            }
        }
    });


    cexWS.on('open',    (el) => console.log('[CEX.io2] open: ',el) );
    cexWS.on('error',   (el) => console.log('[CEX.io2] error: ',el) );
    cexWS.on('close',   (el) => console.log('[CEX.io2] close: ',el) );
    cexWS.send( JSON.stringify(args) );

    cexWS.send(JSON.stringify({
        e: 'subscribe',
        rooms: ['tickers']
        })
    )
});





 




//io.listen(8888, () => console.log(`Socket.io: listening on port 8888`) );