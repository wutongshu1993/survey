import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Create from '@/components/Create'
import Result from '@/components/Result'
import Test from '@/components/Test'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },{
      path : '/exam/create',
      name : 'Create',
      component: Create
    },{
      path : '/exam/edit/:id',
      name : 'Edit',
      component : Edit
    },
    {
      path : '/exam/test/:id',
      name : 'Test',
      component : Test//填写问卷
    },
    {
      path : '/exam/result/:id',
      name : 'Result',
      component : Result//查看问卷结果
    }
  ]
})
