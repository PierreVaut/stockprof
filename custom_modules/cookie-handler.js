import Cookies from 'universal-cookie';
import {domain}  from '../config/domain';
const cookies = new Cookies();

// provides a cookieID and a visitLast to each user
export const cookie = {

    handle: function(req, res){
        if(!cookies.get(domain)){
            let rdm = Math.floor(Math.random() * 99999942 );
            cookies.set(domain, rdm, {'path': '/', 'httpOnly': false});
            console.log('[Cookie-handler] New visit : ', cookies.get(domain));
            return cookies.get(domain); 
        } else{
            return cookies.get(domain); 
        }

    },

    handle_old_version: function(req, res, cb){
        let cookieID = req.cookies[domain];
        if(!cookieID){
            cookieID = Math.floor(Math.random() * 99999942 );
            res.cookie(domain, cookieID );
            console.log('New visit : ', cookieID);
        }
    }
}



