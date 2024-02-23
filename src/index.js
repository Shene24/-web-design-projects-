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

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);

mongoose.connect("mongodb://localhost:27017/housebooking");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); // Fix this line
db.once("open", function () {
  console.log("Connected to database");
});

app.post("/index", async (req, res) => {
  //  FIRSTname, lastnamae, email, phone, checkin, checkout, numberofguests, checkintime, checkouttime,
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var phone = req.body.phone;
  var checkin = req.body.checkin;
  var checkout = req.body.checkout;
  var numberofguests = req.body.numberofguests;
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
  db.collection("users").intertOne(reservation, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record inserted successfully");
  });
  return res.redirect("/index");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
