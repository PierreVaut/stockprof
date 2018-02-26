const fs = require("fs");
import Cookies from 'universal-cookie';
import {domain}  from '../config/domain';

export const session = {

    handle: function(req, cb){
        let cookies = new Cookies(req.headers.cookie);
        let path = process.cwd() + "/session/" + cookies.get(domain);
        fs.readFile(path, (err, data)=>{
            let session =  {}
            if (err) {
                // create default session file
                session =  {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    '_id': false,
                    'isLogged': false,
                    'role': 0,
                    'ip': [req.ip]
                }
                console.log("[Session] New file");  
            }
            else {
                // update existing file
                session = JSON.parse(data);
                session.visitCount++;
                session.visitLast = (new Date() ).getTime();
                session['ip'].push(req.ip);
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
        let cookies = new Cookies(req.headers.cookie);
        let path = process.cwd() + "/session/" + cookies.get(domain);
        console.log("[Session] Register", cookies.get(domain)); 

        fs.readFile(path, (err, data)=>{
            let session =  {};

            if (err) {
                console.log("[Session] Creating new file...", cookies.get(domain) );
                // create default session file
                session =  {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    '_id': userId,
                    'isLogged': true,
                    'role': 1,
                    'ip': [req.ip]
                }
                console.log("[Session] New file", session);  
            }
            else {
                // update existing file
                console.log("[Session] Updating file...", cookies.get(domain));
                session = JSON.parse(data);
                session.visitCount++;  
                session.visitLast = (new Date() ).getTime();
                session['ip'].push(req.ip); 
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







