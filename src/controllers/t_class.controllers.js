// Import Packages
const db = require("../models");
// Configure
const Class = db.t_class;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(Class, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.class_createdBy = req.user.id;

    Class.create(req.body)
        .then((data) => {
            Class.findByPk(data.class_id, { include: { model: db.user, as: "createdBy", attributes: ["user_id", "user_fullName", "user_access"] } }).then((result) => {
                res.send({
                    error: false,
                    data: result,
                    message: ["Class is created successfully."],
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

    Class.findAll({ where: { class_deletedAt: null, class_deletedBy: null } }).then((data) => {
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

    Class.findByPk(id)
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
    req.body.class_updatedBy = req.user.id;

    await Class.update(req.body, { where: { class_id: id, class_deletedAt: null, class_deletedBy: null }, include: ["updatedBy"] })
        .then((data) => {
            if (data) {
                Class.findByPk(id)
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
    req.body.class_deletedBy = req.user.id;

    await Class.destroy({ where: { class_id: id } }).then((data) => {
        Class.update(body, { where: { class_id: id } })
            .then((data) => {
                if (data) {
                    Class.findByPk(id)
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