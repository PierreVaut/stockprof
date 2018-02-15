
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require("http");
var path = require('path');
var mongoose = require('mongoose');


var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var connect = require('./connect/connect.js');
var assert = require('assert');
var util = require('util');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ origin: 'null', credentials: true }));
app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.set('port', (process.env.PORT || 5000));

// Random new job
app.get('/randomjob', (req, res) => {
    
    let promise = new Promise((resolve, reject) =>{
        MongoClient.connect(connect.uri, (err, db) => {
            db.collection('jobs.company').find().toArray((err, data)=>{
                let array = [];
                data.forEach( (element) =>{ array.push(element.name) } )
                resolve(array);
            })
        });
    });

    let promise2 = new Promise((resolve, reject) =>{
        MongoClient.connect(connect.uri, (err, db) => {
            db.collection('jobs.jobs').find().toArray((err, data)=>{
                let array = [];
                data.forEach( (element) =>{
                    array.forEach( el => {
                        if(el === element.position){
                            // DO something
                        }
                    })
                    array.push(element.position)
                } )
                resolve(array);
            })
        });
    });
    
        
    promise.then((data, error) => {
        promise2.then((data2, error2)=>{
            res.send(JSON.stringify(data) + "<br>" + JSON.stringify(data2)  );    
        })
        
    })
 
});

// RAW jobs view 
app.get('/rawjob', (req, res)=>{
    MongoClient.connect(connect.uri, (err, db) => {
        console.log("Connecting");
        db.collection('jobs.jobs').find().toArray(  (err, data) =>  {
            res.json(data);
        });
    });
});

// RAW company view 
app.get('/rawcomp', (req, res)=>{
    MongoClient.connect(connect.uri, (err, db) => {
        console.log("Connecting");
        db.collection('jobs.company').find().toArray(  (err, data) =>  {
            res.json(data);
        });
    });
});


// FILTERED VIEW
app.post('/filter-view', (req, res)=>{
     
    if( (req.body.f0 === "null") && !req.body.f1 && !req.body.f2 )
        {  
            console.log("no filter");
            res.redirect(303, '/err100');
        }
    
    // OK :  Filter by company only
    else if(req.body.f0 && !req.body.f1 && !req.body.f2 )
        { 
            console.log("Filter by company only");
            MongoClient.connect(connect.uri, (err, db) => {
                if(err){
                    res.send(err) 
                    }
                else {
                    db.collection('jobs.jobs').find({company: req.body.f0}).toArray(  (err, data) =>  {
                        res.render('front-filter.ejs', {jobs : data });
                    });
                }
            })
        }
    
    // OK : Filter ONLY by exp or salary
    else if( (req.body.f0 === "null") && (req.body.f1 || req.body.f2) )
        {
            console.log("Filter only by exp or salary");
            // A REFACTORISER++
            MongoClient.connect(connect.uri, (err, db) => {
                if(err){
                    res.send(err) 
                    }
                else {
                    if(!req.body.f2){
                        db.collection('jobs.jobs').find({ experience: req.body.f1}).toArray(  (err, data) =>  {
                                res.render('front-filter.ejs', {jobs : data });   
                        })                 
                    }
                    else if(req.body.f2 === "sal0"){
                        db.collection('jobs.jobs').find({ experience: req.body.f1, salary :  { $gt: 0, $lte: 30  }}).toArray(  (err, data) =>  {
                            res.render('front-filter.ejs', {jobs : data });   
                        })  
                    }
                    else if(req.body.f2 === "sal1"){
                        db.collection('jobs.jobs').find({ experience: req.body.f1, salary :  { $gt: 30, $lte: 45  }}).toArray(  (err, data) =>  {
                            res.render('front-filter.ejs', {jobs : data });   
                        })                       
                    }
                    else if(req.body.f2 === "sal2"){
                        db.collection('jobs.jobs').find({ experience: req.body.f1, salary :  { $gt: 45, $lte: 70  }}).toArray(  (err, data) =>  {
                            res.render('front-filter.ejs', {jobs : data });   
                        })                       
                    }
                    else if(req.body.f2 === "sal3"){
                        db.collection('jobs.jobs').find({ experience: req.body.f1, salary :  { $gt: 70  }}).toArray(  (err, data) =>  {
                            res.render('front-filter.ejs', {jobs : data });   
                        })
                    }    
                    else{
                        res.send("Error, please re-query <br><a href='/'  > &#8592; back </a>");    
                    }
                    
                }
        })
    }

    // OK : Filter by Company AND by exp or salary
    else if(req.body.f0 && (req.body.f1 || req.body.f2) )
        {
            console.log("filter by company AND exp or salary" + JSON.stringify(req.body));
                        // A REFACTORISER++
                        MongoClient.connect(connect.uri, (err, db) => {
                            if(err){
                                res.send(err) 
                                }
                            else {
                                if(!req.body.f2){
                                    db.collection('jobs.jobs').find({ company: req.body.f0 , experience: req.body.f1}).toArray(  (err, data) =>  {
                                            res.render('front-filter.ejs', {jobs : data });   
                                    })                 
                                }
                                else if(req.body.f2 === "sal0"){
                                    db.collection('jobs.jobs').find({ company: req.body.f0, experience: req.body.f1, salary :  { $gt: 0, $lte: 30  }}).toArray(  (err, data) =>  {
                                        res.render('front-filter.ejs', {jobs : data });   
                                    })  
                                }
                                else if(req.body.f2 === "sal1"){
                                    db.collection('jobs.jobs').find({ company: req.body.f0, experience: req.body.f1, salary :  { $gt: 30, $lte: 45  }}).toArray(  (err, data) =>  {
                                        res.render('front-filter.ejs', {jobs : data });   
                                    })                       
                                }
                                else if(req.body.f2 === "sal2"){
                                    db.collection('jobs.jobs').find({ company: req.body.f0, experience: req.body.f1, salary :  { $gt: 45, $lte: 70  }}).toArray(  (err, data) =>  {
                                        res.render('front-filter.ejs', {jobs : data });   
                                    })                       
                                }
                                else if(req.body.f2 === "sal3"){
                                    db.collection('jobs.jobs').find({ company: req.body.f0, experience: req.body.f1, salary :  { $gt: 70  }}).toArray(  (err, data) =>  {
                                        res.render('front-filter.ejs', {jobs : data });   
                                    })
                                }    
                                else{
                                    res.send("Error, please re-query <br><a href='/'  > &#8592; back </a>");    
                                }
                                
                            }
                    })
        }
              
            

    
});


