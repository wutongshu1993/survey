<template>
  <div id="test">
    <span class="h2">{{paper.header}}</span>
    <hr>
    <section class="detail">
      <ol v-for="(item, index) in paper.content">
        <li>
          <span class="index">{{index+1}}</span>
          <span class="option_title">{{item.title}}</span>
          <span class="required" v-if="item.required">（*必填）</span>
        </li>
        <li v-if="item.type === 'text'">
              <textarea class="multi-rows " v-model="item.value" ></textarea>
        </li>
        <li v-else>
          <ol  v-for="(option, opt) in item.options" class="options">
            <li v-if="item.type==='radio'"><label><input type="radio" :value="opt" v-model="item.chosen" :name="index"  />{{option.value}}</label></li>
            <li v-if="item.type==='checkbox'"><label><input type="checkbox" :value="opt" v-model="item.chosen" :name="index" />{{option.value}}</label></li>
          </ol>
        </li>
      </ol>

    </section>
    <button @click="submit" class="submit">提交问卷</button>
  </div>
</template>
<script>
export default{
  created(){
    this.getPaper(this.$route.params.id);
    console.log(this.$route.params.id);
    document.title = this.$route.name;
  },
  data(){
    return {
      paper : [],
    }
  },
  methods : {
    getPaper(id){
      this.$http.get(`/api/exam/${id}`)
        .then( res => {
          console.log(res.data);
          this.paper = res.data;
        })
        .catch( res => {
          console.log(res.data);
        })
    },
    handleForm(){
      const con_len = this.paper.content.length;
      for(var i = 0; i < con_len; i++){
        var item =  this.paper.content[i];
        if(item.type === 'radio'){
          if(item.chosen !== -1){
            item.options[item.chosen].count++;
//            item.chosen = -1;
          }
          else{
            alert('第'+(i+1)+'题未作答！');
            return false;
          }
        }
        else if(item.type === 'checkbox'){
          console.log(item.options);
          console.log(item.chosen);
          const len = item.chosen.length;
          if(len === 0){
            alert('第'+(i+1)+'题未作答！');
            return false;
          }
          for(var j = 0; j < len; j++ ){
            item.options[item.chosen[j]].count++;
          }
//          item.chosen = [];
        }
        else if(item.type === 'text'){
          if(item.required){
            if(item.value){
              item.count++;
            }
            else {
              alert('第'+(i+1)+'题为必答题！');
              return false;
            }
          }
          else {
            if(!item.value){
              item.count++;
            }
          }
        }
      }
      //重置表单
      this.paper.content.forEach(function (item, i) {
        if(item.type === 'radio'){
          item.chosen = -1;
        }
        else if(item.type === 'checkbox'){
          item.chosen = [];
        }
        else if(item.type = 'text'){
          item.value = '';
        }
      });

      return true;
      /*this.paper.content.every((item, i) => {

      } );*/
    },
    submit(){
      const id =  this.paper._id;
     const res = this.handleForm();
      if(res !== false){
        this.$http.put(`/api/exam/${id}`, {
          header: this.paper.header,
          content: this.paper.content,
          state: this.paper.state,
          deadLine: this.paper.deadLine
        }).then( res => {
          this.$router.push('/');
        })
      }

    }
  }
}
</script>
<style scoped>
  #test{
    width: 100%;
    position: relative;
  }
  .detail > ol{
    list-style: none;
    padding: 0.5rem 1rem;
  }
  .index{
    padding-right: 0.8rem ;
  }
  .options{
    list-style: none;
    padding: 0.5rem 1rem;
  }
  .option_title{
   /* padding-left: 1rem;*/
  }

.detail{
  width: 90%;
}
hr{
  border-top: 1px solid #cccccc;
}

.h2{
  /*width:100%;*/
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  border: none;
  margin-bottom: 20px;
}
.detail>ol:hover{
  background-color: antiquewhite;
}
.multi-rows{
  width: 60%;
  min-height: 90px;
  margin-left: 2em;
  margin-top: 1em;
}
.submit{
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid #cccccc;
  background: dodgerblue;
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

}

</style>
