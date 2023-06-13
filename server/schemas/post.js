const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  media: [{
    url: { type: String, required: true },
    extension: { type: String, required: true }, //png, jpg, gif, mp4....
  }], //array of media
  category: [String], //year of graduation, industry, gender, and other tags to sort posts
  contentType: { type: Number, required: true }, //0: text only, 1: image only, 2: video only, 3: text and image, etc
  layout: { type: Number, required: true }, //layout id for different formats
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
  status: { type: Number, min:0,max:2,required: true } //0: pending, 1: approved, 2:rejected
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;