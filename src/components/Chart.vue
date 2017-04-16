<template>
  <div class="chart" >

  </div>
</template>
<script>
  import echarts from 'echarts';
  export default{
    props: {
      option_data: Object
    },
    created(){
      this.$on('updateChart', this.init);
    },
    computed:{
      options : function () {
        return this.option_data;
      }
    },
    data(){
      return {
        chart: null
      }
    },
    methods: {
      init(){
        var myChart = echarts.init(this.$el);
        myChart.setOption(this.options);
//        console.log(this.options);
      }
    },
    mounted(){
//      console.log(this.options);
      if(this.options){
        this.init();
//        console.log(123);
      }
    }
  }
</script>

<style>
  .chart{
    width: 100%;
    height: 100%;
    min-height: 150px;
  }
</style>
