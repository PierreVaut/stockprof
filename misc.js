register: (cookieID, cb )=>    {
    let sessionPath = process.cwd() + "/session/" + cookieID;
    fs.readFile( sessionPath , (err, data)=> {

        // Session file does not exist =  we create it
        if(err){
            let newSession = {};
            let login = false;
            if(login){
                newSession = {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    'login': 'Guest',
                    'isLogged': false
                }
            } else {
                newSession = {
                    'visitCount': 1,
                    'visitLast': (new Date() ).getTime(),
                    'login': login,
                    'isLogged': true
                }
            }

            fs.writeFile(newSessionPath, JSON.stringify(newSession), (err) =>{
                if(err){ console.log(err)  }
                console.log("newSession file created: ", cookieID);
                if(cb){
                    cb(newSession);
                } 
            })
        }

        // Session file already exists =  we update it
        else{
            let session = JSON.parse(data);
            session.visitCount++;
            session.visitLast = (new Date() ).getTime();

            fs.writeFile(sessionPath, JSON.stringify(session), (err) =>{
                if(err){ console.log(err)  }
                console.log("visitCount++ : ", cookieID);
                if(cb){
                    cb(session);
                } 
            })
        }
    })
}