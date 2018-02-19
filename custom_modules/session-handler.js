const fs = require("fs");


export const session = {

    // handle visits by creating or updating session file
    visit: function(cookieID, login, cb){
        let sessionPath = process.cwd() + "/session/" + cookieID;
        fs.readFile( sessionPath , (err, sessionData)=> {
            if(err){
                // create default session file
                let newSession =  {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    'login': 'Guest',
                    'isLogged': false
                }

                if(login && login !== '' ){
                    newSession['login']= login;
                    newSession.isLogged= true;
                }
            
                fs.writeFile(sessionPath, JSON.stringify(newSession), (err) =>{
                    if(err){ console.log(err)  }
                    console.log("newSession file created.");
                    if(cb){
                        cb(newSession)
                    }
   
                });
                
            }
            else{
                // update existing file
                let session = JSON.parse(sessionData);
                session.visitCount++;
                session.visitLast = (new Date() ).getTime();
                if(login){
                    session['login']= login;
                    session.isLogged= true;
                }       
                fs.writeFile(sessionPath, JSON.stringify(session), (err) =>{
                    if(err){ console.log(err)  }
                    console.log("visitCount++ : ", cookieID);
                    if(cb){
                        cb(session);
                    }

                });
                
            }
        });
    },

    // returns a CB of the session file
    status: function(cookieID, cb){
        let sessionPath = process.cwd() + "/session/" + cookieID;
        fs.readFile( sessionPath, (err, data)=> {
            if(err){console.log('Error at session.status: ', err)}
            if(cb){
                cb(data);
            } else{
                console.log("Warning at session.status - no CB provided")
            }
        })
    }

}




export const sessionHandler = () => {}


