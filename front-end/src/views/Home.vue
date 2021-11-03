<template>
  <div class="home">
    <b-container>
      <h1 class="text-center">Find the right job today!</h1>

     <!-- <div class="searchbar">
        <b-form-input
          rows="1"
          v-model="text"
          placeholder="Search for a Job"
        ></b-form-input>
      </div>!-->
      <div id="adlist">
        <b-list-group>
          <h5 v-if="ads.length === 0">No Job offers!</h5>
          <div>
          <advertisements
            :key="ads.id"
            v-for="ads in ads"
            :id="ads.id"
            :companyId ="ads.companyId"
            :title="ads.title"
            :shortdescription="ads.resume"
            :creationdate="date(ads.publishDate)"
            :daysago ="daysAgo(ads.publishDate)"
            :fulldesc="ads.description"
            :typecontract="ads.contratType"
            :wages="ads.wages"
            :loc="ads.address"
          ></advertisements>
          </div>
        </b-list-group>
      </div>
    </b-container>
    <!--<div class="pagination">
      <b-pagination pills size="lg"></b-pagination>
    </div>!-->
  </div>
</template>

<script>

//Import Advertisement component
import Advertisements from "@/components/Advertisements.vue";
import {dateHelpers} from "../helpers/dates.js"
import {store, mutations } from '../store/store.js';

export default {
  components: {
    advertisements: Advertisements,
  },

  methods:{

    date: function(date){
       return dateHelpers.formatDate(date)
    },

    daysAgo: function(date){
      return dateHelpers.daysAgo(date)
    },

    
    fetchAds: function(){
      mutations.fetchAds()
      console.log("fetching")
      this.fetched = true
      return this.ads = store.advertisements
  },

  },

  

  created(){
   
      this.fetchAds()
    
  },

  beforeDestroy() {
    mutations.removeAds()
  },

  
  data: function() {
    return {
      fetched:false,
      response:null,
      ads:[]    };
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/home.scss";
</style>
