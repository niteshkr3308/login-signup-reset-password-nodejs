const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginsignup")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Failed to connect");
    });

const loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date
});

const collection = mongoose.model("collection1", loginschema);

module.exports = collection;