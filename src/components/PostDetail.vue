<template>
    <div>
        <h2>{{post.title}}</h2>
        <span>{{post.username}}</span>
        <span>{{post.date}}</span>
        <p>{{post.text}}</p>
        <ul>
            <li v-for="comment of post.comments" :key="comment._id">
                <h3>{{comment.username}}</h3>
                <p>{{comment.comment}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import getPostId from '../service/getPostId'
export default {
  name: 'PostDetail', 
  data: () => {
    return {
        post: {}
    };
  },
  async mounted () {
    try {
        const id = this.$route.params.id
      this.post = await getPostId(id)
    } catch (error) {
      console.log(error)
      this.errorMsg = error.message
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>