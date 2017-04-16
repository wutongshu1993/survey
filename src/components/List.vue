<template lang="html">
  <div>
    <modal :show="showModal" :width="300" :height="185" :closeButton="true">
      <h4>提示</h4>
      <div class="modalContent">确认要删除此问卷</div>
      <div class="modalFooter">
        <button class="danger" @click="deletePapers">确定</button>
        <button @click="closeModal">取消</button>
      </div>
    </modal>
    <div id="content" class="content" v-if="papers.length > 0">
      <table class="table">
        <thead>
          <tr class="table_header">
            <th>标题</th>
            <th>时间</th>
            <th>状态</th>
            <th>
              <div class="space-around">
                <span>操作</span>
                <router-link to="/exam/create" class="btn">+ 新建问卷</router-link>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(paper, index) in papers" class="table_header">
            <td>
              <input :value=index type="checkbox" class="checks" :checked="checkVal[index]" v-model="checkVal[index]" @click="checks(index)">{{paper.header}}
              <!--<input :value=index type="checkbox" class="checks" :checked="checkVal[index]"  @click="checks(index)" v-model="checkVal[index]">-->
            </td>
            <td>{{paper.deadLine}}</td>
            <td>
              <span v-if="paper.state=='draft'">未发布</span>
              <span v-else-if="paper.state=='publish' && paper.deadLine >= nowTime">已发布</span>
              <span v-else>已过期</span>
            </td>
            <td class="space-around">
              <button v-if="paper.state == 'publish'" disabled >编辑</button>
              <button v-else @click="editPaper(index)">编辑</button>
              <button @click="deletePaper(paper)">删除</button>
              <button v-if="paper.state == 'publish' && paper.deadLine >= nowTime " @click="testPaper(index)" >填写问卷</button>
              <button v-else  disabled>填写问卷</button>
              <button @click="showResults(index)">查看结果</button>
            </td>
          </tr>
        <tr>
          <td colspan="4">
            <input type="checkbox" value="checkAll" :checked="checkAllVal" v-model="checkAllVal" @click="checkAll" class="checks"/> 全选
            <button @click="deletePaper">删除</button>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
    <div id="newPaper" v-if="papers.length === 0">
      <router-link to="/exam/create" class="btn">+ 新建问卷</router-link>
    </div>
  </div>
</template>

