// Import Packages
const db = require("../models");
const TutorRequirement = db.t_tutor_requirement;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(TutorRequirement, req.body, {
        include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.user,
            as: "evaluatorOfRequirement",
            attributes: ["user_id", "user_fullName", "user_access"]
        }]
    }).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.tutr_createdBy = req.user.id;

    TutorRequirement.create(req.body)
        .then((data) => {
            TutorRequirement.findByPk(data.tutr_id,
                {
                    include: [{
                        model: db.user,
                        as: "createdBy",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }, {
                        model: db.user,
                        as: "evaluatorOfRequirement",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }]
                }).then((result) => {
                    res.send({
                        error: false,
                        data: result,
                        message: ["Tutor Requirement is created successfully."],
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

    TutorRequirement.findAll({
        paranoid: false, include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.user,
            as: "evaluatorOfRequirement",
            attributes: ["user_id", "user_fullName", "user_access"]
        }]
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

    TutorRequirement.findByPk(id, {
        include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.user,
            as: "evaluatorOfRequirement",
            attributes: ["user_id", "user_fullName", "user_access"]
        }]
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

// Update an Instance
exports.update = async (req, res) => {
    const id = req.params.id;
    req.body.tutr_updatedBy = req.user.id;

    await TutorRequirement.update(req.body, {
        where: { tutr_id: id }, include: ["updatedBy"]
    })
        .then((data) => {
            if (data) {
                TutorRequirement.findByPk(id, {
                    include: [{
                        model: db.user,
                        as: "createdBy",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }, {
                        model: db.user,
                        as: "evaluatorOfRequirement",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }]
                })
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
    req.body.tutr_deletedBy = req.user.id;

    await TutorRequirement.update(req.body, { where: { tutr_id: id } }).then((data) => {
        if (data) {
            TutorRequirement.findByPk(id)
                .then(async (data) => {
                    await TutorRequirement.destroy({ where: { tutr_id: data.tutr_id } }).then((data) => {
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