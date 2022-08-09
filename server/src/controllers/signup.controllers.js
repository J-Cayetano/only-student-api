// Import Packages
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const { Op, where, Model } = require("sequelize");


// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------

const generateToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "7200s" });
    // , { expiresIn: "7200s" }
};


// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.user_fullName = "";
    if (req.body.user_access === "student") {
        req.body.user_type_id = null;
    }

    User.create(req.body)
        .then((data) => {
            User.findByPk(data.user_id,
            ).then((result) => {
                res.send({
                    error: false,
                    data: result,
                    token: generateToken({
                        id: result.user_id,
                        name: result.user_fullName,
                        email: result.user_email,
                        access: result.user_access
                    }),
                    message: ["User is created successfully."],
                });
            }).catch((err) => {
                res.status(500).send({
                    error: true,
                    data: [],
                    message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
            });
        });
};

