<template>
  <div id="app" class="mt-5">
    <div id="nav">
      <pageheader :isLogged="currentUser"></pageheader>
    </div>
    <div id="main">
      
      <router-view></router-view>
    </div>

    <!--<pfooter></pfooter>!-->
  </div>
</template>

<script>
//import header component into main

import Header from "./components/Header.vue";
import {authService} from "./helpers/auth.js"
//import Footer from "./components/Footer.vue";

export default {
data(){
return {
  currentUser:null
}
},
  //register components
  components: {
    pageheader: Header,

    //pfooter: Footer,
  },

    mounted (){
      return authService.currentUser.subscribe(x => this.currentUser = x);
    }
  



        

};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-bottom: 10%;
  color: #2c3e50;
}
html,
body {
  overflow-x: hidden;
}
body {
  position: relative;
}
#nav {
  padding-bottom: 5%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
