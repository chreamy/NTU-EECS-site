const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  username: { type: String, required: true },
  postid: { type: Number, required: true },
  actionid: { type: Number, required: true }, //0: edit, 1: delete, 2: archive....
  comments: String,
  time: { type: Date, default: Date.now, required: true },
});

const Log = mongoose.model('Logs', logSchema);

module.exports = Log;