import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex, axios);
export default new Vuex.Store({
    state: {
        posts : [],
        post: {}
    }, actions: {
         getAllPost ({commit}) {
            axios
            .get('http://localhost:3002/post')
            .then(response=> {
                commit('loadData', response.data)
            })
          }, getPostId ({commit}, id) {
            axios
            .get(`http://localhost:3002/post/${id}`)
            .then(response=> {
                commit('loadPost', response.data)
            })
          }

    },mutations: {
        loadData(state, posts) {
            state.posts = posts
          },
          loadPost(state, post){
              state.post = post
          }
    }
});
