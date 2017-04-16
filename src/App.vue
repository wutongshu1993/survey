<template>
  <div id="app">
    <div class="wrap">
      <div class="header">
        <span id="paperManage"><router-link to="/">问卷管理</router-link></span>
      </div>
      <div class="containerBox">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
  *{
    font-family: "Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
    box-sizing: border-box;
  }
  body, html{
    height: 100%;
    position: relative;
  }
  .header{
    display: block;
    height: 50px;
    background-color: #42b983;
    color: #ffffff;
    line-height: 50px;
    width: 100%;
  }
  .header span{
    margin-left: 100px;
  }
  .header span a{
    color: #ffffff;
    font-size: 1.3em;
  }

  .wrap{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;/*由于定义了flow-wrap为wrap，表示伸缩容器为多行，才能正确显示，否则header和container挤到一行了*/
    height: 100%;
    position: relative;
  }
  .containerBox{
    width: 80%;
    height: 100%;
    margin-top: 50px;
  }
</style>
