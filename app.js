
//const { express } = require('express');
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1/prjapp', ['prayers']);
var ObjectId = mongojs.ObjectId;

var app = express();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setup static resources
app.use(express.static(path.join(__dirname, 'public')));

// Get request to root
app.get('/home', function(req, res){

    db.prayers.find(function(err, docs){
    
        res.render('index', {
            summary: 'The jungle wants you now',
            prayerRequests: docs
        });

        _.each(docs, function(doc) {
            console.log('Found some docs');
            console.log(doc);
        });
    });
});

app.post('/prayers/add', [  
    check('title', 'Must enter title').isLength({ min: 1 }),
    check('prayer', 'Must enter summary').isLength({ min: 1 })
    ], (req, res, next) =>{

        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.mapped()});
        }

        const pr = matchedData(req);
                console.log('inserting');
        console.log(pr);

        db.prayers.insert(pr, function(err, result){
            if(err)
                console.log(err);
            else
                res.redirect('/flop');
        });

        console.log('Yellow');
        console.log(pr);
    });

    app.delete('/prayers/delete/:id', function(req, res){
    console.log(req.params.id);

    db.prayers.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if(err)
            console.log(err);
 
        res.redirect('/flop');
    });
});

app.put('/prayers/update', function(req, res){
    // 
});

app.listen(2031, function(){
    console.log('Server started on port 2031');
});

console.log('Node-Express App');
