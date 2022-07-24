// Import Packages
const db = require("../models");
// Configure
const Feed = db.r_feedback;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(Feed, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.feed_createdBy = req.user.id;

    Feed.create(req.body)
        .then((data) => {
            Feed.findByPk(data.feed_id, { include: { model: db.user, as: "createdBy", attributes: ["user_id", "user_fullName", "user_access"] } }).then((result) => {
                res.send({
                    error: false,
                    data: result,
                    message: ["Feed is created successfully."],
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            });
        });
};

// Retrieve all Instances
exports.findAll = async (req, res) => {

    Feed.findAll({ where: { feed_deletedAt: null, feed_deletedBy: null } }).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    }).catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
        });
    });
};

// Find an Instance
exports.findOne = (req, res) => {
    const id = req.params.id;

    Feed.findByPk(id)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: [process.env.SUCCESS_RETRIEVED],
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

// Update an Instance
exports.update = async (req, res) => {
    const id = req.params.id;
    req.body.feed_updatedBy = req.user.id;

    await Feed.update(req.body, { where: { feed_id: id, feed_deletedAt: null, feed_deletedBy: null }, include: ["updatedBy"] })
        .then((data) => {
            if (data) {
                Feed.findByPk(id)
                    .then((data) => {
                        res.send({
                            error: false,
                            data: data,
                            message: [process.env.SUCCESS_UPDATE],
                        });
                    });
            } else {
                res.status(500).send({
                    error: true,
                    data: [],
                    message: ["Error in updating record."]
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
            });
        });
};

// Delete an Instance
exports.delete = async (req, res) => {
    const id = req.params.id;
    req.body.feed_deletedBy = req.user.id;

    await Feed.destroy({ where: { feed_id: id } }).then((data) => {
        Feed.update(body, { where: { feed_id: id } })
            .then((data) => {
                if (data) {
                    Feed.findByPk(id)
                        .then((data) => {
                            res.send({
                                error: false,
                                data: data,
                                message: [process.env.SUCCESS_DELETE],
                            });
                        });
                } else {
                    res.status(500).send({
                        error: true,
                        data: [],
                        message: ["Error in deleting record."]
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    error: true,
                    data: [],
                    message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
                });
            });
    });

};