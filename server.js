// ES6 imports (enabled by Babel)
import { domain } from './config/domain';
import { cookie } from './custom_modules/cookie-handler';
import { session } from './custom_modules/session-handler';
import { db } from './custom_modules/db-handler';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(cors({ origin: 'null', credentials: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.set('port', (process.env.PORT || 5000));
db.init();

// Routes
app.get('/disconnect', (req, res) => {
    session.disconnect(cookieID);
    res.redirect(303, '/');
});

app.get('/', (req, res) => {
    cookie.handle(req, res);
    let cookieID = req.cookies[domain];
    console.log('[Server] cookie: ', cookieID);
    let userSession = session.log(cookieID);

    res.render('index.ejs', {
        'cookieID': cookieID,
        'sessionData': {
            isLogged: false,
            _id: 'test'},
        'dbData': 'test'}
    )
});


app.get('/api/', (req, res) => {
    let cookieID =  req.cookies[domain];
    console.log('[API] cookie: ', cookieID);
    let userSession = session.log(cookieID);
    res.json({result: null});
})

app.post('api/newAccount', (req, res)=>{
    db.newAccount(req.body, ()=>{res.redirect(303, '/api/req.params.id')});
})

app.listen(app.get('port'), () => {
    console.log('We are live on port: ' + app.get('port'));
});

// End of app
