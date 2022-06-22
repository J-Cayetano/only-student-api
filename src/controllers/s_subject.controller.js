// Import Packages
const db = require("../models");
const Subject = db.s_subject;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");


// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// ----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(Subject, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    Subject.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Subject is created successfully."
        });
    }).catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message)
        });
    });
};

// Retrieve all Instances
exports.findAll = async (req, res) => {

    Subject.findAll({ where: { subj_deletedAt: null } }).then((data) => {
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

    Subject.findByPk(id)
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

// Find based on Level
exports.findAllLevel = (req, res) => {
    const level = req.params.level;

    Subject.findAll({ where: { subj_deletedAt: null, subj_leve_id: level } })
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

// Find based on Category
exports.findAllCategory = (req, res) => {
    const category = req.params.category;

    Subject.findAll({ where: { subj_deletedAt: null, subj_cate_id: category } })
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

    await Subject.update(req.body, { where: { subj_id: id, subj_deletedAt: null } })
        .then((data) => {
            if (data) {
                Subject.findByPk(id)
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
exports.delete = (req, res) => {
    const id = req.params.id;

    Subject.destroy({ where: { subj_id: id } })
        .then((data) => {
            res.send({
                error: false,
                data: [],
                message: [process.env.SUCCESS_DELETE],
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
            });
        });;
};