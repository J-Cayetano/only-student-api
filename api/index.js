// Import Packages
const express = require('express')
const dotenv = require("dotenv");
const db = require("./src/models");
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Packages
const app = express()

// Environment Configuration
dotenv.config();
const PORT = process.env.PORT;

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

// --------------------------







// --------------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});