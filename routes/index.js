const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");
const htmlRoutes = require("./html-routes")

router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;


