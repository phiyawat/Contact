<template>
  <div id="app">
    <MenuBar> </MenuBar>
    <Contact></Contact>
    <router-view></router-view>
  </div>
</template>


<script> 
import MenuBar from '@/components/MenuBar'
import Contact from '@/page/Contact'
import Semantic from '../node_modules/semantic-ui-css'

export default {  
  components: { Semantic,MenuBar,Contact } 
} 
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>