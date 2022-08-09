const router = require("express").Router();

const accessCheck = (req, res, next) => {
    if (req.user.access != "student") {
        return res.status(401).send({
            message: "Unauthorized access! Account access is not student."
        })
    } else {
        next();
    }
}

// Import Routers - Setups
var levelRouter = require('./s_level.routes');
var userRouter = require('./user.routes');
var classRouter = require('./t_class.routes');
var feedbackRouter = require('./r_feedback.routes');
var scheduleRouter = require('./s_schedule.routes');
var subjectRouter = require('./s_subject.routes');
var categoryRouter = require('./s_category.routes');

// Routes for Setups (For Authentication)
router.use('/user', accessCheck, userRouter);
router.use('/level', accessCheck, levelRouter);
router.use('/category', accessCheck, categoryRouter);
router.use('/schedule', accessCheck, scheduleRouter);
router.use('/subject', accessCheck, subjectRouter);

// Routes for Transactions (For Authentication)
router.use('/class', accessCheck, classRouter);

// Routes for Records (For Authentication)
router.use('/feedback', accessCheck, feedbackRouter);




module.exports = router;