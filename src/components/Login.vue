<template>
    <div>
        username:
        <input type="text" name="username" v-model="username">
        password:
        <input type="password" name="password" v-model="password">
        <button @click="login()">Log-In</button>
    </div>
</template>

<script>
import login from '@/service/login';
export default {
  name: 'PostList',
  data: () => {
    return {
        posts: [],
        username: '', 
        password: ''
    };
  },
  methods:{
      login: async function(){
        const user = {username: this.username, password: this.password}
        console.log(user)
        await login(user)
    },
  }
}
</script>

<style scoped>
</style>