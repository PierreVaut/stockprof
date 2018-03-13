import { uri } from '../config/connect';
import { accountSchema } from '../model/account';
import { code } from '../config/currency';
import Cookies from 'universal-cookie';
const chalk = require('chalk');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(uri);
const database = mongoose.connection;


export const db = {

    init: function(){
        const Account = mongoose.model('Account', accountSchema)
        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', () => {
            console.log("[accountDB-init] we're connected !")
        });
    },

    // return user Account info from DB
    // or error if the user is undefined
    handle: function(req, res, data, cb){
        
        const Account = mongoose.model('Account', accountSchema)
        console.log('[accountDB-handler] Starting: ', data)
        if(data.session.isLogged){
            Account.findOne({'_id': data.session['_id']}, (err, result) => {              
                if(err){
                    data.account = '[accountDB-handler] DB error'+ err;
                    console.log( data.account );
                    res.json( data );
                }

                
                if(result !== null){
                    data.account = result;
                    console.log('[accountDB-handler] ok', result);
                    console.log('[accountDB-handler] Return', data);
                    if(cb){
                        console.log("[accountDB-handler] Passing CB on:", data);
                        cb(data);
                    } else {
                        res.json(data)
                    }
                }
            })
        }

        else{
            data.account = '[accountDB-handler] User not logged or Error';
            console.log( data.account );
            console.log('[accountDB-handler] Return', data)
            if(cb){
                console.log("[accountDB-handler] Passing CB on:", data);
                cb(data);
            } else {
                res.json(data)
            } 
        }
            
    },

    register: function(req, res, data, cb){

        const Account = mongoose.model('Account', accountSchema)
        console.log('[accountDB-register] Request:', req.body);

        // Check the request #1
        if(!req || req === ''){
            data.account = 'Error: request is undefined'
            data.error = data.account;
            console.error( '[accountDB-register] ' + data.account );
            res.json(data);
        }

        // Check the request #2
        if( req.body.name === '' || req.body.email === '' || req.body.password === '' || !req.body.name  || !req.body.email || !req.body.password 
            ) {
                data.account = 'Error : Please fill in all fields'
                console.error( '[accountDB-register]' + data.account );
                data.error = data.account;
                res.json(data);  
        }
        else{
            Account.findOne({email: req.body.email}, (error, result) => {

                if (error){
                    data.account ='[accountDB-register] Error fetching DB: '+ error;
                    console.error( data.account );
                    data.error = data.account;
                    res.json(data); 
                }

                if (result) {
                    data.account ='Email already used';
                    data.error = data.account;
                    console.error( '[accountDB-register] Error:  ' + data.account );
                    res.json(data);       
                }

                else {
                    let newAccount = new Account();
                    newAccount.isLogged = true;
                    newAccount.lastLogin = Date();
                    newAccount.name = req.body.name;
                    newAccount.email = req.body.email;
                    newAccount.password = req.body.password;
                    data.account = newAccount
                    data.status = '';
                    data.error = false;
                    newAccount.save(
                        () => {
                            console.log('[accountDB-register] New account saved', newAccount);
                            if(cb){
                                console.log("[accountDB-register] Passing CB on:", data);
                                cb(data);
                            } else {
                                res.json(data)
                            }
                        }
                    
                    );

                }
            })
        }
    },

    login: function(req, res, data, cb){
        console.log('[accountDB-login] starting', data, ' - Request: ', req.body)
        const Account = mongoose.model('Account', accountSchema)

        // Check the request #1
        if(!req || req === ''){
            data.account = 'Error: request is undefined'
            data.error =  data.account;
            console.error( '[accountDB-login]' , data.account );
            res.json(data);
        }

        // Check the request #2
        else if( req.body.name === '' || typeof(req.body.email) === '' || req.body.password === ''
            ) {
                data.account = 'Error : Please fill in all fields'
                data.error = data.account;
                console.error( "[accountDB-login]" , data.account );
                res.json(data);  
        }



        else{
            Account.findOne({email: req.body.email, password: req.body.password }, (error, result) => {
                console.log('[accountDB-login] Checking DB')
                if (error){
                    data.account ='Error fetching DB: '+ error;
                    data.error = data.account;
                    console.error( "[accountDB-login] " , data.account );
                    res.json(data); 
                }
    
                if (result) {
                    console.log('[accountDB-login] Result:', result);
                    result.isLogged = true;
                    result.lastLogin = Date();
                    result.save();
                    data.account = result;
                    data.error = false;
                    data.status = '';
                    if(cb){
                        console.log("[accountDB-login] Passing CB on: ", data);
                        cb( data );
                    } else {
                        res.json(data);
                    }      
                }
    
                else {
                    data.account = 'Invalid login/pwd... ';
                    data.error = data.account;
                    console.error( '[accountDB-login] ' , data.account );
                    res.json(data);
                }
            })
        }


    },

    disconnect(req, res, data, cb){
        const Account = mongoose.model('Account', accountSchema)
        Account.findOne({'_id': data.session['_id']}, (err, result) => {              
            if(err){
                data.account = '[accountDB-disconnect] DB error'+ err;
                console.log( data.account );
                res.json( data );
            }

            else{
                if(result !== null){
                    result.isLogged = false;
                    result.save();
                    data.account = result;
                    data.error = false;
                    data.status = '';
                    console.log('[accountDB-disconnect] OK', data);
                
                
                    if(cb){
                        cb(data);
                    }
                    else{
                        res.json(data);
                    }
                }
    
                else{
                    if(cb){
                        cb(data);
                    }
                    else{
                        res.json(data);
                    }
                }
            }
            

        })
    },

    // called by ws-handler.js 
    getUsers(cb){
        const Account = mongoose.model('Account', accountSchema);
        Account.find().lean().exec( function(err, list){
            if(err){return err}
            console.log(chalk.blue('[accountDB] get: '+ JSON.stringify(list).substr(0, 30)));
            cb(list)
        } )
    },

    marketOperation(req, res, data, cb){
        console.log('[accountDB-marketOperation] starting', data, ' - Request: ', req.body)
                // Check the request #1
                if(!req || req === ''){
                    data.error =  'Error: request is undefined'
                    console.error( '[accountDB-marketOperation] ', data.error );
                    res.json(data);
                }

                /*

                13/03/2018 19h  :  We'll put app logic Front-end
                Back-end will only store information in the DB...

                // Check the request #2
                else if(!code[req.body.symbol]){
                    data.error =  'Error: unknown or unsupported Currency'
                    console.error( '[DB-marketOperation] ', data.error );
                    res.json(data);
                }

                // Check the request #3
                else if(!req.body.id){
                    data.error =  'Error: unknown User, please login'
                    console.error( '[DB-marketOperation] ', data.error );
                    res.json(data);
                }

                // Check the request #4
                else if( !(req.body.operation === 'SELL' || req.operation === 'BUY')){
                    data.error =  'Error: unknown or unsupported Market operation'
                    console.error( '[DB-marketOperation] ', data.error );
                    res.json(data);
                }
                */

                // Check the request #1
                else if( req.body.cash < -5000){
                    data.error =  'Error: trade limit exceeded, please get a premium subscription'
                    console.error( '[DB-marketOperation] ', data.error );
                    res.json(data);
                }

                else{
                    data.error = false;
                    console.log('[DB-marketOperation] Checking DB - Request: ', req.body)

                    const Account = mongoose.model('Account', accountSchema)
                    Account.findOne({'_id': req.id}, (error, result) => {
                        
                        if (error){
                            data.error ='Error fetching DB, try again later...';
                            console.error( '[DB-marketOperation]', data.error );
                            res.json(data); 
                        }
            
                        if (result) {
                            console.log('[DB-marketOperation] Result:', result);
                            result.isLogged = true;
                            result.lastLogin = Date();
                            result.save();
                            data.account = result;
                            data.error = false;
                            data.status = '';
                            if(cb){
                                console.log("[DB-marketOperation] Passing CB on: ", data);
                                cb( data );
                            } else {
                                res.json(data);
                            }      
                        }
            
                        else {
                            data.account ='[DB-marketOperation] Invalid login/pwd... ';
                            data.error = data.account;
                            console.error( data.account );
                        

                            res.json(data);
                        }

                    })

                }


    
    }
}