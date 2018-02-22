const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

import { cookie } from './custom_modules/cookie-handler';
import { db } from './custom_modules/db-handler';
import { session } from './custom_modules/session-handler';

db.init();

//app.use(express.static(__dirname));
app.use(express.static('client/build'));
app.use(cors({ origin: 'null', credentials: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.get('/api/', (req, res) => {

    // 1. set cookie
    let currentCookie = cookie.handle(req);

    // 2. set session and return session info
    session.handle(req,
        (session) => {
            db.handle(req, session, response => {
                // 3. if connected return user info
                console.log('[DB] response:', response);
                res.json({'session': session, 'db': response, 'cookie': currentCookie});
            });
        }
    );    
});

app.listen(port, () => console.log(`Listening on port ${port}`));