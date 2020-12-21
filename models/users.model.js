const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const User = Schema({
  username: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required:true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
      
  }
});

module.exports = mongoose.model("User", User);