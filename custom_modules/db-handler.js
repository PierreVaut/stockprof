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
            // console.log(chalk.blue('[accountDB] get: '+ JSON.stringify(list).substr(0, 30)));
            cb(list)
        } )
    },

    marketOperation(req, res){
        let response = {};
        console.log('[accountDB-marketOperation] Request: ', req.body, req.body.symbol, typeof req.body.symbol)
                // Check the request #1
                if(!req || req === ''){
                    response.error = 'Error: request is undefined';
                    console.error( '[accountDB-marketOperation] ', response.error );
                    res.json(response);
                }

                if(req.body.operation !== 'buy' && req.body.operation !== 'sell'){
                    response.error = 'Error: invalid operation';
                    console.error( '[accountDB-marketOperation] ', response.error );
                    res.json(response);
                }

                else{
                    response.error = false;
                    const Account = mongoose.model('Account', accountSchema)
                    Account.findOne({'_id': req.body._id}, (error, result) => {
                        if (error){
                            response.error ='Error fetching DB, try again later...';
                            console.error( '[DB-marketOperation]', response.error );
                            res.json(response); 
                        }
            
                        if (result) {
                            console.log('[DB-marketOperation] Account before operation:', result);
                            if(result.position === undefined){
                                result.position = {};
                                console.log('[DB-marketOperation] Resetting position:', result.position);
                            }
                            if(result.position[req.body.symbol] === undefined){
                                result.position[req.body.symbol] = 0;
                                console.log('[DB-marketOperation] Resetting position for symbol',req.body.symbol, ':', result.position);
                            }
                            if(req.body.operation === 'buy'){
                                console.log('[accountDB-marketOperation] Result.position: ', result.position, result.position[req.body.symbol])
                                result.position[req.body.symbol] = result.position[req.body.symbol] + req.body.qty;
                            } else {
                                result.position[req.body.symbol] = result.position[req.body.symbol] - req.body.qty;
                            }
                            result.cashAvailable = Math.round(result.cashAvailable + req.body.amount);
                            console.log('[DB-marketOperation] Account after operation:', result);
                            result.markModified('position');
                            result.save();
                            let response = {};
                            response.error = false;
                            response.account = result
                            res.json(response);                             
                        }
            
                        else {
                            response.error ='[DB-marketOperation] Invalid user... ';
                            console.error( response.error );
                            res.json(response);
                        }

                    })

                }
    }
}