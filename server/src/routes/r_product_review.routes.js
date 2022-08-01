const router = require("express").Router();
const productReviewController = require("../controllers/r_product_review.controllers");

router.get("/", productReviewController.findAll);
router.post("/", productReviewController.create);
router.get("/table", productReviewController.findDataTable);
router.get("/:id", productReviewController.findOne);
router.put("/:id", productReviewController.update);
router.delete("/:id", productReviewController.delete);


module.exports = router;