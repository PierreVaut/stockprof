import { uri } from '../config/connect';
import { accountSchema } from '../model/account';
import { request } from 'https';
import { domain }  from '../config/domain';
import Cookies from 'universal-cookie';


const mongoose = require('mongoose');
mongoose.connect(uri);
const database = mongoose.connection;

export const db = {

    init: function(){
        console.log('[DB-handler] Init')
        const Account = mongoose.model('Account', accountSchema)
        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', () => {
            console.log("[DB-handler] we're connected !")
        });
    },

    newAccount: function(requestBody, cb){
        console.log(requestBody);
        if (typeof(req.body.name) === String
            && typeof(req.body.email) === String
            && typeof(req.body.password) === String
            ) {
            let newAccount = {
                name: req.body.name,         
                email: req.body.email,       
                password: req.body.password} 
        }
        else {
            let error = 'Please fill in all fields'
            console.log('REGISTER error:', error)
            res.json({'status': error});       
        }
                
        Account.findOne({email: newEmail}, (error, result) => {
            if (error){
                console.log(error);
                res.json({'status': error});
            }
            if (result) {
                let errorMsg = 'Email already used';
                console.log('REGISTER error: ', errorMsg)  ;
                res.json({'status': error});
            }
            else {
                // Crée le compte dans la base
                // Info de base + name + email + password
                let newAccount = new Account();
                console.log('REGISTER newAccount: ', req.body);
                newAccount.name = newName;
                newAccount.email = newEmail;
                newAccount.password = newPassword;
                newAccount.save(console.log('New account saved', newAccount['_id']));

            }
        })

        // Mise à jour du fichier de session
            // isLogged true
            // id = l'ID dans la base de donnée
        cb();

    },

    handle: function(req, session, cb){
        const cookies = new Cookies(req.headers.cookie);
        let cookie = cookies.get(domain); 
        console.log('[DB-handler] cookie:', cookie);
        console.log('[DB-handler] session:', session);
        if(session.isLogged){
            Account.findOne({'_id': session.id}, (err, res) => {
                if(cb){               
                    if(err){
                        cb({'DB error': err});
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
                cb({'DB Error': 'User not logged'})
            }
        }
    }
}