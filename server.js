var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(session({secret: "l;kajdf;lakjdfs;lkaj"}))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if(!req.session.myNumber) {
        req.session.myNumber = 50;
    }
    if(!req.session.guess) {
        req.session.game_status = "Can you guess my number?";
        req.session.style = 'green';
        req.session.trophy_color = 'no-trophy';
    }
    if(!req.session.counter) {
        req.session.counter = 0
    }

    res.render('index');
})

app.post('/process', function(req, res) {
    req.session.guess = req.body.guess;
    req.session.counter++;
    if(req.session.guess == req.session.myNumber) {
        req.session.game_status = "That's right!"
        req.session.style = 'green'
        if(req.session.counter <= 5) {
            req.session.trophy = 'GOLD MEDAL';
            req.session.trophy_color = 'gold';
        }
        else if(req.session.counter <= 7) {
            req.session.trophy = 'SILVER MEDAL';
            req.session.trophy_color = 'silver';
        }
        else if(req.session.counter > 7) {
            req.session.trophy = 'BRONZE MEDAL';
            req.session.trophy_color = 'bronze';
        }
    }
    else if(req.session.guess < req.session.myNumber) {
        req.session.game_status = "Too low..."
        req.session.style = 'red'
    }
    else if(req.session.guess > req.session.myNumber) {
        req.session.game_status = "Too high..."
        req.session.style = 'red'
    }
    res.redirect('/')
})

app.post('/clear', function(req, res) {
    req.session.destroy();
})

app.listen(8000, function() {
    console.log("Power Overwhelming...")
})