const express = require("express");
const router = express.Router();

const UserRouter = require("./user.routes")
const ReviewRouter = require("./review.route");

router.use("/",UserRouter)
router.use("/music", ReviewRouter);

router.get("/", (_req, res) => {
    res.send("정상적으로 요청되었습니다.");
  });
  

module.exports = router;