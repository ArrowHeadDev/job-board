<template>
  <b-card
    id="ad"
    header-bg-variant="dark"
    header-text-variant="white"
    class="mt-1"
  >
    <template #header class="cardheader">
      <b-row>
        <b-col>
          <h4 class="mb-1">{{ title }}</h4>
        </b-col>
        <b-col>
          <small v-if="daysago === 'Today'" class="date-created">
            {{ daysago }}
          </small>
          <small v-else-if="daysago === 1" class="date-created">
            {{ daysago }} day ago
          </small>
          <small v-else class="date-created"> {{ daysago }} days ago</small>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <small> by  {{ companyName }}</small>
        </b-col>
        <b-col>
          <small class="contract-type"
            >Contract type : {{ typecontract }}</small
          >
        </b-col>
      </b-row>
    </template>
    <div v-if="!this.show">
      <p class="mb-1 shortdescription">
        {{ shortdescription }}
      </p>
    </div>

    <div v-if="this.show" class="more">
      <b-row class="mx-1">
        <p class="fulldesc">{{ fulldesc }}</p>
      </b-row>

      <b-row>
        <b-col>
          <span class="wages">Wages : {{ wages }} </span>
        </b-col>
        <b-col>
          <span class="localisation"> Localisation: {{ loc }}</span>
        </b-col>
      </b-row>

      <b-row class="mx-auto">
        <span class="published_date">Published on {{ creationdate }}</span>
      </b-row>
    </div>

    <template #footer>
      <div class="learnmore">
        <b-button pill variant="dark" v-if="show" v-on:click="show = !show"
          >Close</b-button
        >
        <b-button pill variant="dark" v-else v-on:click="show = !show"
          >Learn More</b-button
        >
      </div>
      <applyModal :adId="id" :show=show></applyModal>
    </template>
  </b-card>
</template>

<style lang="scss" scoped>
@import "src/assets/ads.scss";
</style>

<script>
import axios from 'axios'
import ApplyModal from './ApplyModal.vue'
export default {
  
  data: function() {
    return {
      companyName:null,
      show: false,
     
    };
  },

  components: {
    applyModal : ApplyModal 
    },

    methods:{
      async fetchCompanyById (id){
    try{
      await axios.get("http://localhost:8500/api/company/"+ id).then((response) => {
          
        return this.companyName = response.data.name
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

  }
    },

    mounted(){
      this.fetchCompanyById(this.companyId)
    },


  props: {

    companyId:{
      type:Number,
      required:true
    },
    id:{
      type:Number,
      required:true
    },
    title: {
      type: String,
      required: true,
    },
    shortdescription: {
      type: String,
      required: true,
    },
    creationdate: {
      type: String,
      required: true,
    },
    fulldesc: {
      type: String,
      required: true,
    },
    typecontract: {
      type: String,
      required: true,
    },
    wages: {
      type: String,
      required: true,
    },
    loc: {
      type: String,
      required: true,
    },
    daysago: {
      value:['Number','String'],
      required: true,
    },
  },
};
</script>
