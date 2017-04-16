/**
 * Created by lh on 2017/4/10.
 */
const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
  header : {type: String, required: true},
  content : [{}],
  state: String,
  deadLine : String
});
const Exam = module.exports = mongoose.model('Exam', examSchema);
