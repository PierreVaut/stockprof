const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const server = app.listen(port);
const io = require('socket.io')(server);
const crypto = require('crypto');

console.log(`[Server] Node and Socket.io : listening on port ${port}`)
import { cookie } from './custom_modules/cookie-handler';
import { db } from './custom_modules/db-handler';
import { session } from './custom_modules/session-handler';
import { secret } from  './config/secret';


// Trying to connect to CEX ws-api
const WebSocket = require('ws');
const socket = new WebSocket('wss://ws.cex.io/ws/', { perMessageDeflate: false });
let timestamp = Math.floor(Date.now() / 1000);

let apiKey = secret.apiKey || process.env.API_KEY;
let apiSecret = secret.apiSecret || process.env.API_SECRET;


let signature = crypto.createHmac('sha256', apiSecret).update(timestamp + apiKey).digest('hex')
let args = {
    e: 'auth',
    auth: {
      key: apiKey,
      signature: signature,
      timestamp: timestamp
    }
}

socket.on('open', (res) => {
    socket.on('message', (el) => {
        console.log('[CEX.io] message: ',el)
        let msg = JSON.parse(el);
        if(msg['e'] === 'ping'){
            console.log('[CEX client] message: {e:pong}')
            socket.send(JSON.stringify({"e":"pong"}));
        }
    });
    socket.on('open',    (el) => console.log('[CEX.io] open: ',el) );
    socket.on('error',   (el) => console.log('[CEX.io] error: ',el) );
    socket.on('close',   (el) => console.log('[CEX.io] close: ',el) );
    socket.send( JSON.stringify(args) );

    socket.send(JSON.stringify({
          e: 'subscribe',
          rooms: ['tickers']
        })
    )
    socket.on('tick', (data) => {
        if(data.symbol1 === "BTC"){
            console.log('[CEX.io] tick: ', data)
        }
    })
   
});



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

let arrayMsg = [];
io.on('connection', (client) => {
    console.log('[Socket.io] Connected');
    client.on('subscribeToTimer', (interval) => {
        console.log('[Socket.io] Client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
    });

    client.on('subscribeToArray', () => {
        console.log('[Socket.io] Client is subscribing to Array');
        setInterval(() => {
            //console.log('[Socket.io] Emmitting arrayMsg', arrayMsg)
            client.emit('arrayMessage', arrayMsg)
            }, 1000);
    });

    client.on('message', (msg) => {
        console.log('[Socket.io] receiving Msg: ', msg);
        arrayMsg.push(msg);
        
    });




});
 




//io.listen(8888, () => console.log(`Socket.io: listening on port 8888`) );