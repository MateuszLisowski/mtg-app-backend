const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cardRouter = require("./routes/card");

mongoose
  .connect(
    "mongodb+srv://mateusz:g2ssKmYNyl28Ux1i@nodefirstapp-y7wne.mongodb.net/firstApp?retryWrites=true&w=majority",
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

app.use("/card", cardRouter);

app.listen(3000, () => console.log("Server Started"));
