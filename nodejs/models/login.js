const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  pwdHash: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  creted:{
    type: Date,
    default: Date.now
}
});

module.exports = Login = mongoose.model(
  "Login",
  Schema,
  "login"
);
