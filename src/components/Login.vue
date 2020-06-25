<template>
    <div>
        username:
        <input type="text" name="username" v-model="username">
        password:
        <input type="password" name="password" v-model="password">
        <button @click="login()">Log-In</button>
        <p>{{errorMsg}}</p>
    </div>
    
</template>

<script>
import login from '@/service/login';

export default {
  name: 'PostList',
  data: () => {
    return {
        posts: [],
        username: null, 
        password: null, 
        errorMsg: null
    };
  },
  methods:{

async login () {
      if (!this.username || !this.password) {
        this.errorMsg = 'all fields are mandatory'
      } else {
         login(this.username, this.password)
         .then(response=>{
            localStorage.setItem('token', response.token)
            this.$router.push('/admin')
         })
         .catch (error => this.errorMsg = error)
        }
      }
    }
}
</script>

<style scoped>
</style>