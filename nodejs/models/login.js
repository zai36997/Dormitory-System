const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
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
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  
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

userSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password,salt)
    return hash
}

module.exports = User = mongoose.model(
  "User",
  userSchema,
  "login"
);
