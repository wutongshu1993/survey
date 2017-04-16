/**
 * Created by lh on 2017/4/10.
 */
const express = require('express');
var config = require('./config/db');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var index = require('./router/index');
var exam = require('./router/exam');

mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(express.static('dist'));
app.use('/', index);
app.use('/api', exam);


app.listen(3000, ()=>{
  console.log(`app listen on port ${port}`);
});

module.exports = app;
