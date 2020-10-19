const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const UserAgentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    os: Object,
    browser: Object,
    ip: String,
    location: Object,
    path: String,
    is_fail: Boolean
  },
  {
    timestamps: true
  }
);

UserAgentSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('user_agents', UserAgentSchema);
