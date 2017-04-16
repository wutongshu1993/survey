<template>
  <div id="result">
    <span class="h2">{{paper.header}}</span>
    <hr>
    <section class="detail">
      <ol v-for="(item, index) in paper.content">
        <!--图表-->
        <div class="charts">
          <chartshow :option_data="datas[index]" ref="chartshow"></chartshow>
        </div>

        <div class="item">
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
        </div>

      </ol>

    </section>
    <button @click="goBack" class="submit">< 返回</button>
  </div>
</template>
<script>
  import Charts from './Chart.vue';
  export default{
    created(){
      this.getPaper(this.$route.params.id)
        .then(() => {
          try {
            this.initCharts();
          }
          catch (e){
            console.log(e);
          }
        })
        .then(() => {
//              console.log(this.$refs.chartshow);//这是一个数组
          this.$refs.chartshow.forEach((item) => {
            item.$emit('updateChart');
          })
        });
      document.title = this.$route.name;
    },
    data(){
      return {
        paper : [],
        datas : []//存储每道题图表信息，option的设置
      }
    },
    methods : {
      getPaper(id){
        var promise = new Promise((resolve, reject) => {
          this.datas = [];
          this.$http.get(`/api/exam/${id}`)
            .then( res => {
              this.paper = res.data;
            })
            .then(() => {
              resolve();
            })
            .catch( res => {
              console.log(res);
            })
        })
        return promise;
      },
      initCharts(){
        this.paper.content.forEach((item, index) => {
          var optionValue = [];
          var optionTotal = 0;
          var optionCount = [];
          var pieValue = [];
          if(item.options !== undefined){
            item.options.forEach((option, i) => {
              optionValue.push(option.value);
              optionTotal += option.count;
              optionCount.push(option.count);
              pieValue.push({name:option.value, value: option.count});
            });
            item.options.forEach((option, i) => {
              if(optionTotal !== 0){
                optionCount[i] = (optionCount[i] / optionTotal).toFixed(2);
              }
            });
          }
          var e_option =  {
            title : {
              text : '数据占比'
            },
            tooltip: {
              trigger : 'axis'
            },
            legend : {
              data : ['选项']
            },
            xAxis : {
              type : 'value'
            },
            yAxis : {
              type : 'category',
              data : optionValue.concat()
            },
            series : [
              {
                name : '选项',
                type: 'bar',
                data : optionCount.concat()
              }
            ]
          }
          var c_option =  {
            title : {
              text : '数据占比',
              x:'center'
            },
            tooltip: {
              trigger : 'item'
            },
            legend : {
              orient: 'vertical',
              left: 'left',
              data :optionValue
            },
            series : [
              {
                name : '选项占比',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data : pieValue.concat()
              }
            ]
          }
          if(item.type === 'checkbox'){
            this.datas.push(c_option);
          }
          else {
            this.datas.push(e_option);
          }
        });


      },
      goBack(){
        history.go(-1);
      }

    },
    components : {
      'chartshow' : Charts
    }
  }
</script>
<style scoped>
  #result{
    width: 100%;
    position: relative;
  }
  .detail > ol{
    list-style: none;
    padding: 0.5rem 1rem;
    overflow: hidden;
    border: 1px solid #ccc;
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
    width: 100%;
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
    width: 55%;
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
.charts{
  float: right;
  width: 40%;
  padding-bottom: 100em;
  margin-bottom: -101em;
  /*background-color: aquamarine;*/
}
</style>
