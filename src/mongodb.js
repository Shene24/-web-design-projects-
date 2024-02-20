const mogoose = require("mongoose");
mogoose
  .connect("mongodb://")
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log("No connection");
  });

const reservationSchema = new mogoose.Schema({});
