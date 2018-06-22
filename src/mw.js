var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var axios = require('axios');
// var mongooose = require('mongoose');
// const MongoStore = require('connect-mongo')(session);
var session = require('express-session')
var passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
    consumerKey: 'V0mQrAR0U4tKmVUfpLhdmwZYB',
    consumerSecret: '5jPrblDE3R8qCd7sr0RrJ5F7zf2OlJfw9i8CiXlhWugeTqP0J8',
    callbackURL: "http://localhost:3001/auth/twitter/callback"
},
    function (token, tokenSecret, profile, done) {
        if (profile) {

            console.log('token here ->>>>>>>>>>>>>>>>>>>>>>>>>>', token)
            console.log('token secret here ->>>>>>>>>>>>>>>>>>>>>>>>>>', tokenSecret)

            return done(null, token, tokenSecret);
        }
        else {
            return done(null, false);
        }
    }
));

passport.serializeUser(function (token, tokenSecret, done) {
    done(null, token, tokenSecret);
});

passport.deserializeUser(function (token, tokenSecret, done) {
    done(null, token, tokenSecret);
});

// mongooose.connect('mongodb://localhost/db');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({ mongooseConnection: mongooose.connection }),
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    function (req, res, next) {
        passport.authenticate('twitter', function (err, token, tokenSecret, info) {
            if (err) { return next(err); }
            if (!token) { return res.redirect('http://localhost:3000/'); }
            req.logIn(token,tokenSecret, function (err) {
                if (err) { return next(err); }

                // axios.post('https://api.twitter.com/1.1/statuses/update.json?status=test2345',{headers:{
                //     'authentication': token
                // }})
                // .then(
                //     res => {
                //         console.log('res here ->>>>>>>>>>>>>>>>>>>>>..',res)
                //     }
                // )
                // .catch(

                //     err => {
                //         console.log('err here ->>>>>>>>>>>>>>>>>>>>>..',err)
                //     }
                // )

                return res.redirect('http://localhost:3000/twitter');

            });
        })(req, res, next)
    }
);


app.listen(3001,
    console.log('Server Started'))