// Import Packages
const db = require("../models");
const Schedule = db.s_schedule;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    datatable(Schedule, req.body, {
        include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.t_class,
            as: "classSchedule",
            attributes: ["class_id", "class_name", "class_status"]
        }]
    }).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.sche_createdBy = req.user.id;

    Schedule.create(req.body)
        .then((data) => {
            Schedule.findByPk(data.sche_id,
                {
                    include: [{
                        model: db.user,
                        as: "createdBy",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }, {
                        model: db.t_class,
                        as: "classSchedule",
                        attributes: ["class_id", "class_name", "class_status"]
                    }]
                }).then((result) => {
                    res.send({
                        error: false,
                        data: result,
                        message: ["Schedule is created successfully."],
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

    Schedule.findAll({
        paranoid: false, include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.t_class,
            as: "classSchedule",
            attributes: ["class_id", "class_name", "class_status"]
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

    Schedule.findByPk(id, {
        include: [{
            model: db.user,
            as: "createdBy",
            attributes: ["user_id", "user_fullName", "user_access"]
        }, {
            model: db.t_class,
            as: "classSchedule",
            attributes: ["class_id", "class_name", "class_status"]
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
    req.body.sche_updatedBy = req.user.id;

    await Schedule.update(req.body, {
        where: { sche_id: id }, include: ["updatedBy"]
    })
        .then((data) => {
            if (data) {
                Schedule.findByPk(id, {
                    include: [{
                        model: db.user,
                        as: "createdBy",
                        attributes: ["user_id", "user_fullName", "user_access"]
                    }, {
                        model: db.t_class,
                        as: "classSchedule",
                        attributes: ["class_id", "class_name", "class_status"]
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
    req.body.sche_deletedBy = req.user.id;

    await Schedule.update(req.body, { where: { sche_id: id } }).then((data) => {
        if (data) {
            Schedule.findByPk(id)
                .then(async (data) => {
                    await Schedule.destroy({ where: { sche_id: data.sche_id } }).then((data) => {
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