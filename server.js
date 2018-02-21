const express = require('express');
//const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
import { db } from './custom_modules/db-handler';

db.init();

//app.use(express.static(__dirname));
app.use(express.static('client/build'));
//app.use(cors({ origin: 'null', credentials: true }));


app.get('/api/', (req, res) => {
    let response = { express: 'Hello From Express' };

    db.getAccount( data => {
        console.log('[API] response:', data);
        res.json(data);
    });
    
});

app.listen(port, () => console.log(`Listening on port ${port}`));