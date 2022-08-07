// Import Packages
const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();

// Environment Variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// -----------------------------------------

const generateToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "7200s" });
    // , { expiresIn: "7200s" }
};


exports.login = (req, res) => {


    if (String(req.body.email) === "" || String(req.body.password) === "") {
        res.status(500).send({
            error: true,
            data: [],
            message: ["User Email or Password is empty."],
        });
    } else {

        User.findOne({ where: { user_email: req.body.user_email, user_isActive: true } })
            .then((data) => {
                if (data) {
                    bcrypt.compare(req.body.user_password, data.user_password, function (err, result) {
                        if (result) {
                            res.send({
                                error: false,
                                data: data,
                                token: generateToken({
                                    id: data.user_id,
                                    name: data.user_fullName,
                                    email: data.user_email,
                                    access: data.user_access
                                }),
                                message: [process.env.SUCCESS_LOGGEDIN],
                            });
                        } else {
                            // if not equal
                            res.status(500).send({
                                error: true,
                                data: [],
                                message: ["Invalid user credentials."],
                            });
                        }
                    }
                    );
                } else {
                    res.status(500).send({
                        error: true,
                        data: [],
                        message: ["User email does not exists."],
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    data: [],
                    message:
                        err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
                });
            });
    };
};

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3600/only-student/login/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});