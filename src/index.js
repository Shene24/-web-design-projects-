const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates/views");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
