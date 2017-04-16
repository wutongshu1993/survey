/**
 * Created by lh on 2017/4/10.
 */
const express = require('express');
const router = express.Router();
const Exam = require('../model/exam');

//查询所有试卷,并以json的数据格式返回
router.get('/exam', (req, res) => {
  Exam.find({})
    .then( exams => {
    res.json(exams);
  })
    .catch(err => {
      console.error(err);
      res.json(err);
    })
});

//创建试卷
router.post('/exam/create',(req, res) =>{
  console.log(req.body);
Exam.create(req.body, (err, exam) => {
  if(err){
    console.log(err)
    res.json(err);
  }
  else {
    res.json(exam);
  }
})
});

//删除指定试卷
router.delete('/exam/:paperIds', (req, res) => {
  var ids = req.params.paperIds;
  ids = ids.split(',');
  console.log(ids);
  Exam.deleteMany({_id : {$in: ids}})
    .then(res => {
      res.send('delete ok');
    })
    .catch( err => res.json(err));
});

//编辑试卷,获取试卷内容
router.get('/exam/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Exam.findById(id)
    .then(paper => {
      res.json(paper);
    })
    .catch(err => {
      res.json(err);
    })
});

//编辑试卷，修改数据库中的内容
router.put('/exam/:id', (req, res) => {
  const id = req.params.id;
  Exam.findOneAndUpdate({
    _id : id
  },{
    $set : {
      header : req.body.header,
      state : req.body.state,
      deadLine : req.body.deadLine,
      content : req.body.content
    }
  }).
    then(paper => {
    res.send(paper);
  })
    .catch(err => res.send(err));
})
module.exports = router;
