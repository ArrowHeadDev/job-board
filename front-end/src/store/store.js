import axios from 'axios'
import Vue from 'vue'

import { authService } from "../helpers/auth.js";
//Store acts as a global state for advertisements data
export const store = Vue.observable({
    advertisements : [
    ],
    
    createAds : [

    ],

})

export const mutations = {

    //USER MUTATIONS








    //ADS MUTATIONS

    //fetchAds uses axios to fetch and populate advertisement array with the corresponding data
    async fetchAds(){
        try{
          await axios.get("http://localhost:8500/api/advertisement").then((response) => {
            let data =  response.data
            for (let key in data){
              store.advertisements.push(data[key]);
            }
            return store.advertisements
          })
        }catch(err){
          if(err.response){
            console.log("Server ERROR",err)
          }else if (err.request){
            console.log("Network ERROR",err)
          }else{
            console.log("Client Error:",err)
          }
  
        }
      },

      async fetchCreateAds(){
        try{
          let currentUser = authService.currentUserValue
          await axios.get(`http://localhost:8500/api/advertisement/companyId/${currentUser.id}`).then((response) => {
            let data =  response.data
            for (let key in data){
              store.createAds.push(data[key]);
            }
            return store.createAds
          })
        }catch(err){
          if(err.response){
            console.log("Server ERROR",err)
          }else if (err.request){
            console.log("Network ERROR",err)
          }else{
            console.log("Client Error:",err)
          }
  
        }
      },

    removeAds(){
        store.advertisements = []
        store.createAds = []
    }

}