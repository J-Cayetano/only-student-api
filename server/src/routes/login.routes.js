const router = require("express").Router();
const passport = require("passport");
require("../controllers/login.controllers");
const loginController = require("../controllers/login.controllers");
require('../controllers/login.controllers');
const session = require('express-session');
var dotenv = require("dotenv");
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;


router.use(passport.initialize());
router.use(passport.session());
router.use(session({
    secret: TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

router.post('/', loginController.login);

function isLoggedIn(req, res, next) {
    req.user ? next() : next()
}

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3600/only-student/login/googleRedirect',
        failureRedirect: 'http://localhost/only-student/landing?error=code1'
    })
);

router.get('/googleRedirect', isLoggedIn, (req, res) => {
    res.status(200).send({
        success: true,
        data: req.user,
        access: "student",
        message: "Logged in successfully.",
        token: token
    })
});

module.exports = router;
