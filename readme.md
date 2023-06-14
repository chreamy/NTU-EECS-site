

API reference with role specifications, numbers indicate that operations can only be done by:
0️⃣ Admin Role 1️⃣ Reviewer Role 2️⃣ Poster Role 3️⃣ No Roles

__**User API**__

`GET /user` 0️⃣ Returns all users 1️⃣ Returns all posters
`POST /user/add` 0️⃣ Registers a new user to DB
`GET /user/<username>` 0️⃣ Returns any user info with corresponding username 1️⃣ Returns poster info with corresponding username
`DELETE /user/<username>` 0️⃣ Deletes the user with corresponding username
`POST /user/update/<username>` 0️⃣ Updates the attributes of the corresponding user using the contents in the posted JSON object 1️⃣2️⃣3️⃣ Updates self info except permission
`POST /user/login` 0️⃣1️⃣2️⃣3️⃣ Login and returns JWT token

__**Post API**__

`GET /post` 0️⃣1️⃣ Returns all posts 2️⃣ Returns all post from themselves
`POST /post/add` 0️⃣1️⃣2️⃣ Adds new post to DB
`GET /post/author/<author>` 0️⃣1️⃣ Returns posts by an author
`GET /post/category/<category>` 0️⃣1️⃣ Returns posts with a particular category tag
`POST /post/category/` 0️⃣1️⃣ Returns posts with at least one tags matching the tags in the posted JSON object
`GET /post/<_id>` 0️⃣1️⃣ Returns the post with corresponding _id
`DELETE /post/<_id>` 0️⃣ Deletes the post with corresponding _id 1️⃣ Archive posts 2️⃣ Archive self posts
`POST /user/update/<_id>` 0️⃣1️⃣ Updates the attributes of the corresponding post using the contents in the posted JSON object 2️⃣ Update self posts 

**__SCHEMAS__**

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

const logSchema = new Schema({
  username: { type: String, required: true },
  postid: { type: Number, required: true },
  actionid: { type: Number, required: true }, //0: edit, 1: delete, 2: archive....
  comments: String,
  time: { type: Date, default: Date.now, required: true },
});