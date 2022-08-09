const router = require("express").Router();

const accessCheck = (req, res, next) => {
    if (req.user.access != "admin") {
        return res.status(401).send({
            message: "Unauthorized access! Account access is not admin."
        })
    } else {
        next();
    }
}

// Import Routers
var levelRouter = require('./s_level.routes');
var typeRouter = require('./s_type.routes');
var userRouter = require('./user.routes');
var categoryRouter = require('./s_category.routes');
var scheduleRouter = require('./s_schedule.routes');
var classRouter = require('./t_class.routes');
var tutorRequirementRouter = require('./t_tutor_requirements.routes');
var feedbackRouter = require('./r_feedback.routes');
var productReviewRouter = require('./r_product_review.routes');
var subjectRouter = require('./s_subject.routes');
var requirementRouter = require('./s_requirement.routes');



// Routes for Setups (For Authentication)
router.use('/user', accessCheck, userRouter);
router.use('/level', accessCheck, levelRouter);
router.use('/type', accessCheck, typeRouter);
router.use('/category', accessCheck, categoryRouter);
router.use('/schedule', accessCheck, scheduleRouter);
router.use('/subject', accessCheck, subjectRouter);
router.use('/requirement', accessCheck, requirementRouter);


// Routes for Transactions (For Authentication)
router.use('/class', accessCheck, classRouter);
router.use('/tutorrequirement', accessCheck, tutorRequirementRouter);


// Routes for Records (For Authentication)
router.use('/feedback', accessCheck, feedbackRouter);
router.use('/productreview', accessCheck, productReviewRouter);




module.exports = router;