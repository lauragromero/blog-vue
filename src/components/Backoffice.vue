<template>
<div>
  <DataTable :value="posts"  >
    <template #header>
        <div style="line-height:1.87em" class="p-clearfix">
            <Button  @click="addButton" label="Add Post" icon="pi pi-plus-circle" style="float: left, margin-left: 40px"/>
            LIST OF POST
        </div>
    </template>
    <Column :expander="true" headerStyle="width: 3em" />
    <Column style="width: 10em" field="username" header="Username" :sortable="true"></Column>
    <Column field="nickname" header="Nickname" :sortable="true"></Column>
    <Column field="date" header="date" :sortable="true"></Column>
    <Column field="title" header="Title" :sortable="true"></Column>
    <Column headerStyle="width: 22em" bodyStyle="text-align: center">
        <template #header>
            <Button type="button" icon="pi pi-cog"></Button>
        </template>
        <template #body= "slotProps">
            <Button label="Detail" type="button" icon="pi pi-search" class="p-button-success p-button-sm" style="margin-right:0.2em" @click="goToDetail(slotProps.data._id)"></Button>
            <Button  @click="editButton(slotProps.data._id)" label="Edit" type="button" icon="pi pi-pencil" class="p-button p-button-sm" style="margin-right:0.2em"></Button>
            <Button @click="deleteThePost(slotProps.data._id)"  label="Delete" type="button" icon="pi pi-trash" class="p-button-danger p-button-sm"></Button>
        </template>
    </Column>
    <template #expansion= "slotProps">
        <div>
              hollll  <p>{{slotProps.data.text}}</p>
        </div>
    </template>
    <template #footer>
        In total there are {{posts ? posts.length : 0 }} post.
    </template>
</DataTable>


<Dialog :visible.sync="dialogVisibleNew" :style="{width: '900px'}" header="Add NewPost" :modal="true" >
    <div class="p-cardialog-content"> 
        <div class="p-grid p-fluid ">
            <div class="p-col-4"><label for="title">Title</label></div>
            <div class="p-col-20">
                <InputText style="width: 100%" name= "newTitle" id="title" v-model="newTitle"  autocomplete="off" />
            </div>

            <div class="p-col-4"><label for="text">Text</label></div>
            <div class="p-col-20">
                <Textarea  :autoResize="true" rows="5" cols="70" name= "newText"  id="text" v-model="newText" />
            </div>
        </div>
    </div>
    <template #footer>
        <Button label="ADD" icon="pi pi-check" @click="addNewPost()" class="p-button-success"></Button>
    </template>
</Dialog> 
<Dialog :visible.sync="dialogVisible" :style="{width: '900px'}" header="Edit Post" :modal="true" >
    <div class="p-cardialog-content"> 
        <div class="p-grid p-fluid ">
            <div class="p-col-4"><label for="title">Title</label></div>
            <div class="p-col-20">
                <InputText style="width: 100%" name= "newTitle" id="title" v-model="newTitle"  autocomplete="off" />
            </div>

            <div class="p-col-4"><label for="text">Text</label></div>
            <div class="p-col-20">
                <Textarea  :autoResize="true" rows="5" cols="70" name= "newText"  id="text" v-model="newText" />
            </div>
        </div>
    </div>
    <template #footer>
      <Button label="Save" icon="pi pi-check" @click="updatePost()" class="p-button-success"></Button> 
    </template>
</Dialog> 
</div>
</template>

<script>
import {mapState} from 'vuex';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import 'primevue/resources/themes/vela-teal/theme.css';
import 'primeicons/primeicons.css'
export default {
  name: 'Backoffice',
  components:{
    DataTable, 
    Column, 
    Dialog, 
    Button, 
    InputText, 
    Textarea,
  },
  data: () =>{
    return {
    id: null,
    isEdited : true,  
    newTitle: null, 
    newText: null, 
    dialogVisibleNew: false,
    dialogVisible: false,
    selectedPost: null,
    }
  },methods:{
    addNewPost(){
      const newPost = {title: this.newTitle, text: this.newText};
      this.$store.dispatch('addNewPost', newPost)
      this.dialogVisibleNew= false

    },
    deleteThePost(id){
      this.$store.dispatch('deletePost', id)
    },editButton(id){
      this.id = id;
      this.dialogVisible = true;
    },updatePost(){
      const newP = {title: this.newTitle, text: this.newText}; 
      const payload = {id: this.id, post: newP}
      this.$store.dispatch('updatePostId', payload)
      this.dialogVisible = false;
    },addButton(){
      this.dialogVisibleNew = true;
    },goToDetail(id){
      this.$router.push(`/post/${id}`)
    }
  },
   mounted () {
     this.$store.dispatch('getAllPost')
  },computed:{ 
    ...mapState(['posts'])},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form{
  display: flex; 
  flex-direction: column;
  margin: 10px auto;
}
ul {
  list-style-type: none;
  padding: 0;
}

.p-cardialog-content{
  padding: 0;
}

</style>
