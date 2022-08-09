const router = require("express").Router();
const tutrController = require("../controllers/t_tutor_requirement.controller");


// Image Upload
const multer = require("multer");
const path = require("path");
const helpers = require("../helpers/file.helper");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/file/"));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const uploadFile = (req, res, next) => {

    let upload = multer({
        storage: storage,
        fileFilter: helpers.fileFilter,
    }).single("tutr_fileLink");

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.status(500).send({
                error: true,
                data: [],
                message: [req.fileValidationError],
            });
        } else if (!req.file) {
            return res.status(500).send({
                error: true,
                data: [],
                message: ["Please select a file to upload."],
            });
        } else if (err instanceof multer.MulterError) {
            return res.status(500).send({
                error: true,
                data: [],
                message: [err],
            });
        } else if (err) {
            return res.status(500).send({
                error: true,
                data: [],
                message: [err],
            });
        }

        next();
    });
};






router.get("/", tutrController.findAll);
router.post("/", uploadFile, tutrController.create);
router.get("/table", tutrController.findDataTable);
router.get("/:id", tutrController.findOne);
router.put("/:id", uploadFile, tutrController.update);
router.delete("/:id", tutrController.delete);


module.exports = router;