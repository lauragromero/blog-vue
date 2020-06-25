import Vue from 'vue'
import VueRouter from 'vue-router'
import PostList from '../components/PostList.vue'
import Backoffice from '../components/Backoffice'

function guardMyroute(to, from, next){
  let isAuthenticated= false;

  if(localStorage.getItem('token')){
    isAuthenticated = true;
  }else{
    isAuthenticated= false;
  }
    
  if(isAuthenticated) {
    next();
  } else{
    next('/login');
  }
}


Vue.use(VueRouter)

  const routes = [
  { path: '/', redirect: '/post' },
  {
    path: '/post',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('../components/PostDetail')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login')
  },
  {
    path: '/admin',
    name: 'admin',
    beforeEnter : guardMyroute,
    component: Backoffice
  },
  {
    path: '/admin/:id',
    name: 'BackPostDetail',
    component: () => import('../components/BackPostDetail')
  },
  
  
]

const router = new VueRouter({
  routes
})




export default router
