<template>
    <div>
        <h2>{{post.title}}</h2>
        <span>{{post.username}}</span>
        <span>{{post.date}}</span>
        <p>{{post.text}}</p>
        <div v-if="post.comments.length > 0">
          <ul>
            <li v-for="comment of post.comments" :key="comment._id">
                <h3>{{comment.username}}</h3>
                <p>{{comment.comment}}</p>
            </li>
        </ul>
        </div>
        <div v-else>No comments </div>
    </div>
</template>


<script>

import {mapState} from 'vuex'
export default {
  name: 'BackPostDetail', 
  data: () =>{
    return {
    isEdited : false
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.$store.dispatch('getPostId', id)
    },computed:{ 
      ...mapState(['post'])},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>