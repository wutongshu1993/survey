<template>
  <div id="create">
    <input :value="header" class="h2" v-model="header"/>
    <hr>
    <!--显示和编辑题目-->
    <div class="detail">
      <div v-for="(item, index) in contents">
        <!--单选-->
        <div class="radio" v-if="item.type=='radio'">
          <span>{{index+1}}.</span><input :value="item.title" class="text textArea" v-model="contents[index].title" />
          <br>
          <template v-for="(option, opt) in item.options">
            <div class="block">
              <input type="radio" :value="option.value" :name='index'/><input type="text" class="text textArea" :value="option.value" v-model="contents[index].options[opt].value"/>
            </div>
          </template>
          <p class="text notation small item-option" @click="addOption(index)">添加选项</p>
          <div class="right reuse" >
            <button @click="reuse(index)">复用</button>
            <button @click="delTitle(index)">删除</button>
            <button @click="upOne(index)">上移</button>
            <button @click="downOne(index)">下移</button>
          </div>
        </div>
        <!--多选-->
        <div class="checkbox" v-if="item.type=='checkbox'">
          <span>{{index+1}}.</span><input :value="item.title" class="text textArea" v-model="contents[index].title"/>
          <br>
          <template v-for="(option, opt) in item.options">
            <div class="block">
              <input type="checkbox" :value="option.value" :name='index'/><input type="text" class="text textArea" :value="option.value" v-model="contents[index].options[opt].value" />
            </div>
          </template>
          <p class="text notation small item-option" @click="addOption(index)">添加选项</p>
          <div class="right reuse" >
            <button @click="reuse(index)">复用</button>
            <button @click="delTitle(index)">删除</button>
            <button @click="upOne(index)">上移</button>
            <button @click="downOne(index)">下移</button>
          </div>
        </div>
        <!--文本题-->
        <div class="textType" v-if="item.type == 'text'">
          <span>{{index+1}}.</span><input :value="item.title" class="text textArea" v-model="contents[index].title"/>
          <section class="fright">
            <input type="checkbox" :value="item.required" v-model="item.required"/><span>此题是否为必填</span>
          </section>
          <br>
          <textarea class="multi-rows"></textarea>
          <div class="right reuse" >
            <button @click="reuse(index)">复用</button>
            <button @click="delTitle(index)">删除</button>
            <button @click="upOne(index)">上移</button>
            <button @click="downOne(index)">下移</button>
          </div>
        </div>

      </div>
    </div>
    <div class="addQuestion">
      <div class="row-show" v-show="addShow">
        <button @click="createRadio" class="btn">单选</button>
        <button @click="createCheckbox" class="btn" >多选</button>
        <button @click="createText" class="btn">文本题</button>
      </div>
      <button class="text" @click="showType">+ 添加问题</button>
    </div>
    <hr>
    <div class="option">
      <div class="inline_block">
        <label for="dead_time">问卷截止日期</label>
        <input id="dead_time" type="date" v-model="deadLine">
      </div>
      <div class="inline_block">
        <button  type="button" @click="savePaper">保存问卷</button>
        <button  type="button" @click="publishPaper">发布问卷</button>
      </div>

    </div>
  </div>
</template>

