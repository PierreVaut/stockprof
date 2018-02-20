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


db.init();

// Express server configuration
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({ origin: 'null', credentials: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set('port', (process.env.PORT || 5000));

const stocksNameCode = {
    'iliad': 'ild.pa',
    'free': 'ild.pa',
    'google': 'googl',
    'alphabet': 'googl',
    'apple': 'aapl',
    'facebook': 'fb'
}


// Routes
app.get('/register', (req, res) => {

    userSession = session.log(cookieID);
    res.render('register.ejs', { msg: null })
})

app.post('/register', (req, res) => {
    let newName = req.body.name;
    let newEmail = req.body.email;
    let newPassword = req.body.password;

    if (!newName || !newEmail || !newPassword) {
        let error = 'Please fill in all fields'
        console.log('REGISTER error:', error)
            res.render('register.ejs', {msg: error})       
    }
            
    Account.findOne({email: newEmail}, (error, result) => {
        if (error){
            console.log(error)}
        if (result) {
            let errorMsg = 'Email already used';
            console.log('REGISTER error: ', errorMsg)  ;
            res.render('register.ejs', {msg: errorMsg});
        }
        else {
            let newAccount = new Account();
            console.log('REGISTER newAccount: ', req.body);
            newAccount.name = newName;
            newAccount.email = newEmail;
            newAccount.password = newPassword;
            newAccount.save(console.log('New account saved', newAccount['_id']));
            session.visit(req.cookies[domain], () => res.redirect(303, '/'), newAccount['_id']);
        }
    })
});

app.get('/login', (req, res) => {

    userSession = session.log(cookieID);
    res.render('login.ejs', { msg: null });
});

app.post('/login', (req, res) => {
    Account.findOne({'email': req.body.email}, (error, result) => {
        if(error){
            console.log('[LOGIN]', error);
            let errorMsg = 'Incorrect login/password';
            res.render('login.ejs', { msg: errorMsg });
        }
        else if(result) {
            if (result.password === req.body.password) {
                session.visit(req.cookies[domain], () => res.redirect(303, '/'), result['_id']);
                console.log('[LOGIN] ok, hello user', result.name)
            }
        }
        else {
            let errorMsg = 'Incorrect login/password';
            console.log('LOGIN error: ', errorMsg);
            res.render('login.ejs', {msg: errorMsg});      
        }
        

    })
});

app.get('/disconnect', (req, res) => {
    session.disconnect(cookieID);
    res.redirect(303, '/');
});

app.get('/', (req, res) => {

    // ############################################
    cookie.handle(req, res);
    // ############################################

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


app.post('/api', (req, res) => {
    
    console.log('[API] cookie: ', cookieID);
    let userSession = session.log(cookieID);
    res.json({result: null});
    
})

app.listen(app.get('port'), () => {
    console.log('We are live on port: ' + app.get('port'));
});

// End of app
