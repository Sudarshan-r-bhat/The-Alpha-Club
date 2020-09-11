// configure the user object. (model object)
const mongoose = require("mongoose")

const Schema = mongoose.Schema   // reference schema class.
const userSchema = new Schema({
    email: String,
    password: String
});  // defined a Schema object

module.exports = mongoose.model("user", userSchema, "users"); // syntax: modelName, <schema>, <MongodatabaseName>