<script>
  export default{
    created(){
      console.log(this.$route.params.id);
      this.getPaper(this.$route.params.id);

      document.title = this.$route.name;
    },
    data(){
      return {
        addShow : false,
        header : '请输入试卷题目',
        contents : [],
        state : '',
        deadLine : null,
        paper : {}
      }
    },
    methods : {
      getPaper(id){
        console.log(id);
        this.$http.get(`/api/exam/${id}`)
          .then(res => {
            console.log(res.data);
            this.paper = res.data;
            this.header = this.paper.header;
            this.contents = this.paper.content;
            this.state = this.paper.state;
            this.deadLine = this.paper.deadLine;
          })
          .catch(res => {
            console.log(res.data);
          })
      },
      showType(){
        this.addShow = !this.addShow;
      },
      createRadio(){
        var item = {};
        item.type = 'radio';
        item.title = '请输入题目';
        item.options = [{value:'选项一', count:0},{value:'选项二', count:0}];
        this.contents.push(item);
      },
      createCheckbox(){
        var item = {};
        item.type = 'checkbox';
        item.title = '请输入题目';
        item.options = [{value:'选项一', count:0},{value:'选项二', count:0}];
        this.contents.push(item);
      },
      createText(){
        var item = {};
        item.type = 'text';
        item.title = '请输入题目';
        item.required = false;
        item.value = '';
        item.count = 0;
        this.contents.push(item);
      },
      addOption(index){
        this.contents[index].options.push({value:'新选项', count:0});
      },
      reuse(index){
        var item = JSON.stringify(this.contents[index]);
        this.contents.push(JSON.parse(item));

      },
      delTitle(index){
        this.contents.splice(index, 1);
      },
      upOne(index){
        var item = this.contents[index];
        if(index-1>=0){
          this.contents.splice(index-1,0,item);
          this.contents.splice(index+1, 1);
        }
      },
      downOne(index){
        var len = this.contents.length;
        if(index+1<=len-1){
          this.upOne(index+1)
        }
      },
      //更新试卷，试卷状态维持不变，还是draft
      savePaper() {
//        var state = 'draft';
//        console.log(this.deadLine);
        const id = this.paper._id;
        this.$http.put(`/api/exam/${id}`,{
          header: this.header,
          content: this.contents,
          state: this.state,
          deadLine: this.deadLine
        })
          .then(res => {
//            console.log('2323');
            this.$router.push('/');
          })
          .catch( e =>{
            console.log(e);
          })
      },
      publishPaper(){
        var state = 'publish';
//        console.log(this.deadLine);
        if(this.deadLine != null){
          this.$http.post('/api/exam/create',{
            header: this.header,
            content: this.contents,
            state: state,
            deadLine: this.deadLine
          })
            .then(res => {
//            console.log(res.data);
              this.$router.push('/');
            })
            .catch( e =>{
              console.log(e);
            })
        }
        else {
          alert('请选择过期时间');
        }

      }
    },

  }
</script>
<style>
  .addQuestion{
    width: 80%;
    min-height: 100px;
    line-height: 100px;
    border: 1px solid #cccccc;
    text-align: center;
    font-size: 1.2em;
    margin: 20px auto;
  }
  .detail{
    width: 90%;
  }
  hr{
    border-top: 1px solid #cccccc;
  }
  .h2{
    width:100%;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    border: none;
    margin-bottom: 20px;
  }
  .option{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  .inline_block{
    display: inline;
  }
  .block{
    display: block;
    text-indent: 2em;
  }
  .row-show{
    height:40px ;
  }
  .addQuestion .text{
    height: 35px;
    line-height: 35px;
  }
  .text{
    border: none;
    background-color: #ffffff;
    font-size: 1.0em;
  }
  .textArea{
    width: 80%;
    min-height: 30px;
  }
  .radio, .checkbox, .textType {
    /*margin-top: 1em;*/
    padding: 15px;
  }
  .radio:hover, .checkbox:hover, .textType:hover {
    background-color: antiquewhite;
  }
  .radio:hover input, .checkbox:hover input, .textType:hover input {
    background-color: antiquewhite;
  }
  .right {
    overflow: auto;
  }
  .right button{
    float: right;

  }
  .small{
    font-size: 10px;
  }
  .notation{
    color: chocolate;
  }
  .multi-rows{
    width: 60%;
    min-height: 90px;
    margin-left: 2em;
    margin-top: 1em;
  }
  button{
    padding: 5px 10px;
    border: 1px solid #cccccc;
  }
  .fright{
    float: right;
  }
  .item-option{
    margin-left: 3em;
    display: inline-block;
    cursor: default;
  }
  .reuse{
    visibility: hidden;
  }
  .radio:hover .reuse, .checkbox:hover .reuse, .textType:hover .reuse {
    visibility: visible;
  }
</style>
