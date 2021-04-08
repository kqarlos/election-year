var path = require("path");
const express = require("express");
const router = express.Router();
// var loadedTables = false;

router.get("/", function (req, res) {

    // if (loadedTables === false) {
    //     loadedTables = true;
    //     require("../db/populateDB")();
    //     res.render("index");
    // } else if (loadedTables === true) {
    res.render("index");
    // }

})
router.get("/profile", function (req, res) {
    res.render("user");
})
router.get("/search/congress", function (req, res) {
    res.render("congress");
})
module.exports = router;
