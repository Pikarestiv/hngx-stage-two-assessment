const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Assuming name is unique
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid name!`,
    },
  },
  age: Number,
  email: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Person", personSchema);
