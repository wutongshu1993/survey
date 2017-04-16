/**
 * Created by lh on 2017/4/10.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.send('hello express index');
})

module.exports = router;
