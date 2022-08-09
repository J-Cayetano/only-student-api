// Import Packages
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
var dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const session = require('express-session');
const passport = require('passport');
const db = require('./src/models');
require('./auth');


// Environment Configuration
dotenv.config();
const BASEURL = process.env.BASEURL;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const URI = process.env.URI;


// Initialize Express
var app = express();


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}


// Request Parsing, Path Declarations, Session & Cookies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "google_secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



// Connecting to Database & Synching
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

if (process.env.ALLOW_SYNC === "true") {
  if (process.env.SYNC_MODE === "alter") {
    db.sequelize
      .sync({ alter: true })
      .then(() =>
        console.log("Done adding/updating the database based on the Models through Alter.")
      );
  }
  if (process.env.SYNC_MODE === "force") {
    db.sequelize
      .sync({ force: true })
      .then(() =>
        console.log("Done adding/updating the database based on the Models through Force.")
      );
  }
}

// Functions


// Import Routers
var loginRouter = require('./src/routes/login.routes');
var signupRouter = require('./src/routes/signup.routes');
var adminRouter = require('./src/routes/_admin.routes');
var evaluatorRouter = require('./src/routes/_evaluator.routes');
var tutorRouter = require('./src/routes/_tutor.routes');
var studentRouter = require('./src/routes/_student.routes');


// ------------- MIDDLEWARE -------------------------

// Authentication Function
const authenticateToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

    console.log(user, err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};



// ------------------------------------

// Tester
app.get('/', (req, res) => {
  res.send(__dirname);
});

// --------------------------------- GOOGLE AUTH ------------------------------------



app.get(`${BASEURL}/google`,
  passport.authenticate('google', { access_type: "online", scope: ['email', 'profile'] })
);

app.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/googleRedirect',
    failureRedirect: 'http://localhost/only-student/landing?error=code1'
  })
);

app.get('/googleRedirect', isLoggedIn, (req, res) => {

  res.redirect('http://localhost/only-student/access/auth?token=' + token + '&user_access=student&user_firstName=' + req.user.given_name + '&user_lastName=' + req.user.family_name + '&user_fullName=' + req.user.displayName + '&user_email=' + req.user.email + '&user_picture=' + req.user.picture + '&fromGoogle=true');

});

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/logoutSuccessfully');
  });
});

app.get('/logoutSuccessfully', (req, res) => {
  res.status(200).send({
    message: "Sign out successfully."
  })
})
// ---------------------- ROUTES -------------------------------



// File Upload
app.use("/public", express.static(path.join(__dirname + "/public/images/")));
app.use("/public", express.static(path.join(__dirname + "/public/files/")));

// Routes for Log In, Google SSO & Sign Up
app.use(`${BASEURL}/login`, loginRouter);
app.use(`${BASEURL}/signup`, signupRouter);

// Routes (For Admin)
app.use(`${BASEURL}/admin`, authenticateToken, adminRouter);
app.use(`${BASEURL}/evaluator`, authenticateToken, evaluatorRouter);
app.use(`${BASEURL}/student`, authenticateToken, studentRouter);



// ---------------------------



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
