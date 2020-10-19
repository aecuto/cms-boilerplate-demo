const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      index: true
    },
    password: String
  },
  {
    timestamps: true
  }
);

// key soft delete is deleted
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('users', UserSchema);
