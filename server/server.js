const express = require('express');
const server = express();
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
let User = require('./schemas/users.js');
require('dotenv/config')


server.use(cors())
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://localhost:27017/",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once('open',()=>{console.log('mongo connected!')})
const usersRouter = require('./routes/users')
server.use('/users',usersRouter)
// Start the API server
server.listen(PORT, () => console.log('Local app listening'));

console.log(User.find().json)