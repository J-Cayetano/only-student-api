const router = require("express").Router();

const accessCheck = (req, res, next) => {
    if (req.user.access != "tutor") {
        return res.status(401).send({
            message: "Unauthorized access! Account access is not tutor."
        })
    } else {
        next();
    }
}

// Import Routers - Setups
var levelRouter = require('./s_level.routes');
var typeRouter = require('./s_type.routes');
var userRouter = require('./user.routes');
var tutorRequirementRouter = require('./t_tutor_requirements.routes');
var classRouter = require('./t_class.routes');
var feedbackRouter = require('./r_feedback.routes');


// Routes for Setups (For Authentication)
router.use('/user', accessCheck, userRouter);
router.use('/level', accessCheck, levelRouter);
router.use('/type', accessCheck, typeRouter);


// Routes for Transactions (For Authentication)
router.use('/tutorrequirement', accessCheck, tutorRequirementRouter)
router.use('/class', accessCheck, classRouter);

// Routes for Records (For Authentication)
router.use('/feedback', accessCheck, feedbackRouter);




module.exports = router;