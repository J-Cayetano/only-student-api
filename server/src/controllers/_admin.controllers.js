// Import Packages
const db = require("../models");
const datatable = require(`sequelize-datatables`);
const { Op, where, Model } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();

// Database Table Access
const User = db.user;
const Level = db.s_level;

// -----------------------------------------
