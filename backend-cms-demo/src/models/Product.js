const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const ProductSchema = new Schema(
  {
    name: String,
    company: String,
    status: String
  },
  {
    timestamps: true
  }
);

// key soft delete is deleted
ProductSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('products', ProductSchema);
