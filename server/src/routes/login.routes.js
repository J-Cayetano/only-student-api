const router = require("express").Router();
const passport = require("passport");
require("../controllers/login.controllers");
const loginController = require("../controllers/login.controllers");

router.post('/', loginController.login);

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '',
        failureRedirect: 'http://localhost/only-student/landing?error=code1'
    })
);

module.exports = router;
