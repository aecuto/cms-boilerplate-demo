const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const AdminSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
      index: true
    },
    password: String,
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin'
    }
  },
  {
    timestamps: true
  }
);

// key soft delete is deleted
AdminSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('admins', AdminSchema);
