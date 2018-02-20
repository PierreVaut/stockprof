const fs = require("fs");


export const session = {

    log: function(cookieID){
        let path = process.cwd() + "/session/" + cookieID;
        fs.readFile(path, (err, data)=>{
            let session =  {}
            if (err) {
                // create default session file
                session =  {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    '_id': undefined,
                    'isLogged': false
                }
                console.log("[Session] New file");  
            }
            else {
                // update existing file
                session = JSON.parse(data);
                session.visitCount++;
                session.visitLast = (new Date() ).getTime();
                console.log("[Session] " + cookieID + " - visitCount:", session.visitCount);  
            }

            fs.writeFile(path, JSON.stringify(session), (err) =>{
                if(err){ console.log(err)  }
            });
        })
    },

    register: function(){},

    disconnect: function(cookieID, cb){
        let sessionPath = process.cwd() + "/session/" + cookieID;
        fs.readFile( sessionPath, ( err, sessionData )=> {
            if(err){console.log('Error at session.status: ', err)
            }
            else {
                // update existing file
                let session = JSON.parse(sessionData);
                session.isLogged = false;
                fs.writeFile(sessionPath, JSON.stringify(session), (err) =>{
                    if(err){ console.log(err)  }
                    console.log("visitCount++ : ", cookieID);
                    if(cb){
                        cb(session);
                    }
                });
            }
        });
    }
}







