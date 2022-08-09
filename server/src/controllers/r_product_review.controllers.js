// Import Packages
const db = require("../models");
// Configure
const ProductReview = db.r_product_review;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(ProductReview, req.body, {
        include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }]
    }).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.prre_createdBy = req.user.id;

    ProductReview.create(req.body)
        .then((data) => {
            ProductReview.findByPk(data.prre_id,
                {
                    include:
                    {
                        model: db.user,
                        as: "createdBy",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }
                }).then((result) => {
                    res.send({
                        error: false,
                        data: result,
                        message: ["Product Review is created successfully."],
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

    ProductReview.findAll({ where: { prre_deletedAt: null, prre_deletedBy: null } }).then((data) => {
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

    ProductReview.findByPk(id)
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
    req.body.prre_updatedBy = req.user.id;

    await ProductReview.update(req.body, { where: { prre_id: id, prre_deletedAt: null, prre_deletedBy: null }, include: ["updatedBy"] })
        .then((data) => {
            if (data) {
                ProductReview.findByPk(id)
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
    req.body.prre_deletedBy = req.user.id;

    await ProductReview.update(req.body, { where: { prre_id: id } }).then((data) => {
        if (data) {
            ProductReview.findByPk(id)
                .then(async (data) => {
                    await ProductReview.destroy({ where: { prre_id: data.prre_id } }).then((data) => {
                        res.send({
                            error: false,
                            data: data,
                            message: [process.env.SUCCESS_DELETE],
                        });
                    })
                });
        } else {
            res.status(500).send({
                error: true,
                data: [],
                message: ["Error in deleting record."]
            });
        }
    }).catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
        });
    });
};