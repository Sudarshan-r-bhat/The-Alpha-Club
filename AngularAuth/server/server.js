
// IMPORTING THE NECESSARY PACKAGES / CLASSES
const express = require('express');
const bodyParser = require('body-parser');
const api = require("./routes/api")

// listening port
const PORT = 3000


const app = express();

app.use(bodyParser.json());

// request mapping and response entity
app.use("/api", api);  // url req end-points
app.get("/", (req, res) => res.send("hello from server")); // lambda mapping refers to the outer scope.
// unlike using function() keyword. every function in js is a object. just as in SCala 


app.listen(PORT, function() {
    console.log("Server running on localhost: " + PORT);
});








