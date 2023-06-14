const router = require('express').Router();
let Post = require('../schemas/post');
const auth = require('./auth');

router.route('/').get(async (req, res) => {
  if(await auth(req,1)!==1){res.status(403).json('Auth Error');return}
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
  
  const newPost = new Post({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    media: req.body.media, 
    category: req.body.category,
    contentType: req.body.contentType,
    layout: req.body.layout,
    created: req.body.created,
    updated: req.body.updated,
    status: req.body.status,
  });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/author/:author').get((req, res) => {
    Post.find({author:req.params.author})
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/category/:category').get((req, res) => {
  Post.find({category:req.params.category})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/category').post((req, res) => {
  Post.find({category:{"$in":req.body.category}})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:_id').get((req, res) => {
  Post.find({_id:req.params._id})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:_id').delete((req, res) => {
  Post.findOneAndDelete({_id:req.params._id})
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:_id').post((req, res) => {
  Post.findOne({_id:req.params._id})
    .then(post => {
      Post.replaceOne({username:req.params.username},{
        author: req.body.author||post.author,
        title: req.body.title||post.title,
        description: req.body.description||post.description,
        media: req.body.media||post.media, 
        category: req.body.category||post.category,
        contentType: req.body.contentType||post.contentType,
        layout: req.body.layout||post.layout,
        created: req.body.created||post.created,
        updated: req.body.updated||post.updated,
        status: req.body.status||post.status,
      }).then(() => res.json('Post updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

  
});

module.exports = router;