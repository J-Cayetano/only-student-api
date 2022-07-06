// Import Packages
const db = require("../models");
const User = db.user;
const Level = db.s_level;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------

// Sign Up Render
exports.index = (req, res) => {

    Level.findAll({ where: { leve_deletedAt: null, leve_deletedBy: null } }).then((data) => {
        res.render('pages/auth/signup', { levels: data });
    }).catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
        });
    });
};

// Datatable
exports.findDataTable = (req, res) => {

    req.body = {
        draw: "1",
        columns: [
            {
                data: "user_fullName",
                name: "",
                searchable: "true",
                orderable: "true",
                search: {
                    value: "",
                    regex: "false",
                },
            },
        ],
        order: [
            {
                column: "0",
                dir: "asc",
            },
        ],
        start: "0",
        length: "10",
        search: {
            value: "",
            regex: "false",
        },
        _: "1478912938246",
    };
    datatable(User, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {
    req.body.user_fullName = "";

    req.body.user_createdBy = req.user.id;

    User.create(req.body)
        .then((data) => {
            User.findByPk(data.user_id, { include: ["createdBy"] }).then((result) => {
                res.send({
                    error: false,
                    data: result,
                    message: ["User is created successfully."],
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

    User.findAll({ where: { user_access: { [Op.ne]: "admin" }, user_isActive: 1 } }).then((data) => {
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

    User.findByPk(id)
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
    req.body.user_fullName = "";
    req.body.user_updatedBy = req.user.id;

    await User.update(req.body, { where: { user_id: id, user_isActive: 1 }, individualHooks: true, include: ["updatedBy"] })
        .then((data) => {
            if (data) {
                User.findByPk(id)
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
    const body = { user_isActive: 0 };
    req.body.user_deletedBy = req.user.id;

    await User.destroy({ where: { user_id: id }, include: ["deletedBy"] }).then((data) => {
        User.update(body, { where: { user_id: id } })
            .then((data) => {
                if (data) {
                    User.findByPk(id)
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