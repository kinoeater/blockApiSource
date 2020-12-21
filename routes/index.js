const express = require("express");
const userOperations =require("./userOperations");

const router = express.Router();

router.use("/user",userOperations);

module.exports = router;