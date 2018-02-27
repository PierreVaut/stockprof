const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const io = require('socket.io')();
import { cookie } from './custom_modules/cookie-handler';
import { db } from './custom_modules/db-handler';
import { session } from './custom_modules/session-handler';

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
    cookie.handle( req, data, (data) => {

        // First create user in the DB
        db.register( req, data, (data) => {

            // Then create/update session
            session.register( req, data, (data) => {    
                console.log('[DB-Register] Response:', data);
                res.json(data);        
            });
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
    cookie.handle( req, data, (data) => {

        // Get user in the DB
        db.login( req, data, (data) => {

            // Then create/update session
            session.register( req, data, (data) => {    
                console.log('[DB-Register] Response:', data);
                res.json(data);        
            });
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
    cookie.remove( req, data, (data) => {
        session.disconnect( req, data, (data)=>{
            res.json(data);
        })
    })

    
});

app.get('/api/', (req, res) => {
    
    let data =  {
        'cookie': '',
        'session': {},
        'account': {}
    }

    res.json(
        // Set or retrieve cookie
        cookie.handle( req, data, function(data){

            // Set or retrieve session info
            session.handle( req, data, function(data){

                // Pass session info to DB to get user info
                db.handle( req, data, function(data){
                    console.log('[DB] Response:', data);
                    return ( data );
                });
            });
        })
    )
});

let arrayMsg = [];
io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
    });
    client.on('message', (msg) => {
        console.log('[Socket.io] receiving Msg: ', msg);
        arrayMsg.push(msg);
        console.log('[Socket.io] Emmitting ArrayMsg: ', arrayMsg);
        client.emit('arrayMessage', arrayMsg)
    });
});

io.listen(8888, () => console.log(`Socket.io: listening on port 8888`));

app.listen(port, () => console.log(`Listening on port ${port}`));