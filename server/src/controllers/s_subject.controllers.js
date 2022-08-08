// Import Packages
const db = require("../models");
const Subject = db.s_subject;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(Subject, req.body, {
        include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.s_level,
            as: "subjectLevel",
            attributes: ["leve_id", "leve_name", "leve_description"]
        }, {
            model: db.s_category,
            as: "subjectCategory",
            attributes: ["cate_id", "cate_name", "cate_description"]
        }]
    }).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.subj_createdBy = req.user.id;

    Subject.create(req.body)
        .then((data) => {
            Subject.findByPk(data.subj_id,
                {
                    include: [{
                        model: db.user,
                        as: "createdBy",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }, {
                        model: db.s_level,
                        as: "subjectLevel",
                        attributes: ["leve_id", "leve_name", "leve_description"]
                    }, {
                        model: db.s_category,
                        as: "subjectCategory",
                        attributes: ["cate_id", "cate_name", "cate_description"]
                    }]
                }).then((result) => {
                    res.send({
                        error: false,
                        data: result,
                        message: ["Subject is created successfully."],
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

    Subject.findAll({
        paranoid: false, include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.s_level,
            as: "subjectLevel",
            attributes: ["leve_id", "leve_name", "leve_description"]
        }, {
            model: db.s_category,
            as: "subjectCategory",
            attributes: ["cate_id", "cate_name", "cate_description"]
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

    Subject.findByPk(id, {
        include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.s_level,
            as: "subjectLevel",
            attributes: ["leve_id", "leve_name", "leve_description"]
        }, {
            model: db.s_category,
            as: "subjectCategory",
            attributes: ["cate_id", "cate_name", "cate_description"]
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
    req.body.subj_updatedBy = req.user.id;

    await Subject.update(req.body, {
        where: { subj_id: id }, include: ["updatedBy"]
    })
        .then((data) => {
            if (data) {
                Subject.findByPk(id, {
                    include: [{
                        model: db.user,
                        as: "updatedBy",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }, {
                        model: db.s_level,
                        as: "subjectLevel",
                        attributes: ["leve_id", "leve_name", "leve_description"]
                    }, {
                        model: db.s_category,
                        as: "subjectCategory",
                        attributes: ["cate_id", "cate_name", "cate_description"]
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
    req.body.subj_deletedBy = req.user.id;

    await Subject.update(req.body, { where: { subj_id: id } }).then((data) => {
        if (data) {
            Subject.findByPk(id)
                .then(async (data) => {
                    await Subject.destroy({ where: { subj_id: data.subj_id } }).then((data) => {
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