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
    console.log('[API] Register:', JSON.stringify(req.body) );
    // create new Account
    db.register(req, 
        // set in session 'isLogged= true'
        (account) => {
            if(!account){res.json({})}
            else{
                session.register(req, account['_id'], res.redirect(303, '/') )
            }
        }
    )
});

app.post('/login', (req, res) => {
    
    res.redirect(303, '/');
});

app.post('/disconnect', (req, res) => {

    res.redirect(303, '/');
});

app.get('/api/', (req, res) => {
    // Set/retrieve cookie
    let currentCookie = cookie.handle(req);
    // Set/retrieve session info
    session.handle(req,
        (session) => {
            // Pass session info to DB to get user info
            db.handle(req, session, data => {
                console.log('[DB] response:', data);
                res.json({'session': session, 'db': data, 'cookie': currentCookie});
            });
        }
    );    
});

app.listen(port, () => console.log(`Listening on port ${port}`));