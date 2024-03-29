
// configure the routes
const express = require("express");   // import express model
const router = express.Router();
const User = require("../model/user");  // importing the model.
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const db = "mongodb://localhost:27017/users";    // db connection string: <mongodb://user:password:url:dbname>   recheck the url and port numbers for mongo.
mongoose.connect(db, err => (err ? console.error("Error! " + err): console.log("connected to Mongo DB")));

// function to verify the request.
// syntax: reqest, responseEntity, nextEntity . what  is next ??
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send("UnAuthorized request");
    }
    // extract token.
    const token = req.headers.authorization.split(" ")[1];
    if(token === 'null') {
        return res.status(401).send("unauthorized access");
    }
    const payload = jwt.verify(token, "secretkey");
    if(!payload) return res.status(401).send('unauthorized access');
    req.userId = payload.subject;
    next();

}




router.get("/", (req, res) => {
    res.send("From API route");
});

router.post("/register", (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    // mongoose implicitly allows save method for the model. {some implicit method injection by mongoose}
    user.save((error, registeredUser) => {
        if(error) console.log(error);
        else {
            // where did the _id come from ???
            const payload = {subject: user._id};  // create a payload
            const token = jwt.sign(payload, "secretkey"); // syntax: payload, secret key
            res.status(200).send({token});  // syntax: objects.

            
        }
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
                    const payload = {subject: user._id};
                    const token = jwt.sign(payload, "secretkey");
                    res.status(200).send({token});   // always remember to send only and only objects!
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

// verify function is used by the router class.
router.get("/specialevents", verifyToken, (req, res) => {
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






