const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const productRouter = require ("./controllers/routes/productRouter.js")
const singleGetList = require ("./controllers/routes/singleGetList.js")
console.log(process.env.NODE_ENV, "MODE")
const config = require('config'); 
const port = 3000;
const app = express();

//db connection      

mongoose.connect(config.DBHost, { useNewUrlParser: true })

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => console.log("connected to the database"));

//avoid warnings

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//external bodyParser 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//keeping routes in separate file, easier to maintain 

app.use("/api/products", singleGetList)
app.use("/api/product", productRouter)

// error 404

app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  console.log(err)
  err.status = 404;
  next(err);
});

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

module.exports = app;