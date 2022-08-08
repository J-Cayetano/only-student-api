const router = require("express").Router();


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
router.use('/user', userRouter);
router.use('/level', levelRouter);
router.use('/type', typeRouter);
router.use('/category', categoryRouter);
router.use('/schedule', scheduleRouter);
router.use('/subject', subjectRouter);
router.use('/requirement', requirementRouter);


// Routes for Transactions (For Authentication)
router.use('/class', classRouter);
router.use('/tutorrequirement', tutorRequirementRouter);


// Routes for Records (For Authentication)
router.use('/feedback', feedbackRouter);
router.use('/productreview', productReviewRouter);




module.exports = router;