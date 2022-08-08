const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GoogleUser = require('./src/models').user;
const jwt = require("jsonwebtoken");

// Dotenv
const dotenv = require("dotenv");
dotenv.config();

// Environment Variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// -----------------------------------------------------

const generateToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "7200s" });
};

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3600/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, user, profile, done) {

        GoogleUser.findOne({
            where: {
                user_email: profile.emails[0].value,
                user_isActive: true
            }
        }).then((data) => {
            if (data) {
                token = generateToken({
                    id: data.user_id,
                    name: data.user_fullName,
                    email: data.user_email,
                    access: data.user_access
                })

                return done(null, profile)

            } else {

                GoogleUser.create({
                    user_google_id: profile.id,
                    user_firstName: profile.name.givenName,
                    user_lastName: profile.name.familyName,
                    user_fullName: "",
                    user_email: profile.emails[0].value,
                    user_access: "student",
                    user_profilePhoto: profile.photos[0].value
                }).then((data) => {

                    token = generateToken({
                        id: data.user_id,
                        name: data.user_fullName,
                        email: data.user_email,
                        access: data.user_access
                    })

                    return done(null, profile)
                })
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});