// Import Packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
var logger = require('morgan');
var dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { engine } = require("express-handlebars");
const session = require('express-session');
const db = require('./src/models');


// Environment Configuration
dotenv.config();
const BASEURL = process.env.BASEURL;


// Import Routers
var indexRouter = require('./src/routes/_index.routes');
var loginRouter = require('./src/routes/login.routes');
var adminRouter = require('./src/routes/_admin.routes');
var evaluatorRouter = require('./src/routes/_evaluator.routes');



// Initialize Express
var app = express();


// View Engine Setup
app.engine('.hbs', engine({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');


// Request Parsing, Path Declarations
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname + "/public/uploads/")));


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
        console.log("Done adding/updating the database based on the Models.")
      );
  }
  if (process.env.SYNC_MODE === "force") {
    db.sequelize
      .sync({ force: true })
      .then(() =>
        console.log("Done adding/updating the database based on the Models.")
      );
  }
}


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

app.use(`${BASEURL}`, indexRouter); // Done

// Routes for Log In & Sign Up
app.use(`${BASEURL}/login`, loginRouter);

// Routes (For Admin)
app.use(`${BASEURL}/admin`, authenticateToken, adminRouter);
app.use(`${BASEURL}/evaluator`, authenticateToken, evaluatorRouter);













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
