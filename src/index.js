const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongodb");

const tempelatepath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, '../public');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatepath);
app.use(express.urlencoded({ extended: false }));

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/forgot-password", (req, res) => {
    res.render("forgot-password");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    await collection.insertMany([data]);
    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("wrong password");
        }
    } catch {
        res.send("wrong details");
    }
});

app.post("/forgot-password", async (req, res) => {
    const { name } = req.body;
    try {
        const user = await collection.findOne({ name });
        if (!user) {
            res.send("No account with that name found.");
        } else {
            // Render the reset-password form with user details
            res.render("reset-password", { userId: user._id.toString() });
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred.");
    }
});

app.post("/reset-password", async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await collection.findOne({ _id: userId });
        if (!user) {
            res.send("User not found.");
        } else {
            user.password = password;
            await user.save();
            res.send("Password has been reset successfully.");
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred.");
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
