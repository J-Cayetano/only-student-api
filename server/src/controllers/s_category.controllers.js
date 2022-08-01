// Import Packages
const db = require("../models");
const Category = db.s_category;
const datatable = require(`sequelize-datatables`);
const { Op, where } = require("sequelize");

// Messages Environment
const dotenv = require("dotenv");
dotenv.config();


// -----------------------------------------


// Datatable
exports.findDataTable = (req, res) => {

    req.body = {
        draw: "1",
        columns: [
            {
                data: "cate_name",
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
    datatable(Category, req.body).then((result) => {
        res.json(result);
    });
};

// Create and Save an Instance
exports.create = async (req, res) => {

    req.body.cate_createdBy = req.user.id;

    Category.create(req.body)
        .then((data) => {
            Category.findByPk(data.cate_id, { include: { model: db.user, as: "createdBy", attributes: ["user_id", "user_fullName", "user_access"] } }).then((result) => {
                res.send({
                    error: false,
                    data: result,
                    message: ["Category is created successfully."],
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

    Category.findAll({ where: { cate_deletedAt: null, cate_deletedBy: null } }).then((data) => {
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
    req.body.cate_updatedBy = req.user.id;

    await Category.update(req.body, { where: { cate_id: id }, include: ["updatedBy"] })
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
exports.delete = async (req, res) => {
    const id = req.params.id;
    req.body.cate_deletedBy = req.user.id;

    await Category.destroy({ where: { cate_id: id } }).then((data) => {
        Category.update(body, { where: { cate_id: id } })
            .then((data) => {
                if (data) {
                    Category.findByPk(id)
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