// Job view
app.get('/job-:id', (req, res)=>{ 
    console.log('Job informations....');
    MongoClient.connect(connect.uri, (err, db) => {
        db.collection('jobs.jobs').findOne({"_id":  ObjectId(req.params.id)  }, (err, data) =>  {
            if(err){
                res.send(err);
                }
            else if(data){
                res.send("Job #"            + req.params.id 
                    +  "<br><br> Company: " + data.company
                    +  "<br> Position:"     + data.position
                    +  "<br> Salary:"       + data.salary
                    +  "<br> Experience level:" + data.experience
                    +  "<br><a href='deljob/"+ data._id + "'>delete</a>"
                    +  "<br><br><a href='/'  > &#8592; back </a>"
                )}
            else {res.send("Found no job matching ID " + req.params.id )}
        })
    })    
});



// MAIN VIEW    [optional 'msg' param (duplicate error, void name, no filter...)]
app.get('/:msg?', (req, res)=>{
    if(req.params.msg){
        console.log(req.params.msg)
    }
    MongoClient.connect(connect.uri, (err, db) => {
        console.log("Connecting");
        db.collection('jobs.jobs').find().toArray(  (error, jobs) =>  {
            if(error){
                res.send(error);
            }
            db.collection('jobs.company').find().toArray( (err, companies) => {
                if(err){
                    res.send(err);
                }
                else{
                    res.render('front.ejs', {jobs : jobs, companies: companies, test: {this: "is a test"}, msg: req.params.msg });
                }
            })          
        });
    });
});



// Create new company
app.post('/newcompany', (req, res)=>{
    console.log('CREATE attempt - ' + JSON.stringify(req.body.company)   );

    // Error 50 : void company name provided
    if(req.body.company === ''){
        console.log("Error 50 : void company name provided")
        res.redirect(303, '/err50');   
    }
    
    else{
        MongoClient.connect(connect.uri, (err, db) => {
            db.collection('jobs.company').find({ name: req.body.company  }).toArray(function (err, items) {
                
                // Check if company exists already
                if(!items[0]){ 
                    console.log("CREATE completed - " + JSON.stringify(req.body.company)  )
                    db.collection('jobs.company').insert({ name: req.body.company });
                    res.redirect(303, '/newCompAdded');
                    }
                
                else{ 
                    // Error 80 : duplicate
                    console.log("Error 80: company already exists");
                    res.redirect(303, '/err80');
                    }
                
            });
        });
    }
});

// Create new job
app.post('/newjob', (req, res)=>{
    MongoClient.connect(connect.uri, (err, db) => {
        db.collection('jobs.jobs').insert(
            {   _id        :  new ObjectId(),
                company    :  req.body.company,
                position   :  req.body.jobName,
                salary     :  parseInt(req.body.salary),
                experience :  req.body.experience
            });
        
        console.log('CREATE - ' +JSON.stringify(req.body)   );
        res.redirect(303, '/');
    });
});



// These should be DELETE requests, but easier to test with GET..
app.get('/delcomp/:id', (req, res)=>{
    console.log("DELETE "+ req.params.id);
    MongoClient.connect(connect.uri, (err, db) => {
        // Note: always add ObjectId in the deleteOne filter
        db.collection('jobs.company').deleteOne({"_id" : ObjectId(req.params.id) });
    })
    res.redirect(303, '/');
});

app.get('/deljob/:id', (req, res)=>{
    console.log("DELETE "+ req.params.id);
    MongoClient.connect(connect.uri, (err, db) => {
        db.collection('jobs.jobs').deleteOne({"_id" : ObjectId(req.params.id) });
    })
    res.redirect(303, '/');
});



app.listen(app.get('port'), () => {
	console.log('We are live on port: '+ app.get('port'));
});

// End of app
