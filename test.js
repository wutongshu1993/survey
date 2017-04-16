/**
 * Created by lh on 2017/4/13.
 */
/*function a(){
  var i;
  var arr = [];
  var item;
  for(i = 0; i < 5; i++){
    item = Object.create(null , {paper: {value: false,  writable: true, enumerable: true, configurable: true }});
    arr.push(item);
  }
  return arr;
}
var arr = a();
arr[0].paper = true;
console.log(arr);*/
/*function getTime(){
  var time = new Date();
  var res = '';
  var year = time.getFullYear();
  var month = (time.getMonth()+1) > 10 ? time.getMonth()+1 : ('0'+(time.getMonth()+1));
  var date = time.getDate() > 10 ? time.getDate() : '0'+time.getDate();
  res = year+'-'+month+'-'+date;
  console.log(res);
}
getTime();*/

function timeout(ms){
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');//第三个参数在事件到期后会传到resolve中，resolve('done')，所以就相当于给then的参数是done
  })
}
timeout(1000).then((value) => {
  console.log(value);
})
