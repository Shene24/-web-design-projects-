const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);
const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.post("/index", async (req, res) => {
  //  FIRSTname, lastnamae, email, phone, checkin, checkout, numberofguests, checkintime, checkouttime,
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var phone = req.body.phone;
  var checkin = req.body.checkin;
  var checkout = req.body.checkout;
  var checkintime = req.body.checkintime;
  var checkouttime = req.body.checkouttime;
  var numberofguests = req.body.numberofguests;

  var reservation = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    checkin: checkin,
    checkout: checkout,
    numberofguests: numberofguests,
    checkintime: checkintime,
    checkouttime: checkouttime,
  };

  db.collection("users").insertOne(reservation, (err, result) => {
    if (err) {
      console.error("Error inserting record:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log("Record inserted successfully");
    return res.redirect("/index");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
