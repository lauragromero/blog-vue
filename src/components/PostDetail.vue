<template>
    <div class="detail__container">
      <detail-card v-bind:detailTitle.prop="post.title" v-bind:detailDate.prop="post.date" v-bind:detailAuthor.prop="post.username" v-bind:detailText.prop="post.text"></detail-card>
          <ul>
            <li v-for="comment of post.comments" :key="comment._id">
              <detail-comment v-bind:commentAuthor.prop="comment.username" v-bind:commentDate.prop="comment.date" v-bind:commentText.prop="comment.comment" >
              </detail-comment>
            </li>
        </ul>
      
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
.detail__container{
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  max-width: 1000px;
  margin: 0 auto;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>