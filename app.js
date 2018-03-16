
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
// var expressValidator = require('express-validator/check');
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

/*
var people = [{

    name: 'Reuben',
    age: 46

},
{
    name: 'Cynthia',
    age: 48
}
];
*/

var prayers = [{
        title: 'Fertility',
        summary: 'Pray for myself and my wife to have healthy child',
        answered: false    
    },
    {
        title: 'Grow',
        summary: 'Pray for business to take off good',
        answered: false
    },
    {
        title: 'Phd',
        summary: 'Finish PhD',
        answered: false
    },
    {
        title: 'Weight',
        summary: 'Loose 15 lbs',
        answered: false
    }
];

// Get request to root
app.get('/flop', function(req, res){
    //res.send('Hello World');
    // res.json(people);
    console.log('rendering view');
    res.render('index', {
        summary: 'The jungle wants you now',
        prayerRequests: prayers
    });
});

app.post('/prayers/add', [  
    check('title', 'Must enter title').isLength({ min: 1 }),
    check('summary', 'Must enter summary').isLength({ min: 1 })
    ], (req, res, next) => {

        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.mapped()});
        }

        const pr = matchedData(req);
        console.log('Yellow');
        console.log(pr);

});

app.listen(2031, function(){
    console.log('server started on port 2031');
});

console.log('Node-Express App');
