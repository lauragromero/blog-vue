<template>
    <div>
        username:
        <input type="text" name="username" v-model="username">
        password:
        <input type="password" name="password" v-model="password">
        <button @click="login()">Log-In</button>
        <p>{{error}}</p>
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
        error: null
    };
  },
  methods:{
      login:  async function(){
        try {
        const user = {username: this.username, password: this.password}
        await login(user)
        await this.$router.push('Backoffice') 
      } catch (error) {
        this.error =  'soy un error';
      }
    },
  }
}
</script>

<style scoped>
</style>