const express = require("express");
const router = express.Router();

var apiRoutes = require("./api-routes");
var htmlRoutes = require("./html-routes")

router.use("/api", apiRoutes);
router.use("/", htmlRoutes);




// const apiRoutes = require('./api/');
// const homeRoutes = require('./home-routes.js');
// const dashboardRoutes = require('./dashboard-routes.js');

// router.use('/', homeRoutes);
// router.use('/dashboard', dashboardRoutes);
// router.use('/api', apiRoutes);

module.exports = router;


