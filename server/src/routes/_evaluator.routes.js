const router = require("express").Router();

const accessCheck = (req, res, next) => {
    if (req.user.access != "evaluator") {
        return res.status(401).send({
            message: "Unauthorized access! Account access is not evaluator."
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


// Routes for Setups (For Authentication)
router.use('/user', accessCheck, userRouter);
router.use('/level', accessCheck, levelRouter);
router.use('/type', accessCheck, typeRouter);


// Routes for Transactions (For Authentication)
router.use('/tutorrequirement', accessCheck, tutorRequirementRouter);






module.exports = router;