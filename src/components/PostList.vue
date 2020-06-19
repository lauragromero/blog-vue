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
import getAllPost from '@/service/getAllPost';
export default {
  name: 'PostList',
  data: () => {
    return {
        posts: []
    };
  },
  async mounted () {
    try {
      this.posts = await getAllPost()
    } catch (error) {
      console.log(error)
      this.errorMsg = error.message
    }
  },
}

</script>

<style scoped>
</style>