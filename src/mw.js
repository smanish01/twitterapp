var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
    consumerKey: 'xx7qOcTZh1NTuR6KTL5sTWB9l',
    consumerSecret: 'N5D1B93UKNQKo8c6cyKCn1QSGCb43SSvRtNuHeDQym2NwuLRH1',
    callbackURL: "http://localhost:3000/twitter"
},
    function (token, tokenSecret, profile, done) {
        if (profile) {
            user = profile;
            return done(null, user);
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
function (req, res, next) {
    passport.authenticate('twitter', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('http://localhost:3000/'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }

            console.log('in callback user info here ->>>>>>>>>>>>>>>>>>>>.', user)

            return res.redirect('http://localhost:3000/twitter');

        });
    })(req, res, next)
}
);


app.listen(3001,
    console.log('Server Started'))