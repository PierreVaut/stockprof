app.get('/register', (req, res) => {

    userSession = session.log(cookieID);
    res.render('register.ejs', { msg: null })
})

app.post('/register', (req, res) => {
    let newName = req.body.name;
    let newEmail = req.body.email;
    let newPassword = req.body.password;

    if (!newName || !newEmail || !newPassword) {
        let error = 'Please fill in all fields'
        console.log('REGISTER error:', error)
            res.render('register.ejs', {msg: error})       
    }
            
    Account.findOne({email: newEmail}, (error, result) => {
        if (error){
            console.log(error)}
        if (result) {
            let errorMsg = 'Email already used';
            console.log('REGISTER error: ', errorMsg)  ;
            res.render('register.ejs', {msg: errorMsg});
        }
        else {
            let newAccount = new Account();
            console.log('REGISTER newAccount: ', req.body);
            newAccount.name = newName;
            newAccount.email = newEmail;
            newAccount.password = newPassword;
            newAccount.save(console.log('New account saved', newAccount['_id']));
            session.visit(req.cookies[domain], () => res.redirect(303, '/'), newAccount['_id']);
        }
    })
});

app.get('/login', (req, res) => {

    userSession = session.log(cookieID);
    res.render('login.ejs', { msg: null });
});

app.post('/login', (req, res) => {
    Account.findOne({'email': req.body.email}, (error, result) => {
        if(error){
            console.log('[LOGIN]', error);
            let errorMsg = 'Incorrect login/password';
            res.render('login.ejs', { msg: errorMsg });
        }
        else if(result) {
            if (result.password === req.body.password) {
                session.visit(req.cookies[domain], () => res.redirect(303, '/'), result['_id']);
                console.log('[LOGIN] ok, hello user', result.name)
            }
        }
        else {
            let errorMsg = 'Incorrect login/password';
            console.log('LOGIN error: ', errorMsg);
            res.render('login.ejs', {msg: errorMsg});      
        }
        

    })
});