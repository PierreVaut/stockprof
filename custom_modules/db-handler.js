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
        console.log('[DB-handler] Init')
        let Account = mongoose.model('Account', accountSchema)
        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', () => {
            console.log("[DB-handler] we're connected !")
        });
    },

    register: function(req, cb){
        let Account = mongoose.model('Account', accountSchema);
        let cookies = new Cookies(req.headers.cookie);
        let cookie = cookies.get(domain); 
        console.log('[DB REGISTER] Request:', req.body);
        console.log('[DB REGISTER] cookie:', cookie);
        let newAccount = {}
        if(!req || req === ''){
            let error = '[DB REGISTER] Error: request is undefined'
            console.log(error);
            if(cb){ 
                cb({'status': error});
            }
        }

        if( typeof(req.body.name) === '' || typeof(req.body.email) === '' || typeof(req.body.password) === ''
            ) {
                let error = 'Please fill in all fields'
                console.log('[DB REGISTER] Error', error)
                if(cb){ 
                    cb({'status': error});
                }    
        }
        else{
            Account.findOne({email: req.body.email}, (error, result) => {
                if (error){
                    console.log(error);
                    if(cb){ 
                        cb({'[DB REGISTER] Error fetching DB': error});
                    } 
                }
                if (result) {
                    let errorMsg = 'Email already used';
                    console.log('[DB REGISTER] Error', errorMsg)  ;
                    if(cb){ 
                        cb({'status': error});
                    }
                }
                else {
                    // Crée le compte dans la base
                    // Info de base + name + email + password
                    let newAccount = new Account();
                    console.log('REGISTER newAccount: ', req.body);
                    newAccount.name = req.body.name;
                    newAccount.email = req.body.email;
                    newAccount.password = req.body.password;
                    newAccount.save(
                        ()=> {
                            console.log('New account saved', newAccount['_id']);
                            if(cb){ 
                                cb(newAccount);
                            }
                        }
                    
                    );

                }
            })
        }

        
        
    
    },

    // return user Account info from DB
    // or error if the user is undefined
    handle: function(req, session, cb){
        let Account = mongoose.model('Account', accountSchema);
        let cookies = new Cookies(req.headers.cookie);
        let cookie = cookies.get(domain); 
        console.log('[DB-handler] cookie:', cookie);
        console.log('[DB-handler] session:', session);
        if(session.isLogged){
            Account.findOne({'_id': session.id}, (err, res) => {
                if(cb){               
                    if(err){
                        cb({status: 'DB error', err});
                    }
                    else{
                        cb(res);
                    }
                } else {
                    console.log('No callback provided')
                }


            })
        } else {
            if(cb){    
                cb({status: 'User not logged', data: null})
            }
        }
    }
}