const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator(name) {
          return validator.isAlphanumeric(name);
        }
      }
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        }
      }
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
