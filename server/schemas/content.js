const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  author: { type: String, required: true },
  postid: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  media: [{
    id: { type: Number, required: true },
    url: { type: String, required: true },
    extension: { type: String, required: true }, //png, jpg, gif, mp4....
  }], //array of media
  category: [String], //year of graduation, industry, gender, and other tags to sort posts
  contentType: { type: Number, required: true }, //0: text only, 1: image only, 2: video only, 3: text and image, etc
  layout: { type: Number, required: true }, //layout id for different formats
  created: { type: Date, required: true },
  updated: { type: Date, default: Date.now, required: true },
  approved: { type: Boolean, required: true },
});

const Contents = mongoose.model('Contents', contentSchema);

module.exports = Contents;