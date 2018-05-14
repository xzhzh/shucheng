import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Contain from '@/components/Contain'
import Bookshelf from '@/components/Bookshelf'
import Mostfire from '@/components/Mostfire'
import Detail from '@/components/Detail'
import Bookcontent from '@/components/Bookcontent'
import Search from '@/components/Search'
import Catelog from '@/components/Catelog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
          {path:'/',name:'Contain', component:Contain},
          {path:'/bookshelf',name:'bookshelf', component:Bookshelf}
       ]
    },
    {path:'/mostfire',name:'Mostfire',component:Mostfire},
    {path:'/detail',name:'Detail',component:Detail},
    {path:'/content',name:'Bookcontent',component:Bookcontent},
    {path:'/search',name:'Search',component:Search},
    {path:'/catelog',name:'Catelog',component:Catelog}
   
  ]
})
