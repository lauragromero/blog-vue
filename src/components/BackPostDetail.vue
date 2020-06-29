<template>
    <div class="card__post">
      <Card style="width: 100%; margin-bottom: 2em">
        <template slot="title">
          <h2>{{post.title}}</h2>
        </template>
        <template slot="subtitle">
          <span>{{post.username}}</span>
          <span>{{post.date}}</span>
        </template> 
    <template slot="content">
       <p>{{post.text}}</p>
    </template>
        <template slot="footer">
        <Button @click="addButton(post._id)" icon="pi pi-check" label="New Comment" />
      </template>
      </Card>
      <DataTable :value="post.comments">
        <Column field="username" header="Username"></Column>
        <Column field="nickname" header="Nickname"></Column>
        <Column field="date" header="Date"></Column>
        <Column field="comment" header="Comment"></Column>
        <Column headerStyle="width: 22em" bodyStyle="text-align: center">
        <template #header>
            <Button type="button" icon="pi pi-cog"></Button>
        </template>
        <template #body= "slotProps">
            <Button :disabled="user.user !== post.username && user.role !== 'admin'" @click="updateButton(slotProps.data._id)" label="Edit" type="button" icon="pi pi-pencil" class="p-button p-button-sm" style="margin-right:0.2em"></Button>
            <Button :disabled="user.user !== post.username && user.role !== 'admin'" @click="deleteComment(slotProps.data._id)"  label="Delete" type="button" icon="pi pi-trash" class="p-button-danger p-button-sm"></Button>
        </template>
    </Column>
      </DataTable>

    <Dialog :visible.sync="dialogVisible" :style="{width: '900px'}" header="Comment" :modal="true" >
    <div class="p-cardialog-content"> 
        <div class="p-grid p-fluid ">
            <div class="p-col-20">
                <Textarea  :autoResize="true" rows="5" cols="70" id="text" v-model="comment" name="comment" />
            </div>
        </div>
    </div>
    <template #footer>
      <Button label="Save" icon="pi pi-check" @click="addComment" class="p-button-success"></Button> 
    </template>
</Dialog> 

 <Dialog :visible.sync="dialogVisibleNew" :style="{width: '900px'}" header="New Comment" :modal="true" >
    <div class="p-cardialog-content"> 
        <div class="p-grid p-fluid ">
            <div class="p-col-20">
                <Textarea  :autoResize="true" rows="5" cols="70" id="text" v-model="newComment" name="newComment" />
            </div>
        </div>
    </div>
    <template #footer>
      <Button label="Save" icon="pi pi-check" @click="updateComment" class="p-button-success"></Button> 
    </template>
</Dialog> 
    </div>
</template>


<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {mapState} from 'vuex'
export default {
  name: 'BackPostDetail', 
  components:{
    Card, 
    Button, 
    Dialog, 
    Textarea, 
    DataTable, 
    Column
  },
  data: () =>{
    return {
    id: null,
    idPost: null, 
    isEdited : false, 
    comment: null,
    newComment: null, 
    dialogVisible: false,
    dialogVisibleNew: false
    }
  },methods:{
    addButton(id){
      this.idPost = id
      this.dialogVisible = true;
    }, addComment(){
      const comment ={comment: this.comment }
      const payload = {id: this.idPost, comment: comment}
      this.$store.dispatch('addNewComment', payload)
      this.dialogVisible = false;
    }, updateButton(idComment){
      this.dialogVisibleNew = true;
      this.id = idComment;
    }, updateComment(){
      console.log(this.id)
      const newComment = {comment : this.newComment}
      const payload = {id: this.id, comment: newComment}
      this.$store.dispatch('updateNewComment', payload)
      this.dialogVisibleNew = false;
    }, deleteComment(idComment){
      this.$store.dispatch('deleteCommentId', idComment)
    }

  },
  mounted () {
    const id = this.$route.params.id
    this.$store.dispatch('getPostId', id)
    
    },computed:{ 
      ...mapState(['post', 'user'])},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card__post{
  max-width: 1300px;
  margin: 0 auto;
}
</style>