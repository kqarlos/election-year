var axios = require("axios");
var db = require("../models");
module.exports = function () {

    function populateRepresentatives() {

        var congressAPIKey = "UFPeOmK8QV2coqMTmy2Fz2cEPZeVOe0hGJsPngJd";
        var url = "https://api.propublica.org/congress/v1/116/senate/members.json";

        var options = {
            method: 'GET',
            headers: { 'X-API-Key': congressAPIKey },
            url,
        };
        axios(options).then(function (response) {
            // console.log(response.data);
            console.log("Senators");
            // console.log(response.data.results[0].members);
            var members = response.data.results[0].members;
            // console.log(members[0]);

            for (let i = 0; i < members.length; i++) {
                db.Senator.create({
                    name: members[i].first_name + " " + members[i].last_name,
                    state: members[i].state,
                    fecId: members[i].fec_candidate_id,
                    memberId: members[i].id,
                    // added party and gender info -IT
                    party: members[i].party,
                    gender: members[i].gender
                });
            }


        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

        url = "https://api.propublica.org/congress/v1/116/house/members.json";
        options = {
            method: 'GET',
            headers: { 'X-API-Key': congressAPIKey },
            url,
        };
        axios(options).then(function (response) {
            // console.log(response.data);
            console.log("Representatives");
            // console.log(response.data.results[0].members);
            var members = response.data.results[0].members;
            // console.log(members[0]);

            for (let i = 0; i < members.length; i++) {
                db.Representative.create({
                    name: members[i].first_name + " " + members[i].last_name,
                    district: members[i].state + members[i].district,
                    // added state info
                    state: members[i].state,
                    fecId: members[i].fec_candidate_id,
                    memberId: members[i].id,
                    // added party and gender info -IT
                    party: members[i].party,
                    gender: members[i].gender
                });
            }

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

    }
    console.log("CALLING TO POPULATE");

    populateRepresentatives();
}