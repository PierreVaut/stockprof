// ES6 imports (enabled by Babel)
import { uri } from './config/connect';
import { domain } from './config/domain';
import { cookie } from './custom_modules/cookie-handler';
import { session } from './custom_modules/session-handler';

// Modules
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieID = cookie.handle();
const userSession = session.log(cookieID);

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

// Mongoose
mongoose.connect(uri)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("we're connected!")
});

const accountSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId('5a857519c4bb2a0e3043ef3a') }],
    created: { type: Date, default: Date.now },
    cashAvailable: { type: Number, default: 5000 },
    position: [
        {   
            stockCode: String,
            detainedQty: Number,
            buyPrice: Number,
            buyDate: Date
        }
    ],
    log: String
});

const stocksNameCode = {
    'iliad': 'ild.pa',
    'free': 'ild.pa',
    'google': 'googl',
    'alphabet': 'googl',
    'apple': 'aapl',
    'facebook': 'fb'
}

accountSchema.methods.order = function (operation, stockID, qty) {
    // let stock = this.getStock(stockID);
    if (operation === 'buy') {
        // required = all parameters
        // is the stock available ?
        // is the cashAvailable >= budget ?
        console.log (this.accountID, operation, stockID, qty)
        // return
    }
    else if (operation === 'sell') {
        // required = all parameters
        // is the stock available ?
        // is the stock detained ?
        console.log(this.accountID, operation, stockID, qty)
        // return
    }
    else if (operation === 'status') {
        // required = only accountID & operation
        // return position matching accountID
        console.log(this.accountID, operation)
        // return
    }
    else {
        console.log('Error at order() : unknown operation')
        // return
    }
}

// ######### Mongoose Model = ACCOUNT ##################
const Account = mongoose.model('Account', accountSchema)

// Routes
app.get('/register', (req, res) => {

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
    Account.findOne({
        '_id' : mongoose.Types.ObjectId(sessionData['_id'])
    }, (error, dbData) => {
        if(error){
            console.log(error)
        }
        else {
            console.log(dbData)
            res.render('index.ejs', {'cookieID': cookieID, 'dbData': dbData})
        }
    })
});


app.get('/api', (req, res) => {
    session.visit(cookieID, (sessionData) => {
        console.log('Searching for user ', sessionData['_id'])
        Account.findOne({
            '_id' : mongoose.Types.ObjectId(sessionData['_id'])
        }, (error, data) => {
            if(error){
                res.send(error)
            }
            res.json(data);
        })
    })
})

app.listen(app.get('port'), () => {
    console.log('We are live on port: ' + app.get('port'));
});

// End of app
