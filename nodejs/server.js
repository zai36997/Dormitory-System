
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  mongoose = require("mongoose"),
  config = require('./config/index')

  port = process.env.PORT

  app.use(bodyParser.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true , useCreateIndex: true,useUnifiedTopology: true}).then(
    // เมื่อการเชื่อมต่อสำเร็จ
    () => {
      console.log("Database connection is successful");
    },
    // เมื่อการเชื่อมต่อไม่สำเร็จ
    err => {
      console.log("Error when connecting to the database" + err);
    }
  );
  app.listen(port, function() {
    console.log("Listening on port " + port);
  });
