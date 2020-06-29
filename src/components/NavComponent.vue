<template>
  <div class= "nav" id="nav">
      <div>
      <router-link to="/">Home</router-link>
      <router-link to="/admin">Dashboard</router-link>
      </div>
      <div class="login__container">
      <template v-if="user.user">
      <span class="user__message">Hi! {{user.user}}</span>
      <button  class="logout__btn" @click="logout()">Log Out</button>
      </template>
      <template v-else> <router-link to="/login">Login</router-link></template>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'NavComponent',
  data: ()=>{
      return{
          isLoging: false, 
    }  
  },
  methods:{
      logout(){
        this.$store.dispatch('logOut')
        this.$router.push("/");
      }
  },
  computed:{ 
    ...mapState(['user']), 
},
}
</script>


<style scoped>
#nav {
  padding: 10px 20px 10px 20px;
  background-color: #683ab798;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color:  #f0f0f0;
  margin: 10px;
  text-transform: uppercase;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #f15493;
}
.user__message{
    color:  #f0f0f0 ;
    text-transform: uppercase;
    margin-right: 20px;
    font-weight: 600;
}
.logout__btn{
    text-transform: uppercase;
    margin-right: 20px;
    font-weight: 600;
}
</style>
