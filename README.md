# survey

调查问卷，基于vue+express+mongodb+vue-router+axios

主要功能：实现问卷的新建、编辑、删除、填写问卷、以及问卷结果的可视化统计。当问卷处于未发布状态可以对问卷进行修改。如果已经发布了，并且没有过期，则可以填写问卷。

数据库的实现采用mongoose

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
