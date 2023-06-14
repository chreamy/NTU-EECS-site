const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
let User = require('../schemas/user');
const auth = require('./auth');

const createToken = (username) =>{
  return jwt.sign({username},process.env.SECRET,{expiresIn:'30m'})
}

router.route('/').get(async function(req, res){
  if(await auth(req,0)!==1){res.status(403).json('Auth Error');return}
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post(async function(req, res){
  const exists = await User.findOne({username:req.body.username})
  if(exists){
    res.json('User already exists')
    return
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password,salt)
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    permission: req.body.permission
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
    User.find({username:req.params.username})
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
  router.route('/:username').delete((req, res) => {
    User.findOneAndDelete({username:req.params.username})
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:username').post((req, res) => {
    User.findOne({username:req.params.username})
      .then(async user => {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        User.replaceOne({username:req.params.username},{
          username: req.body.username||user.username,
          password: hashedPassword||user.password,
          name: req.body.name||user.name,
          email: req.body.email||user.email,
          phone: req.body.phone||user.phone,
          permission: req.body.permission||user.permission,
          created: user.created,
          updated: Date.now
        }).then(() => res.json('User updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  
    
  });
  router.route('/login').post(async function(req, res){ 
    const user = await User.findOne({username:req.body.username})
    if(!user){
      res.status(400).json('username invalid')
      return
    }
    if(!req.body.password){
      res.status(400).json('password cannot be blank')
      return
    }
    const hashedPassword = user.password
    const match = await bcrypt.compare(req.body.password,hashedPassword)
    if(!match){
      res.status(400).json('incorrect credentials')
    }else{
      res.status(200).json({message:'login success',token:createToken(req.body.username),user:req.body.username})
    }
   });
module.exports = router;