const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
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
    
    console.log('*** Req.body: ', req.body.name);

    let data =  {
        'cookie': '',
        'session': {},
        'account': {},
        'request': req.body
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
    
    res.redirect(303, '/');
});

app.post('/disconnect', (req, res) => {

    res.redirect(303, '/');
});

app.get('/api/', (req, res) => {
    
    let data =  {
        'cookie': '',
        'session': {},
        'account': {}
    }

    // Set or retrieve cookie
    cookie.handle(
        req,
        data,
        function(data){

            // Set or retrieve session info
            session.handle(
                req,
                data,
                function(data){

                    // Pass session info to DB to get user info
                    db.handle(
                        req,
                        data,
                        function(data){
                            console.log('[DB] Response:', data);
                            res.json(data);
                        }
                    );
                }
            );
        }
    )
});



app.listen(port, () => console.log(`Listening on port ${port}`));