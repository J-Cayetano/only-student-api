// Import Packages
const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv");
const db = require("./src/models");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const session = require("express-session");

// Initialize Packages & Functions'
const app = express()

// Environment Configuration
dotenv.config();
const PORT = process.env.PORT;

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: 'key that will sign the cookie',
    resave: false,
    saveUninitialized: false
}));

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


// --------------------------

// Import Routes
const loginRoute = require("./src/routes/login.routes");
const userRoute = require("./src/routes/user.routes");


app.get("/", (req, res) => {
    console.log(req.session);
    res.send("Hello");
})

// Routes (For Authentication)
app.use(`${process.env.API_BASEURL}/login`, loginRoute);
app.use(`${process.env.API_BASEURL}/user`, authenticateToken, userRoute);

// --------------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});