<script>
  export default{
    created(){
      this.getPapers();
    },
    data(){
    return{
      showModal : false,
      papers : [],
      delPapers : [],
      len : 0,
      checkVal : [],
      checkAllVal : false
    }
    },
    computed: {
      nowTime : function () {
        var time = new Date();
        var res;
        var year = time.getFullYear();
        var month = (time.getMonth()+1) > 10 ? time.getMonth()+1 : ('0'+(time.getMonth()+1));
        var date = time.getDate() > 10 ? time.getDate() : '0'+time.getDate();
        res = year+'-'+month+'-'+date;
       return res;
      }
    },
    methods: {
      //获取所有试卷
      getPapers(){
        this.$http.get('/api/exam')
          .then( res => {
            this.papers = res.data;
            this.len = this.papers.length;
          })
          //初始化checkVal数组
          .then(() => {
            this.initChecked();
//            console.log(this.checkVal);
//            console.log(this.len);
          })
          .catch(err => {
            console.log(err);
          })
      },
      //编辑试卷
      editPaper(index){
        const id = this.papers[index]._id;
        //直接跳到编辑的页面
        this.$router.push(`/exam/edit/${id}`)
//        this.$http.get(`/api/exam/${id}`)
//          .then(this.$router.push(`/exam/edit/${id}`));
      },
      //跳转到填写问卷的测试页面
      testPaper(index){
        const id = this.papers[index]._id;
        this.$router.push(`/exam/test/${id}`)
      },
      //跳转到馋看结果的页面
      showResults(index){
        const id = this.papers[index]._id;
        this.$router.push(`/exam/result/${id}`);
      },
      //批量删除
      deletePapers(){
        //遍历deletePapers数组，将其中的id组成一个新的数组，将id组成的数组放到body中
        var deleteIds = [];
        var i;
        for(i = 0; i < this.delPapers.length;){
          if(this.delPapers[i].paper){
            deleteIds.push(this.delPapers[i].id);
            this.delPapers.splice(i, 1);
          }
          else {
            i++;
          }
        }
       /* this.delPapers.forEach(function (item, index) {
//          console.log(item._id);
          if(item.paper){
            deleteIds.push(item.id);
            this.delPapers.splice(index, 1);
          }
        });*/
        console.log(deleteIds);
        if(deleteIds.length > 0){
          this.$http.delete(`/api/exam/${deleteIds}`)
            .then(() => {
              this.showModal = false;
              this.getPapers();
            });
        }
        else {
          alert('请选择需要删除的试卷');
          return false;
        }

      },
      //点击删除按钮，弹出确认删除的模态框
      deletePaper(paper){
        this.showModal = true;
        this.delPapers.push(paper);
      },
      //点击复选框
      checks(index){
//        this.checkVal[index] = !this.checkVal[index];
        console.log( this.checkVal[index]);
        //更改delPapers数组中的状态
//        console.log(this.delPapers[index]);
        this.delPapers[index].paper = !this.delPapers[index].paper;
        console.dir(this.delPapers);
        //如果全部选中，则“全选也需要选中”
        var i;
        this.checkAllVal = true;
        for(i = 0; i < this.checkVal.length; i++){
          if(!this.checkVal[i]){
            this.checkAllVal = false;
            return;
          }
        }
      },
      //点击全选
      checkAll(){
//        console.log(this.checkAllVal);
        this.assignAll(this.checkAllVal);
      },
      closeModal(){
        this.showModal = false;
      },
     initChecked() {
        var n = this.len;
        var arr = [];
        var i;
       var item;
//       console.log(n)
       //初始化checkVal数组和删除的数组
        for(i = 0; i < n; i++){
          item = Object.create(null , {paper: {value: false,  writable: true, enumerable: true, configurable: true },
            id : {value: this.papers[i]._id, enumerable: true }});
          arr.push(false);
          this.delPapers.push(item);
      }
//      console.log(arr);
       this.checkVal = arr.concat();
//       console.log(this.checkVal);
  },
    assignAll(flag){
//      console.log(flag);
      var i;
//      console.log(this);
      var arr = this.checkVal;
      var n = arr.length;
      for(i = 0; i < n; i++){
        arr[i] = flag;
        this.delPapers[i].paper = flag;
    }
      console.dir(this.delPapers);
//      console.log(arr);
//      return arr;
  }
    }

  }

</script>



<style scoped>
.modalContent{
  margin-top: 2em;
}
  .modalFooter{
    position: absolute;
    bottom: 1em;
    text-align: center;
    width: 100%;
  }
  button{
    margin-right: 1em;
    padding: 3px 1em ;
  }
  .danger{
    background: orangered;
    color: #fff;
  }
  .btn{
    background-color: #42b983;
    color: #fff;
    padding: 5px 10px;
  }
.table_header{
  height: 30px;
}
.table_header td{
  line-height: 30px !important;

}
.space-around{
  display: flex;
  justify-content: center;
}
.space-around > *{
  margin-right: 5px;
}
.checks{
  margin-right: 15px !important;
}
#content, #newPaper {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  min-height: 200px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  -webkit-box-shadow: 5px;
  -moz-box-shadow: 5px;
  box-shadow: 5px 5px 5px #888888;
}
.table{
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  border-color: gray;
}
.table_header{
  height: 30px !important;
}
table tr td{
  border-top: 1px solid #ddd;
}
table tr td:not(:first-child){
  text-align: center;
}
  td{
    padding: 8px;
    line-height: 30px;
  }

  tr:hover{
    background-color: antiquewhite;
  }

</style>
