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

  // {
  //   path: '/home',
  //   name: 'PostList',
  //   component: () => import('../components/PostList')
  // }
]

const router = new VueRouter({
  routes
})

export default router
