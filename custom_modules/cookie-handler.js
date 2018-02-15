

module.exports = (req, res)=>{
    if(!req.cookies){
        let random = Math.floor(Math.random() * 99999942 )
        res.cookie("stockprof-carb11", "guest-" + random)
    }
    

}

