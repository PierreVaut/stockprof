const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

import { cookie } from './custom_modules/cookie-handler';
import { db } from './custom_modules/db-handler';
import { session } from './custom_modules/session-handler';

db.init();

app.use(express.static('client/build'));

app.post('/register', (req, res) => {
    // create new Account
    db.register(req, 
        // set in session 'isLogged= true'
        (account) => {
            session.register(req, account['_id'],
            // callback : redirect to index
            res.redirect(303, '/')
        )}
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
    // Set/retrieve session
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