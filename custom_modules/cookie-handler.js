
import { domain }  from '../config/domain';

// provides a cookieID and a visitLast to each user
export const cookie = {
    handle: function(req, res, cb){
        let cookieID = req.cookies[domain];
        if(!cookieID){
            cookieID = Math.floor(Math.random() * 99999942 );
            res.cookie( domain , cookieID);
            console.log('New visit : ', cookieID);
        }

        // calling session module
        if(cb){
            cb(cookieID);
        } else {
            return cookieID
        }
    }
}



