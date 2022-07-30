// Import Packages
const db = require("../models");
// Configure
const Requ = db.s_requirement;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(Requ, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.requ_createdBy = req.user.id;

    Requ.create(req.body)
        .then((data) => {
            Requ.findByPk(data.requ_id, { include: { model: db.user, as: "createdBy", attributes: ["user_id", "user_fullName", "user_access"] } }).then((result) => {
                res.send({
                    error: false,
                    data: result,
                    message: ["Requ is created successfully."],
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

    Requ.findAll({ where: { requ_deletedAt: null, requ_deletedBy: null } }).then((data) => {
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

    Requ.findByPk(id)
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
    req.body.requ_updatedBy = req.user.id;

    await Requ.update(req.body, { where: { requ_id: id, requ_deletedAt: null, requ_deletedBy: null }, include: ["updatedBy"] })
        .then((data) => {
            if (data) {
                Requ.findByPk(id)
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
    req.body.requ_deletedBy = req.user.id;

    await Requ.destroy({ where: { requ_id: id } }).then((data) => {
        Requ.update(body, { where: { requ_id: id } })
            .then((data) => {
                if (data) {
                    Requ.findByPk(id)
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