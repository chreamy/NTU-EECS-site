const router = require('express').Router();
let Post = require('../schemas/post');

router.route('/').get(async (req, res) => {
  Post.find({status:1})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/name/:name').get(async (req, res) => {
  if(await auth(req,1)!==1){res.status(403).json('Auth Error');return}
    Post.find({name:req.params.name})
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/category').post(async (req, res) => {
  if(req.body.category&&req.body.status){
    Post.find({category:{"$in":req.body.category},status:req.body.status||{"$in":[0,1,2,3]}})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
  }else if(req.body.category){
    Post.find({category:{"$in":req.body.category}})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
  }else{
    Post.find({status:req.body.status||{"$in":[0,1,2,3]}})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
    }
 
});

router.route('/:_id').get(async (req, res) => {
  Post.findOne({_id:req.params._id})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;