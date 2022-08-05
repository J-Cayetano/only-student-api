// Import Packages
const db = require("../models");
const User = db.user;
const Level = db.s_level;
const datatable = require(`sequelize-datatables`);
const { Op, where, Model } = require("sequelize");
const seqDatatable = require('node-sequelize-datatable');
const dataTable = require('datatables');

// Messages Environment
const dotenv = require("dotenv");
const user = require("../models/user");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = async (req, res) => {

    datatable(User, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.user_fullName = "";

    req.body.user_createdBy = req.user.id;
    req.body.user_profilePhoto = req.file != undefined ? req.file.filename : "";

    if (req.body.user_access === "admin") {
        req.body.user_leve_id = null;
        req.body.user_type_id = null;
    } else if (req.body.user_access === "student") {
        req.body.user_type_id = null;
    } else {
        req.body.user_leve_id = null;
    }

    User.create(req.body)
        .then((data) => {
            User.findByPk(data.user_id,
                {
                    include: ["createdBy", {
                        model: db.user,
                        as: "createdBy",
                        attributes: ["user_id", "user_fullName", "user_access"],
                    }, "studentLevel", {
                            model: db.s_level,
                            as: "studentLevel",
                            attributes: ["leve_id", "leve_name"],
                        }, "professionType", {
                            model: db.s_type,
                            as: "professionType",
                            attributes: ["type_id", "type_name"],
                        }
                    ]
                }
            ).then((result) => {
                res.send({
                    error: false,
                    data: result,
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

// Retrieve all Instances
exports.findAll = async (req, res) => {

    User.findAll({
        where: { user_access: { [Op.ne]: "admin" }, user_isActive: 1 }, include: ["createdBy", {
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"],
        }, "studentLevel", {
                model: db.s_level,
                as: "studentLevel",
                attributes: ["leve_id", "leve_name"],
            }, "professionType", {
                model: db.s_type,
                as: "professionType",
                attributes: ["type_id", "type_name"],
            }
        ]
    }).then((data) => {
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

    User.findByPk(id, {
        include: ["createdBy", {
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"],
        }, "studentLevel", {
                model: db.s_level,
                as: "studentLevel",
                attributes: ["leve_id", "leve_name"],
            }, "professionType", {
                model: db.s_type,
                as: "professionType",
                attributes: ["type_id", "type_name"],
            }
        ]
    })
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
    req.body.user_profilePhoto = req.file != undefined ? req.file.filename : "";

    if (req.body.user_access === "admin") {
        req.body.user_leve_id = null;
        req.body.user_type_id = null;
    } else if (req.body.user_access === "student") {
        req.body.user_type_id = null;
    } else {
        req.body.user_leve_id = null;
    }

    await User.update(req.body, { where: { user_id: id, user_isActive: 1 }, individualHooks: true, include: ["updatedBy"] })
        .then((data) => {
            if (data) {
                User.findByPk(id, {
                    include: ["updatedBy", {
                        model: db.user,
                        as: "updatedBy",
                        attributes: ["user_id", "user_fullName", "user_access"],
                    }, "studentLevel", {
                            model: db.s_level,
                            as: "studentLevel",
                            attributes: ["leve_id", "leve_name"],
                        }, "professionType", {
                            model: db.s_type,
                            as: "professionType",
                            attributes: ["type_id", "type_name"],
                        }
                    ]
                }).then((data) => {
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
    req.body.user_isActive = 0;
    req.body.user_deletedBy = req.user.id;

    await User.destroy({
        where: {
            user_id: id
        }
    }).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_DELETE],
        })
    })

    // User.update(req.body, {
    //     where: {
    //         user_id: id,
    //         user_isActive: 1
    //     },
    //     individualHooks: true,
    //     include: ["deletedBy"]
    // }).then(async (result) => {
    //     await User.destroy({
    //         where: {
    //             user_id: result.user_id
    //         }
    //     }).then((respone) => {
    //         res.send({
    //             error: false,
    //             data: data,
    //             message: [process.env.SUCCESS_DELETE],
    //         })
    //     })
    // }).catch((err) => {
    //     res.status(500).send({
    //         error: true,
    //         data: [],
    //         message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
    //     });
    // })


    // await User.destroy({ where: { user_id: id }, include: ["deletedBy"] }).then((data) => {
    //     User.update(body, { where: { user_id: id } })
    //         .then((data) => {
    //             if (data) {
    //                 User.findByPk(id, {
    //                     include: ["updatedBy", {
    //                         model: db.user,
    //                         as: "updatedBy",
    //                         attributes: ["user_id", "user_fullName", "user_access"],
    //                     }, "studentLevel", {
    //                             model: db.s_level,
    //                             as: "studentLevel",
    //                             attributes: ["leve_id", "leve_name"],
    //                         }, "professionType", {
    //                             model: db.s_type,
    //                             as: "professionType",
    //                             attributes: ["type_id", "type_name"],
    //                         }
    //                     ]
    //                 })
    //                     .then((data) => {
    //                         res.send({
    //                             error: false,
    //                             data: data,
    //                             message: [process.env.SUCCESS_DELETE],
    //                         });
    //                     });
    //             } else {
    //                 res.status(500).send({
    //                     error: true,
    //                     data: [],
    //                     message: ["Error in deleting record."]
    //                 });
    //             }
    //         })
    //         .catch((err) => {

    //         });
    // });
};