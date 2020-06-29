<template>
      <div class="list__container">
            <div v-for="post in posts" :key="post._id">
                <list-component v-bind:titlePost.prop="post.title" v-bind:usernamePost.prop="post.username" v-bind:nicknamePost.prop="post.nickname" v-bind:datePost.prop="post.date"  v-bind:textPost.prop="post.text" v-on:selectPost="onSelec(post._id)"></list-component>
            </div>
      </div>
</template>


<script>
import {mapState} from 'vuex'
export default {
  name: 'PostList',
  methods:{
    onSelec(id){
      this.$router.push(`/post/${id}`)
    }
  },
 mounted () {
     this.$store.dispatch('getAllPost')
  },computed:{ 
    ...mapState(['posts'])},
}

</script>

<style scoped>
.list__container{
  margin: 0 auto; 
  width: 100%;
  padding: 20px;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
}
</style>