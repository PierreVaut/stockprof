
const fs = require("fs");

const domain = "stockprof-carb11";

module.exports = (req, res)=>{
    let cookieID = req.cookies[domain];
    if(!cookieID){
        cookieID = "guest-" + Math.floor(Math.random() * 99999942 )
        res.cookie( domain , cookieID);
        console.log('New visit : ', cookieID);
    }

    let sessionPath = process.cwd() + "/session/" + cookieID;

    fs.readFile( sessionPath , (err, data)=> {

        // si le readFile échoue, on doit créer le fichier
        if(err){
            let newSessionCookie = {
                visitCount: 1,
                visitLast: (new Date() ).getTime()
            }

            // on crée le fichier
            fs.writeFile(sessionPath, JSON.stringify(newSessionCookie), (err) =>{
                if(err){ console.log(err)  }
                console.log("Session file created: ", cookieID)
            })
        }

        // le cookie existe, on update juste le fichier de session
        else{
            let currentCookie = JSON.parse(data);
            currentCookie.visitCount++;
            currentCookie.visitLast = (new Date() ).getTime();

            // on update le fichier
            fs.writeFile(sessionPath, JSON.stringify(currentCookie), (err) =>{
                if(err){ console.log(err)  }
                console.log("visitCount++ : ", cookieID)
            })
        }
    })
}
