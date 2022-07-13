const fileFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(pdf|PDF)$/)) {
        req.fileValidationError = "Only PDF files are allowed!";
        return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
};
exports.fileFilter = fileFilter;
