<template>
    <div>
      <detail-card v-bind:detailTitle.prop="post.title" v-bind:detailDate.prop="post.date" v-bind:detailAuthor.prop="post.username" v-bind:detailText.prop="post.text"></detail-card>
        <div v-if="post.comments.length > 0">
          <ul>
            <li v-for="comment of post.comments" :key="comment._id">
              <detail-comment v-bind:commentAuthor.prop="comment.username" v-bind:commentDate.prop="comment.date" v-bind:commentText.prop="comment.comment" >
              </detail-comment>
            </li>
        </ul>
        </div>
        <div v-else>No comments </div> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'PostDetail',
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