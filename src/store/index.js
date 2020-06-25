import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';


axios.interceptors.request.use(function(config) {
    const auth_token = localStorage.getItem('token');
    if(auth_token) {
      config.headers.Authorization = `Bearer ${auth_token}`;
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});


Vue.use(Vuex, axios);
export default new Vuex.Store({
    state: {
        posts : [],
        post: {}, 
        newP: {}
    }, actions: {
         getAllPost ({commit}) {
            axios.get('http://localhost:3002/post')
            .then(response=> {
                commit('loadData', response.data)
            })
          }, getPostId ({commit}, id) {
            axios.get(`http://localhost:3002/post/${id}`)
            .then(response=> {
                commit('loadPost', response.data)
            })
          }, addNewPost({commit}, post){
              axios.post('http://localhost:3002/post', post )
              .then(response => {
                  commit('addPost', response.data)}
                )
          }, deletePost({commit}, postId){
              console.log(postId)
            axios.delete(`http://localhost:3002/post/${postId}`)
            .then(response => {
                console.log(response)
                commit('delPost',postId)}
              )
            }, updatePostId({commit}, payload){
                axios.put(`http://localhost:3002/post/${payload.id}`, payload.post)
                .then(response =>{
                    const pay ={id: payload.id, post: response.data} 
                    commit('updatePost', pay)
                })
            }
        },mutations: {
        loadData(state, posts) {
            state.posts = posts
          },
        loadPost(state, post){
            state.post = post
        },
        addPost(state, newP){
            state.posts = [...state.posts, newP]
        },
        delPost(state, id){
            const posts= state.posts;
            const newPosts = posts.filter(post => post._id !== id);
            state.posts = newPosts  
        }, 
        updatePost(state, payload){
            const posts = state.posts
            const indexPost= posts.findIndex(item => item._id == payload.id)
            const newPosts = [...posts.slice(0, indexPost), payload.post, ...posts.slice(indexPost + 1 )];
            state.posts = newPosts;
        }
    }
});
