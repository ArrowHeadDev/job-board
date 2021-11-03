import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue"
import {jwtHelpers} from "../helpers/jwt.js"
import { authService } from "../helpers/auth.js";
import Register from "../views/Register.vue";
import Company from "../views/Company.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/admin",
    component: Admin
  },

  {
    path: "/company",
    name: "Company",
    component: Company
  },


  {path:'*',
  name:'404',
  }
];

export const router = new VueRouter({
  routes,
});

function getCookie(cookieName){
  let cookie = document.cookie.split(';');
  cookieName = cookie;
  cookieName = cookieName[0].split('=');
  cookieName = cookieName[1]
  var token = jwtHelpers.decode(cookieName)
  return token;
}  


router.beforeEach((to, from, next) => {

  const currentUser = authService.currentUserValue;

  if(to.name === "404"){

    next("/")
  }

  if(to.fullPath === "/"){

    if(currentUser){
      if(currentUser.role === "Company"){
        next("/company")
      }if(currentUser.role === "Admin"){
        next("/admin")
      }
    }
    
  }
  

  //check if user trying to access profile page without being logged in
  if(to.fullPath === "/profile"){
    if(!currentUser){
    next("/")
    }

  }

  //check if user is authorized to access company page
  if(to.fullPath === "/company"){
    if(!currentUser){
      next("/")
    }else{
      if(currentUser.role != "Company"){
        next("/")
      }
    }
  }
  
  // Check if user authorized to access admin page
  if(to.fullPath == "/admin"){
    if(!currentUser){
      next("/")
    }else{
      const token = getCookie("access_token");
      if(token.user_role != "Admin"  && currentUser.role != "Admin" && currentUser.isAdmin != 1){
        next("/")
      }
    }
    }

  next();
});
export default router