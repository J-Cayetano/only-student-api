const router = require("express").Router();
const userController = require("../controllers/user.controllers");


// Image Upload
const multer = require("multer");
const path = require("path");
const helpers = require("../helpers/image.helper");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/uploads/"));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const uploadImage = (req, res, next) => {

    let upload = multer({
        storage: storage,
        fileFilter: helpers.imageFilter,
    }).single("user_profilePhoto");

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
            // return res.status(500).send({
            //     error: true,
            //     data: [],
            //     message: ["Please select an image for your Profile picture to upload"],
            // });
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


// -------------------------------------------------


router.get("/", userController.findAll);
router.post("/", uploadImage, userController.create);
router.get("/table", userController.findDataTable);
router.get("/:id", userController.findOne);
router.put("/:id", uploadImage, userController.update);
router.delete("/:id", userController.delete);


module.exports = router;