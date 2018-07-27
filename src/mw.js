var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express()
var passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: '',
    consumerSecret: '',
    callbackURL: "http://localhost:3001/auth/twitter/callback"
},
    function (token, tokenSecret, profile, done) {

        if (profile) {
            user = profile     
            user.consumerKey = '',
                user.consumerSecret = ''
            user.token = token
            user.tokenSecret = tokenSecret
            return done(null, user, token, tokenSecret);
        }
        else {
            return done(null, false);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
}))


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', function (req, res, next) {
    passport.authenticate('twitter', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('http://localhost:3000/'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }

            return res.redirect('http://localhost:3000/twitter')
        });
    })(req, res, next);
});


app.get('/userdata',
    function (req, res) {
        console.log(req.user.consumerKey)
    });


app.listen(3001,
    console.log('Server Started'))