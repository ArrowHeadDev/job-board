<template>
  <div class="header">
    <b-navbar fixed="true" type="dark" variant="dark" class="navbar-horizontal">
      <b-navbar-brand style="color:white" :to="{ name: 'Home' }">
        <b-icon icon="house-door"></b-icon> </b-navbar-brand
      >
      
      <b-dropdown size="lg" no-caret right variant="dark" class="account">
        <template #button-content>
          <b-icon  icon="person" variant="light"></b-icon>
        </template>

        <b-dropdown-item v-if="!isLogged" :to="{ name: 'Login' }">
          Login
        </b-dropdown-item>

        <b-dropdown-item v-if="!isLogged" :to="{ name: 'Register' }">
          Register
        </b-dropdown-item>

        <b-dropdown-item v-if="isLogged" v-on:click="logOut">
          Log out
        </b-dropdown-item>
        <b-dropdown-item v-if="isLogged" :to="{ name:'Profile' }">
          Profile
        </b-dropdown-item>
      </b-dropdown>
      
    </b-navbar>
  </div>
</template>
<script>
import {authService} from "../helpers/auth.js"
export default {
  data: function() {
    return {
    currentUser:null      
    };
  },


  props:{

    isLogged :{
      

    }
  },
   
  methods: {
    logOut: function() {
      authService.logout()
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/header.scss";
</style>
