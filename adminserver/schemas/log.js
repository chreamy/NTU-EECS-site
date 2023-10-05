const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  username: { type: String, required: true },
  postid: { type: String },
  postTitle: { type: String },
  action: { type: String, required: true },
  comments: String, //IP, rewrite postid,title,action,user,time
  time: { type: Date, default: Date.now, required: true },
});

const Log = mongoose.model('Logs', logSchema);

module.exports = Log;