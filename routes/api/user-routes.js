var db = require("../../models");
const express = require("express");
const router = express.Router();

// ===========================================================================
// GET REQUESTS
// ===========================================================================
//login validation
router.get("/login/:email/:password", function (req, res) {
    db.Login.findOne({
        where: {
            email: req.params.email,
            password: req.params.password
        }
    }).then(function (data) {
        res.json(data.dataValues.UserId);

    })
});
//load profile page
router.get("/:user", function (req, res) {
    db.User.findOne({
        where: {
            id: req.params.user
        }
    }).then(data => {
        res.render("user", data.dataValues);
    })
});

// ===========================================================================
// POST REQUESTS
// ===========================================================================
//sign up
router.post("/addcredential", function (req, res) {
    var user = {
        name: req.body.name,
        location: req.body.location
    };
    var login = {
        email: req.body.email,
        password: req.body.password

    };
    db.User.create(user).then(res => {
        login.UserId = res.dataValues.id;
        db.Login.create(login);
    })
});

module.exports = router;
