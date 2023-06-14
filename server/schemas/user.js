const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  preferredContact: String,
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
  permission: { type: Number, required: true }, //0: admin, 1: reviewer, 2: poster, 3: no perms
});

const User = mongoose.model('Users', userSchema);

module.exports = User;