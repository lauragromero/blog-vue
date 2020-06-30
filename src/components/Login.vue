<template>
  <div class="user__container">
    <form class="log__form">
       <span class="header__container"> Already registered?</span>
        <label for="username">Username</label>
        <input  id="username" type="text" name="username" v-model="username">
        <label for="password">Password</label>
        <input  id="password" type="password" name="password" v-model="password">
        <button  class="button_primary" @click.prevent="login()">Log-In</button>
        <p class="error_container">{{errorMsgLog}}</p>
       

    </form>
    <form>
        <span class="header__container"> Create a New User</span>
        <label for="newUsername">Username</label>
        <input  id="newUsername" type="text" name="newUsername" v-model="newUsername">
        <label for="newNickname">Nickname</label>
        <input  id="newNickname" type="text" name="newNickname" v-model="newNickname">
         <label for="newPassword">Password</label>
        <input  id="newPassword" type="password" name="newPassword" v-model="newPassword">
        <button class="button_primary" @click.prevent="singin()">Sing-In</button>
        <p class="error_container">{{errorMsg}}</p>
        <p class="error_container">{{okMessage}}</p>
    </form>
  </div>
</template>

<script>
import login from '@/service/login';
import singin from '@/service/singin';

export default {
  name: 'PostList',
  data: () => {
    return {
        posts: [],
        username: null, 
        password: null, 
        errorMsg: null, 
        errorMsgLog: null, 
        newUsername: null,
        newNickname: null,  
        newPassword: null, 
        okMessage: null
    };
  },
  methods:{
  async login () {
        if (!this.username || !this.password) {
          this.errorMsgLog = 'All fields are mandatory'
        } else {
          login(this.username, this.password)
          .then(response=>{
              localStorage.setItem('token', response.token)
              this.$router.push('/admin')
          })
          .catch (error =>{ 
            console.log(error)
            this.errorMsgLog = 'User or password wrong'})
          }
        }, 
  async singin(){
    if (!this.newUsername || !this.newPassword) {
          this.errorMsg = 'All fields are mandatory'
        } else {
          const newUser ={username: this.newUsername, nickname: this.newNickname, password: this.newPassword}
          singin(newUser)
          .then(response=>{
              console.log(response)
              this.okMessage = 'Register ok, now login'
              this.newUsername= null;
              this.newNickname= null;
              this.newPassword= null;
          })
          .catch (error => this.errorMsg = error)
          }
        }, 
  }
}
</script>

<style scoped>

.user__container{
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
  margin: 40px auto;
}
form{
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  border-top: 6px solid #673AB7;
  background-color: #ffffff;
  border-radius: 4px;
  width: 400px;
  padding: 20px;
  height: auto;
  max-height: 380px;

}
.log__form{
  max-height: 300px;
}
input{
 margin: 10px 0;
 display: inline-block;
 height: 30px;
}

.button_primary{
  margin: 10px auto;
  width: 150px;
  height: 40px;
  background-color: #f15493;
  border: 1px solid  #f15493;
  color:rgb(255, 255, 255);
  text-transform: uppercase;
  padding: 10px;
  cursor: pointer;
  transition: all 1s ease;
}
.button_primary:hover{
 
  color: #f15493;
  background-color: rgb(255, 255, 255);
  border: 1px solid  #f15493;
}
.header__container{
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 20px;
}
.error_container{
  color: red;
}
</style>