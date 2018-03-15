
var express = require ('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

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

var users = [
    {
        
    }
]

// Get request to root
app.get('/flop', function(req, res){
    //res.send('Hello World');
    // res.json(people);
    console.log('rendering view');
    res.render('index', {
        summary: 'The jungle wants you now'
    });
});

app.listen(2031, function(){
    console.log('server started on port 2031');
});

console.log('Node-Express App');
