const fs = require("fs");
import Cookies from 'universal-cookie';
import {domain}  from '../config/domain';

export const session = {

    handle: function(req, cb){
        const cookies = new Cookies(req.headers.cookie);
        let path = process.cwd() + "/session/" + cookies.get(domain);
        fs.readFile(path, (err, data)=>{
            let session =  {}
            if (err) {
                // create default session file
                session =  {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    '_id': false,
                    'isLogged': false
                }
                console.log("[Session] New file");  
            }
            else {
                // update existing file
                session = JSON.parse(data);
                session.visitCount++;
                session.visitLast = (new Date() ).getTime();
                console.log("[Session] " + cookies.get(domain) + " - visitCount:", session.visitCount);  
            }

            fs.writeFile(path, JSON.stringify(session), (err) =>{
                if(err){ console.log(err)  }
                if(cb){
                    cb(session);
                }
            });
        })
    },

    register: function(req, userId, cb){
        const cookies = new Cookies(req.headers.cookie);
        let path = process.cwd() + "/session/" + cookies.get(domain);
        fs.readFile(path, (err, data)=>{
            let session =  {}
            if (err) {
                // create default session file
                session =  {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    '_id': userId,
                    'isLogged': true
                }
                console.log("[Session] New file");  
            }
            else {
                // update existing file
                session = JSON.parse(data);
                session.visitCount++;
                session.visitLast = (new Date() ).getTime();
                console.log("[Session] " + cookies.get(domain) + " - visitCount:", session.visitCount);  
            }

            fs.writeFile(path, JSON.stringify(session), (err) =>{
                if(err){ console.log(err)  }
                if(cb){
                    cb(session);
                }
            });
        })
    },

    disconnect: function(req, cb){
        let sessionPath = process.cwd() + "/session/" + cookies.get(domain);
        fs.readFile( sessionPath, ( err, sessionData )=> {
            if(err){console.log('Error at session.status: ', err)
            }
            else {
                // update existing file
                let session = JSON.parse(sessionData);
                session.isLogged = false;
                fs.writeFile(sessionPath, JSON.stringify(session), (err) =>{
                    if(err){ console.log(err)  }
                    console.log("visitCount++ : ", cookies.get(domain));
                    if(cb){
                        cb(session);
                    }
                });
            }
        });
    }
}







