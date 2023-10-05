const express = require('express');
const fs = require('fs');
const Grid = require("gridfs-stream");
const https = require('https');
const server = express();
const cors = require('cors')
const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || "localhost"
const mongoose = require('mongoose');
require('dotenv/config')


server.use(cors())
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let gfs;
const connection = mongoose.connection;
connection.once('open',()=>{console.log('mongo connected!');
gfs = Grid(connection.db, mongoose.mongo);
gfs.collection("photos");}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});
const postRouter = require('./routes/post');
server.use('/post',postRouter)

// media routes
server.get("/file/:filename", async (req, res) => {
  try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
  } catch (error) {
    res.send(error);
  }
});
// Start the API server
server.listen(PORT, () => console.log('Local app listening'));
//https.createServer(options, server).listen(PORT, () => console.log('Local app listening'));
