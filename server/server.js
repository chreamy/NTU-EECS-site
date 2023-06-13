const express = require('express');
const server = express();
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
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
const userRouter = require('./routes/user')
server.use('/user',userRouter)
const postRouter = require('./routes/post')
server.use('/post',postRouter)
// Start the API server
server.listen(PORT, () => console.log('Local app listening'));
