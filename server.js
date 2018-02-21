const express = require('express');
//const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
import { cookie } from './custom_modules/cookie-handler';
import { db } from './custom_modules/db-handler';
import { session } from './custom_modules/session-handler';

db.init();

//app.use(express.static(__dirname));
app.use(express.static('client/build'));
//app.use(cors({ origin: 'null', credentials: true }));


app.get('/api/', (req, res) => {
    let response = { express: 'Hello From Express' };
    // 1. set cookie
    cookie.handle(req);
    // 2.1 set session
    // 2.2 return connection status 
    session.handle(req);
    // 3. if connected return user info
    db.handle(req, data => {
        console.log('[API] response:', data);
        res.json(data);
    });
    
});

app.listen(port, () => console.log(`Listening on port ${port}`));