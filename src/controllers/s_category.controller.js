// Import Packages
const db = require("../models");
const Category = db.s_category;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");


// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// ----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(Category, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    Category.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: "Category is created successfully."
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

    Category.findAll({ where: { cate_deletedAt: null } }).then((data) => {
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

    Category.findByPk(id)
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

    await Category.update(req.body, { where: { cate_id: id, cate_deletedAt: null } })
        .then((data) => {
            if (data) {
                Category.findByPk(id)
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

    Category.destroy({ where: { cate_id: id } })
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