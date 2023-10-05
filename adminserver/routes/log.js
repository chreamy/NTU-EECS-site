const router = require('express').Router();
let Log = require('../schemas/log');

router.route('/').get(async (req, res) => {
  Log.find()
    .then(logs => res.json(logs))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post(async (req, res) => {
  const newLog = new Log({
  username: req.body.username,
  postid: req.body.postid,
  postTitle: req.body.postTitle,
  action: req.body.action,
  comments: req.body.comments
  });

  newLog.save()
    .then(() => res.json('Log added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;