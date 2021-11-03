<template>
<div>

<b-modal
    
      header-bg-variant="dark"
      header-text-variant="white"
      no-stacking
      hide-footer
      id="createAdsModal"
      centered
      title="Creating new job offer ..."
    >
      <b-form @submit.prevent="addAd" class="mx-2 mt-2">
        <b-row class="mt-2 mx-2">
          <b-form-input
            v-model="formAds.title"
            placeholder="Title"
          ></b-form-input>
        </b-row>

        <b-row class="mt-2 mx-2">
          <b-form-input v-model="formAds.category" placeholder="Category">
          </b-form-input>
        </b-row>

        <b-row class="mt-2 mx-2">
          <b-form-textarea
            v-model="formAds.description"
            id="desc"
            placeholder="Description"
            row="3"
            max-rows="6"
            required
          >
          </b-form-textarea>
        </b-row>

        <b-row class="mt-2 mx-2">
          <b-form-input
            v-model="formAds.address"
            placeholder="Localisation"
          ></b-form-input>
        </b-row>


        <b-row class="mt-2 mx-2">
          <b-form-textarea
            v-model="formAds.resume"
            id="desc"
            placeholder="Ad Resume"
            row="3"
            max-rows="3"
            required
          >
          </b-form-textarea>
        </b-row>


        <b-row class="mt-2 mx-2">
          <b-form-input
            placeholder="Contract Type"
            v-model="formAds.contratType"
          >
          </b-form-input>
        </b-row>

        <b-row class="mt-2 mx-2">
          <b-form-input
            placeholder="Wages"
            v-model="formAds.wages"
          ></b-form-input>
        </b-row>

        <b-row>
          <b-button pill variant="success" class="mt-3 mx-auto" type="submit">
            <b-icon icon="check"></b-icon>
          </b-button>
        </b-row>
      </b-form>
    </b-modal>


</div>

</template>

<script> 

import Swal from 'sweetalert2'
import axios from 'axios'
import router from '../router/index.js'
import {validators} from '../helpers/validator.js'
import {authService} from '../helpers/auth.js'
export default {
data(){
    return{
        formAds:{
            companyId: authService.currentUserValue.id
        }
    }
},


methods:{
 async addAd() {
      try {
        await axios
          .post("http://localhost:8500/api/advertisement/", this.formAds)
          .then((this.submitted = true));
      } catch (err) {
        this.submitted = false;
        validators.errorValidator(
          err.response.data.message,
          err.response.data.status
        );
      }

      if (this.submitted == true) {
        Swal.fire({
          icon: "success",
          title: "Advertisement successfully added",
        }).then(function() {
            router.go(router.currentRoute);
          });
        
      }
      
    },

}

}

</script>