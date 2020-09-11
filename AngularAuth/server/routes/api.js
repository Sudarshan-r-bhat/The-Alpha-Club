
// configure the routes
const express = require("express");   // import express model
const router = express.Router();
const User = require("../model/user");  // importing the model.

const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/users";    // db connection string: <mongodb://user:password:url:dbname>   recheck the url and port numbers for mongo.

mongoose.connect(db, err => (err ? console.error("Error! " + err): console.log("connected to Mongo DB")));

router.get("/", (req, res) => {
    res.send("From API route");
});

router.post("/register", (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    // mongoose implicitly allows save method for the model. {some implicit method injection by mongoose}
    user.save((error, registeredUser) => {
        if(error) console.log(error);
        else res.status(200).send(registeredUser);
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    // we check if the email id exists in the database.
    // using model we, access the mongoose methods.
    User.findOne({email: userData.email}, (error, user) => {
        if(error) console.log(error);
        else {
            if(!user) {
                res.status(401).send("Invalid Email");
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send("Invalid Password");
                } else {
                    res.status(200).send(user);
                }
            }
        }
    });
});

// To less complicate the project we don't refer to the DB. we hard code the events.
router.get("/events", (req, res) => {
    let events = [
        {
            "_id": "190kj-39843-370nl3",
            "name": "A talk on Regression analysis",
            "description": "more discussion on python modules for regression analysis",
            "date": "2020-09-11 11:30 GMT+0530"
        },
        {
            "_id": "190kj-39843-370d00",
            "name": "A talk on Supervised ML",
            "description": "more discussion on python modules for Supervised ML",
            "date": "2020-09-12 11:30 GMT+0530"
        },
        {
            "_id": "190kj-39843-370e82",
            "name": "A talk on UnSupervised ML",
            "description": "more discussion on python modules for UnSupervised ML",
            "date": "2020-09-13 11:30 GMT+0530"
        },
        {
            "_id": "190kj-39843-370w10",
            "name": "A talk on Java for students",
            "description": "in-depth discussion on java core",
            "date": "2020-12-11 11:30 GMT+0530"
        }
    ];
    res.json(events);
});

router.get("/specialevents", (req, res) => {
    let specialevents = [
        {
            "_id": "190kj-39843-370DDD",
            "name": "Deep learning with Scala",
            "description": "more discussion on ML using Scala",
            "date": "2020-12-09 11:30 GMT+0530"
        },
        {
            "_id": "190kj-39843-370EEE",
            "name": "Akka fundamentals",
            "description": "More disscussion on Http",
            "date": "2020-12-10 11:30 GMT+0530"
        },
        {
            "_id": "190kj-39843-37QLOW",
            "name": "Akka fundamentals",
            "description": "more discussions on Streams",
            "date": "2020-12-11 11:30 GMT+0530"
        },
        {
            "_id": "190kj-39843-370YBC",
            "name": "Akka fundamentals",
            "description": "more discussion on serialization",
            "date": "2020-12-12 11:30 GMT+0530"
        }
    ];
    res.json(specialevents);
});

// module.exports is just a way
// to globally communicate.
module.exports =  router;






