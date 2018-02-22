import Cookies from 'universal-cookie';
import {domain}  from '../config/domain';
const params = {path: '/', httpOnly: false}

// provides a cookieID and a visitLast to each user
export const cookie = {

    handle: function(req, cb){
        const cookies = new Cookies(req.headers.cookie);
        let cookie = cookies.get(domain);        
        if(!cookie){
            let rdm = Math.floor(Math.random() * 99999942 );
            cookies.set(domain, rdm, params);
            if(cookie){
                console.log('[Cookie-handler] Cookie created:', cookie);
            } else {
                // Error on cookie creation
                console.log('[Cookie-handler] Error on cookie creation:', cookie, domain, rdm, params);  
            }
            if(cb) {
                cb(cookie);
            }
            return cookie
        } else {
            console.log('[Cookie-handler] New visit:', cookie);
            if (cb) {
                cb(cookie);
            }
            return cookie
        }
    }
}



