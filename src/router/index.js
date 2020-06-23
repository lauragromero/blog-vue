import Vue from 'vue'
import VueRouter from 'vue-router'
import PostList from '../components/PostList.vue'

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
    path: '/backoffice',
    name: 'Backoffice',
    component: () => import('../components/Backoffice'), 
    meta: {requieresAuth: true}
  },

  
  
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if(to.meta.requieresAuth){
    if (token) {
          next();
      } else {
          next('/');
      }
  }else{
    next();
  }
});

export default router
