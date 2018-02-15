
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require("http");
const path = require('path');
const mongoose = require('mongoose');
const uri = require('./connect/connect.js');
const assert = require('assert');
const util = require('util');
const cookieHandler = require('./custom_modules/cookie-handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: 'null', credentials: true }));
app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
    next();
});
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

const Account = mongoose.model('Account', accountSchema)

const randomize = () => Math.floor(Math.random() * 999942 );
let newAccountID = randomize();
if( 1 === 2 ){ /*insert check for duplicate ?*/ }

app.get('/register', (req, res)=>{
    res.render('register.ejs')
})

app.get('/login', (req, res)=>{
    res.render('login.ejs')
})

app.post('/newAccount', (req, res)=>{
    let newAccount = new Account();
    console.log('POST on newAccount: ', req.body)
    newAccount.name = req.body.name;
    newAccount.email = req.body.email;
    newAccount.password = req.body.password;
    newAccount.save( console.log('New account saved'));
    newAccount.order( 'buy',  'some stockID', 135 );
    newAccount.order( 'sell', 'some other stockID', 175 );
    newAccount.order( 'status' );
    res.send(  JSON.stringify(newAccount)  );
});

app.get('/', (req, res)=>{
    cookieHandler(req, res);
    res.render('index.ejs');
})




app.listen(app.get('port'), () => {
	console.log('We are live on port: '+ app.get('port'));
});

// End of app
