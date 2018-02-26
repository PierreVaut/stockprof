import { uri } from '../config/connect';
import { accountSchema } from '../model/account';
import { request } from 'https';
import { domain }  from '../config/domain';
import Cookies from 'universal-cookie';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(uri);
const database = mongoose.connection;


export const db = {

    init: function(){

        let Account = mongoose.model('Account', accountSchema)
        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', () => {
            console.log("[DB Init] we're connected !")
        });
    },

    // return user Account info from DB
    // or error if the user is undefined
    handle: function(req, data, cb){
        
        let Account = mongoose.model('Account', accountSchema)

        if(data.session.isLogged){
            Account.findOne({'_id': data.session['_id']}, (err, result) => {
                if(cb){               
                    if(err){
                        data.account = '[DB-handler] DB error'+ err;
                        console.log( data.account );
                        cb(data);
                    }
                    else{
                        data.account = result;
                        console.log('[DB-handler] ok', result);
                        cb(data);
                    }
                }
                
                else {
                    console.log('No callback provided')
                }

            })
        }
        
        else{

            if(cb){
                data.account = 'User not logged or Error';
                cb(data)
            }
        }
    },

    register: function(req, data, cb){

        let Account = mongoose.model('Account', accountSchema);

        console.log('[DB-register] Request:', req.body);

        // Check the request #1
        if(!req || req === ''){
            data.account = '[DB-register] Error: request is undefined'
            console.error( data.account );
            if(cb){
                console.log("[DB-register] Passing CB on:", data);
                cb( data );
            }
        }

        // Check the request #2
        if( req.body.name === '' || req.body.email === '' || req.body.password === '' || !req.body.name  || !req.body.email || !req.body.password 
            ) {
                data.account = '[DB-register] Error : Please fill in all fields'
                console.error( data.account );
                if(cb){
                    console.log("[DB-register] Passing CB on:", data);
                    cb( data );
                }    
        }
        else{
            Account.findOne({email: req.body.email}, (error, result) => {

                if (error){
                    data.account ='[DB-register] Error fetching DB: '+ error;
                    console.error( data.account );
                    if(cb){
                        console.log("[DB-register] Passing CB on:", data);
                        cb( data );
                    }  
                }

                if (result) {
                    data.account ='[DB-register] Error:  Email already used';
                    console.error( data.account );
                    if(cb){
                        console.log("[DB-register] Passing CB on:", data);
                        cb( data );
                    }         
                }

                else {
                    let newAccount = new Account();
                    newAccount.name = req.body.name;
                    newAccount.email = req.body.email;
                    newAccount.password = req.body.password;
                    data.account = newAccount
                    newAccount.save(
                        () => {
                            console.log('[DB-register] New account saved', newAccount);
                            if(cb){
                                console.log("[DB-register] Passing CB on:", data);
                                cb(data);
                            }
                        }
                    
                    );

                }
            })
        }
    },

    login: function(req, data, cb){
        let Account = mongoose.model('Account', accountSchema);

        // Check the request #1
        if(!req || req === ''){
            data.account = '[DB-login] Error: request is undefined'
            console.error( data.account );
            if(cb){
                console.log("[DB-login] Passing CB on:", data);
                return cb( data );
            }
        }

        // Check the request #2
        if( typeof(req.body.name) === '' || typeof(req.body.email) === '' || typeof(req.body.password) === ''
            ) {
                data.account = '[DB-login] Error : Please fill in all fields'
                console.error( data.account );
                if(cb){
                    console.log("[DB-login] Passing CB on:", data);
                    return cb( data );
                }    
        }

        Account.findOne({email: req.body.email, password: req.body.password }, (error, result) => {
            if (error){
                data.account ='[DB-login] Error fetching DB: '+ error;
                console.error( data.account );
                if(cb){
                    return cb( data );
                }  
            }
            console.log('[DB-login] No error yet...');
            if (result) {
                console.log('[DB-login] There should be a result...', result);
                data.account = result;
                if(cb){
                    console.log("[DB-login] Passing CB on: ", data);
                    cb( data );
                }         
            }
        })

    }
}