const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cardRouter = require("./routes/card");
require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const { MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DATABASE } = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@nodefirstapp-y7wne.mongodb.net/${MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(result => {
    console.log("connected to database");
  })
  .catch(err => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/card", cardRouter);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
