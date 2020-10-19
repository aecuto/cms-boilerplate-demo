const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const ProductSchema = new Schema(
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
    company: {
      type: String,
      required: true,
      validate: {
        validator(company) {
          return validator.isAlphanumeric(company);
        }
      }
    },
    status: {
      type: String,
      required: true,
      validate: {
        validator(status) {
          return validator.isAlphanumeric(status);
        }
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('products', ProductSchema);
