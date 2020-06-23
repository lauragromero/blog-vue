<template>
    <div>
        <ul> 
        <li v-for="post in posts" :key="post._id">
            <h2>{{post.title}}</h2>
            <span>{{post.username}}</span>
            <p>{{post.text}}</p>
            <router-link :to="`/post/${post._id}`">More</router-link>

            </li>
        </ul>
    </div>
</template>


<script>
import {mapState} from 'vuex'
export default {
  name: 'PostList',
 async mounted () {
     await this.$store.dispatch('getAllPost')
  },computed:{ 
    ...mapState(['posts'])},
}

</script>

<style scoped>
</style>