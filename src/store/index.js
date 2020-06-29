import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Vue from 'vue';
import Vuex from 'vuex';
import '../interceptor';

Vue.use(Vuex, axios);
export default new Vuex.Store({
    state: {
        posts : [],
        post: {}, 
        user: {}
    }, actions: {
        getAllPost ({commit}) {
        axios.get('http://localhost:3002/post')
        .then(response=> {
            commit('loadData', response.data)
        })
        }, 
        getPostId ({commit}, id) {
        axios.get(`http://localhost:3002/post/${id}`)
        .then(response=> {
            commit('loadPost', response.data)
        })
        }, 
        addNewPost({commit}, post){
            axios.post('http://localhost:3002/post', post )
            .then(response => {
                commit('addPost', response.data)})
        }, 
        deletePost({commit}, postId){
            axios.delete(`http://localhost:3002/post/${postId}`)
            .then(response => {
                commit('delPost', response.data._id)})
        }, 
        updatePostId({commit}, payload){
            axios.put(`http://localhost:3002/post/${payload.id}`, payload.post)
            .then(response =>{
                commit('updatePost', response.data)})
        }, 
        addNewComment({commit}, payload){
            console.log(payload)
            axios.put(`http://localhost:3002/post/${payload.id}/comment`, payload.comment)
            .then(response=>{
                commit('addComment', response.data)})
        }, 
        updateNewComment({commit}, payload){
            axios.put(`http://localhost:3002/comment/${payload.id}`, payload.comment)
            .then(response=> {
                commit('updateComment', response.data)})
        }, 
        deleteCommentId({commit}, idComment){
            axios.delete(`http://localhost:3002/comment/${idComment}`)
            .then(response=>{
                commit('deleteComment', response.data.result._id)})
        },
        getToken({commit}){
            const token = localStorage.getItem('token')
            if(token){
                commit('getUser', token)}
        }, logOut({commit}){
            localStorage.removeItem('token')
            commit('logOut')
            }
        }, mutations: {
        loadData(state, posts) {
            state.posts = posts
          },
        loadPost(state, post){
            state.post = post
        },
        addPost(state, post){
            state.posts = [...state.posts, post]
        },
        delPost(state, id){
            const posts= state.posts;
            const newPosts = posts.filter(post => post._id !== id);
            state.posts = newPosts ; 
        }, 
        updatePost(state, data){
            const posts = state.posts;
            const indexPost= posts.findIndex(item => item._id == data._id)
            const newPosts = [...posts.slice(0, indexPost), data, ...posts.slice(indexPost + 1 )];
            state.posts = newPosts;
        }, 
        addComment(state, data){
            console.log(data)
            const post = state.post;
            const newComent = [...post.comments, data];
            const newPost = {...post, comments: newComent};
            state.post = newPost;
        }, 
        updateComment(state, data){
            const post = state.post;
            const indexComment= post.comments.findIndex(item => item._id == data._id);
            const newComments = [...post.comments.slice(0, indexComment), data, ...post.comments.slice(indexComment + 1 )];
            const newPost = {...post, comments: newComments};
            state.post = newPost;
        }, 
        deleteComment(state, id){
            const post= state.post;
            const newComments = post.comments.filter(comment => comment._id !== id);
            const newPost = {...post, comments: newComments};
            console.log(newComments, newPost);
            state.post = newPost;
        }, 
        getUser(state, token){
            const userToken= jwt_decode(token);
            state.user = userToken
        }, 
        logOut(state){
            console.log(state.user)
            state.user = {}
        }
    }
});
