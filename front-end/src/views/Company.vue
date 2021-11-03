<template>
  <div class="home">
    <b-container>
      <h1 class="text-center">Manage your advertisements</h1>
 
      <div id="adlist">
        <b-list-group>
          <b-button @click="displaycreateModal" size="lg" class="mb-1">
            <b-icon icon="plus"></b-icon>
          </b-button>
          <h5 v-if="ads.length === 0">You haven't created any Job offer!</h5>
          <CreateAds
            :key="ads.id"
            v-for="ads in ads"
            :id="ads.id"
            :category="ads.category"
            :modify="ads.title"
            :companyId ="ads.companyId"
            :title="ads.title"
            :shortdescription="ads.resume"
            :creationdate="date(ads.publishDate)"
            :daysago ="daysAgo(ads.publishDate)"
            :fulldesc="ads.description"
            :typecontract="ads.contratType"
            :wages="ads.wages"
            :loc="ads.address"
          ></CreateAds>
        </b-list-group>
      </div>
    </b-container>

  <AdsModal></AdsModal>

  </div>
</template>

<script>

//Import Advertisement component
import createAdsModal from "@/components/createAdsModal.vue"
import createAds from "@/components/createAds.vue";
import {dateHelpers} from "../helpers/dates.js"
import { store,mutations } from '../store/store.js';

export default {
  components: {
    CreateAds: createAds,
    AdsModal: createAdsModal,
  },

  methods:{

    date: function(date){
       return dateHelpers.formatDate(date)
    },

    daysAgo: function(date){
      return dateHelpers.daysAgo(date)
    },



    displaycreateModal(){

      this.$bvModal.show('createAdsModal')
    }



  },

  created(){
    mutations.fetchCreateAds()
    this.ads = store.createAds
  },
  beforeDestroy() {
    mutations.removeAds()
  },

  data: function() {
    return {
      response:null,
      ads:[]
    };
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/home.scss";
</style>
