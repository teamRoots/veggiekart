//================================================
//List of all the required modules and routes

var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../Models/User');

//================================================
//Exported Passport function for authentication

module.exports = {
    init: function (app) {
        //initialize passport
        app.use(passport.initialize());
        // Persistent login sessions
        app.use(passport.session());

        // Passport session setup
        // serialize the user
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        // deserialize the user
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                if (err) done(err);
                done(null, user);
            });
        });
        // passport strategy options
        var options = {
            passReqToCallback: true,
            usernameField: 'username'
        };

        // login strategy named local-login
        passport.use('local', new LocalStrategy(options, function (req, username, password, done) {
            // look in User model for
            User.findOne({username: username}, function (err, user) {
                // if an error, return an error
                if (err) {
                    return done(err);
                }
                // if user does not exist, send flash message
                if (!user) {
                    return done(null, false);
                }
                // if user exists, verify password with bcrypt compare before returning user
                if (user) {
                    // generate salt to hash with
                    bcrypt.genSalt(10, function (err, salt) {
                        // hash req.body.password
                        bcrypt.hash(password, salt, function (err, hash) {
                            // compare hash with hash from db
                            bcrypt.compare(hash, user.password, function (err) {
                                // if error in password compare, send flash message
                                if (err) {
                                    return done(null, false);
                                }
                                // finish authentication and return user
                                return done(null, user);
                            });
                        });
                    });
                }
            });
        }));
    }
};
