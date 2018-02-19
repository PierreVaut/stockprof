
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const http = require("http");
const path = require('path');
const mongoose = require('mongoose');
const assert = require('assert');
const util = require('util');
const cookieHandler = require('./custom_modules/cookie-handler');

const randomize = () => Math.floor(Math.random() * 999942 );

// ES6 imports enabled by Babel
import { uri }    from './config/connect';
import { domain } from './config/domain';
import { session, sessionHandler } from './custom_modules/session-handler';


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set('port', (process.env.PORT || 5000));

mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    console.log("we're connected!");
});



const accountSchema = mongoose.Schema({
    accountID: {
        type    : mongoose.Schema.Types.ObjectId,
        default : mongoose.Types.ObjectId,
        index   : { unique: true }
    },
    name: String,
    email: String,
    password: String,
    friends : [{type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId('5a857519c4bb2a0e3043ef3a') }],
    created: { type: Date, default: Date.now },
    cashAvailable: {type: Number, default: 5000 },
    position:[
        {   
            stockCode: String,
            detainedQty: Number,
            buyPrice: Number,
            buyDate: Date,
        }
    ],
    log: String
});


const stocksNameCode = {
    'iliad': 'ild.pa',
    'free': 'ild.pa',
    'google': 'googl',
    'alphabet': 'googl',
    'apple':'aapl',
    'facebook': 'fb',
}

accountSchema.methods.order = function( operation, stockID, qty ){
    //let stock = this.getStock(stockID);
    if(operation === 'buy'){
        // required = all parameters
        // is the stock available ?
        // is the cashAvailable >= budget ?
        console.log( this.accountID, operation, stockID, qty );
        return
    }
    if(operation === 'sell'){
        // required = all parameters
        // is the stock available ?
        // is the stock detained ?
        console.log( this.accountID, operation, stockID, qty );
        return
    }
    if(operation === 'status'){
        // required = only accountID & operation
        // return position matching accountID
        console.log( this.accountID, operation);
        return
    }
    else{
        console.log('Error at order() : unknown operation');
        return
    }
}

// ######### Mongoose Model = ACCOUNT ##################
const Account = mongoose.model('Account', accountSchema);


let newAccountID = randomize();
if( 1 === 2 ){ /*insert check for duplicate ?*/ }

app.get('/register', (req, res)=>{
    res.render('register.ejs', { msg: null })
})

app.post('/register', (req, res)=>{
    let newName = req.body.name;
    let newEmail= req.body.email;
    let newPassword = req.body.password;
    
    if( !newName || !newEmail || !newPassword ){
        let error = 'Please fill in all fields';
        console.log('REGISTER error: ', error)  ;
        res.render('register.ejs', {msg: error});
    }

    let query = Account.findOne({email: newEmail}, (error, result)=>{
        if(result){
            let error = 'Email already used';
            console.log('REGISTER error: ', error)  
            res.render('register.ejs', {msg: error})          
        }
        else{
            let newAccount = new Account();
            console.log('REGISTER newAccount: ', req.body);
            newAccount.name = newName;
            newAccount.email = newEmail;
            newAccount.password = newPassword;
            newAccount.save( console.log('New account saved'));
            session.visit( req.cookies[domain] , newAccount.accountID, () => res.redirect(303, '/') );
            
        }
    } )
})

app.get('/login', (req, res)=>{
    res.render('login.ejs')
})

app.post('login', (req, res)=>{
    session.visit(cook)
})

app.get('/', (req, res)=>{
    let cookieID = cookieHandler( req, res );
    session.visit(cookieID);
    session.status(cookie, (data)=>{
        // if login... (session)
        // get Account.name
        res.render('index.ejs', { user: 'guste' } );
    })
});

app.listen(app.get('port'), () => {
	console.log('We are live on port: '+ app.get('port'));
});

// End of app
