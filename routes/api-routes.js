var db = require("../models");
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
router.get("/user/:user", function (req, res) {
    db.User.findOne({
        where: {
            id: req.params.user
        }
    }).then(data => {
        res.render("user", data.dataValues);
    })
});

// get one representative by name
router.get("/representative/:name", function (req, res) {
    db.Representative.findOne({
        where: {
            name: req.params.name
        }
    }).then(function (dbRepresentative) {
        res.json(dbRepresentative);
    })
});
//render individual senator page
router.get("/senatorprofile/:fecid", function (req, res) {
    db.Senator.findOne({
        where: {
            fecId: req.params.fecid
        }
    }).then(response => {
        let editResponse = response.dataValues;
        if (editResponse.party === "R") {
            editResponse.party = "Republican";
        }
        else if (editResponse.party === "D") {
            editResponse.party = "Democrat";
        }
        else if (editResponse.party === "ID") {
            editResponse.party = "Independent"
        }
        if (editResponse.gender === "F") {
            editResponse.gender = "Female";
        }
        else {
            editResponse.gender = "Male";
        }
        res.render("senatorprofile", editResponse)
    });
})
//render individual representative page
router.get("/representativeprofile/:fecid", function (req, res) {
    db.Representative.findOne({
        where: {
            fecId: req.params.fecid
        }
    }).then(response => {
        let editResponse = response.dataValues;
        if (editResponse.party === "R") {
            editResponse.party = "Republican";
        }
        else if (editResponse.party === "D") {
            editResponse.party = "Democrat";
        }
        else if (editResponse.party === "ID") {
            editResponse.party = "Independent"
        }
        if (editResponse.gender === "F") {
            editResponse.gender = "Female";
        }
        else {
            editResponse.gender = "Male";
        }
        res.render("representativeprofile", editResponse)
    });
})

//unused
// // get one senator by name
// router.get("/senatorByName/:name", function (req, res) {
//     db.Senator.findOne({
//         where: {
//             name: req.params.name
//         }
//     }).then(function (dbSenator) {
//         res.json(dbSenator);
//     })
// });


// for user profile page 
// get all senators from one state
router.get("/senatorByState/:state", function (req, res) {
    db.Senator.findAll({
        where: {
            state: req.params.state
        }
    }).then(function (stateSens) {
        res.json(stateSens);
    })
});

// get all representatives from one state
router.get("/representativeByState/:state", function (req, res) {
    db.Representative.findAll({
        where: {
            state: req.params.state
        }
    }).then(function (stateReps) {
        res.json(stateReps);
    })
});


//relevant when we add comment functionality
// router.get("comment/:id", function (req, res) {
//     let senatorID = req.params.id;
//     db.Comment.findAll({
//         where: { SenatorId: senatorID }
//     }).then(function (response) {
//         response = response.map(c => c.dataValues);
//         res.json(response);
//     });
// });
// get all comments about a representative
// Sends an array of comment objects
// router.get("comment/:id", function (req, res) {
//     let repID = req.params.id;
//     db.Comment.findAll({
//         where: { RepresentativeId: repID }
//     }).then(function (response) {
//         response = response.map(c => c.dataValues);
//         res.json(response);
//     });
// });




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
// relevant once we add comment functionality
// router.post("/representative/comments", function (req, res) {
//     db.Comment.create(req.body).then(function (dbComment) {
//         res.json(dbComment)
//     })
// });
// // post a comment on a representatives page
// router.post("/senator/comments", function (req, res) {
//     db.Comment.create(req.body).then(function (dbComment) {
//         res.json(dbComment)
//     })
// });




// ===========================================================================
// QUERY REQUEST
// ===========================================================================

// SEARCH SENATORS
router.get("/senator/:party?/:state?/:gender?/:name?", function (req, res) {
    let whereClause = {};
    if (req.params.party !== "empty") {
        whereClause['party'] = req.params.party;
    }
    if (req.params.state !== "empty") {
        whereClause['state'] = req.params.state;
    }
    if (req.params.gender !== "empty") {
        whereClause['gender'] = req.params.gender;
    }
    if (req.params.name !== "empty") {
        whereClause['name'] = req.params.name;
    }
    db.Senator.findAll({
        where: whereClause
    }).then(function (dbSenators) {
        res.json(dbSenators);
    })
});

// SEARCH REPRESENTATIVES
router.get("/representative/:party?/:state?/:gender?/:name?", function (req, res) {
    let whereClause = {};
    if (req.params.party !== "empty") {
        whereClause['party'] = req.params.party;
    }
    if (req.params.state !== "empty") {
        whereClause['state'] = req.params.state;
    }
    if (req.params.gender !== "empty") {
        whereClause['gender'] = req.params.gender;
    }
    if (req.params.name !== "empty") {
        whereClause['name'] = req.params.name;
    }
    db.Representative.findAll({
        where: whereClause
    }).then(function (dbRepresentative) {
        res.json(dbRepresentative)
    })
});

module.exports = router;
