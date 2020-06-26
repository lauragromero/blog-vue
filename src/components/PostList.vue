<template>
    <div>
        <grid-layout>
            <div v-for="post in posts" :key="post._id">
                <post-component v-bind:titlePost.prop="post.title" v-bind:usernamePost.prop="post.username" v-bind:nicknamePost.prop="post.nickname" v-bind:datePost.prop="post.date"  v-bind:textPost.prop="post.text" v-on:selectPost="onSelec(post._id)"></post-component>
                <!-- <button @click="onSelec(post._id)">ir</button> -->
            </div>
        </grid-layout>
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
</style>