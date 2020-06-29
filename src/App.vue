<template>
  <div id="app">
    <NavComponent/>
    <header-component/>
    <router-view/>
  </div>
</template>

<script>
import NavComponent from './components/NavComponent'

export default {
  name: 'App',
  components: {
    NavComponent
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  height: 100%;
}

</style>
