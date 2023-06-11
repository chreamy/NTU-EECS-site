const express = require('express');
const server = express();
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
let User = require('./schemas/user.js');
require('dotenv/config')


server.use(cors())
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://127.0.0.1:27017/db0?directConnection=true?authSource=admin",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open',()=>{console.log('mongo connected!')}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});
const usersRouter = require('./routes/users')
server.use('/users',usersRouter)
// Start the API server
server.listen(PORT, () => console.log('Local app listening'));

console.log(User.find().json)