<template>
  <div>
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
            <small> by {{ companyName }}</small>
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

        <b-row v-if="users.length" class="mt-3 mx-auto">
          <span style="font-weight:bold ;"> Users that applied to this offer : </span>
          <b-table responsive dark striped hover :fields="userFields" :items="users"> </b-table>
        </b-row>

        <b-row v-else class="mt-3 mx-auto">
          <span style="font-weight:bold">Nobody applied to this offer!</span>
          
        </b-row>
      </div>

      <template #footer>
        <div class="learnmore">
          <b-button pill variant="dark" v-if="show" v-on:click="show = !show"
            >Close</b-button
          >
          <b-button pill variant="dark" v-else v-on:click="show = !show"
            >More info</b-button
          >
          <b-button pill class="mx-2" @click="displayModifyModal" variant="dark"
            ><b-icon icon="brush"></b-icon
          ></b-button>
        </div>
      </template>
    </b-card>

    <b-modal
      header-bg-variant="dark"
      header-text-variant="white"
      no-stacking
      hide-footer
      :id="modify"
      centered
      title="Modifying job offer"
    >
      <b-row class="mt-1 mx-auto">
        <b-form
          @submit.prevent="updateAdvertisement"
          id="formModifyAdvertisement"
        >
          <b-row>
            <b-col>
              <b-button type="submit" class="mx-1" variant="success">
                <b-icon icon="check"></b-icon
              ></b-button>
              <b-button @click="confirmDelete" class="mx-3" variant="danger">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-title">Title</label>

              <b-form-input
                id="input-title"
                v-model="form.title"
                :placeholder="title"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-cat">Category</label>

              <b-form-input
                id="input-cat"
                v-model="form.category"
                :placeholder="category"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-website">Description</label>

              <b-form-textarea
                id="desc"
                v-model="form.description"
                :placeholder="fulldesc"
                row="3"
                max-rows="6"
              >
              </b-form-textarea>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-address">Location</label>

              <b-form-input
                v-model="form.address"
                id="input-address"
                :placeholder="loc"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-pDate" class="mx-2 mt-1">Published Date</label>

              <b-form-input
                id="input-pDate"
                v-model="form.publishDate"
                type="date"
                :placeholder="creationdate"
              >
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-resume">Resume</label>

              <b-form-input
                id="input-resume"
                v-model="form.resume"
                :placeholder="shortdescription"
              >
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-wages">Wages</label>

              <b-form-input
                id="input-wages"
                v-model="form.wages"
                :placeholder="wages"
              >
              </b-form-input>
            </b-col>
          </b-row>
        </b-form>
      </b-row>
    </b-modal>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/ads.scss";
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import router from "../router/index.js";
import { validators } from "../helpers/validator.js";

export default {
  data: function () {
    return {

      userFields:[
        "name",
        "firstName",
        "email",
        "address",
        "postalCode",
        "city",
        "birthDate",
        "cv",
        "website",
        "phone",
        "gender",
        "picture",
        "motivationLetter"
      ],

      jobApps: [],
      users: [
      ],
      createAds: [],
      show: false,
      companyName: null,
      formAds: {},
      form: {},
    };
  },

  methods: {
    displayModifyModal() {
      this.$bvModal.show(this.modify);
    },

    //Display confirmation to delete
    confirmDelete() {
      Swal.fire({
        title: "Are you sure you want to delete this job Offer?",
        text: "You won't be able to come back and recover it!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "grey",
        confirmButtonText: "Yes",
        confirmButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteAd();
        }
      });
    },

    async deleteAd() {
      try {
        await axios
          .delete("http://localhost:8500/api/advertisement/" + this.id)
          .then((this.deleted = true));
      } catch (err) {
        console.log(err);
      }

      if (this.deleted == true) {
        Swal.fire({
          icon: "success",
          title: "Job Offer successfully deleted !",
        }).then(function () {
          router.go(router.currentRoute);
        });
      }
    },

    async updateAdvertisement() {
      try {
        await axios
          .patch(
            "http://localhost:8500/api/advertisement/" + this.id,
            this.form
          )
          .then((this.submitted = true));
      } catch (err) {
        this.submitted = false;
        validators.errorValidator(
          err.response.data.message,
          err.response.data.status
        );
        return;
      }
      if (this.submitted == true) {
        Swal.fire({
          icon: "success",
          title: "Ad successfully updated",
        }).then(function () {
          router.go(router.currentRoute);
        });
      }
    },

    async fetchCompanyById(id) {
      try {
        await axios
          .get("http://localhost:8500/api/company/" + id)
          .then((response) => {
            return (this.companyName = response.data.name);
          });
      } catch (err) {
        if (err.response) {
          console.log("Server ERROR", err);
        } else if (err.request) {
          console.log("Network ERROR", err);
        } else {
          console.log("Client Error:", err);
        }
      }
    },

    async fetchJobAppsById(id) {
      try {
        await axios
          .get("http://localhost:8500/api/jobApp/advertisementId/" + id)
          .then((response) => {
            let data = response.data;
            for (let key in data) {
              this.jobApps.push(data[key]);
            }
            return this.jobApps
          });
      } catch (err) {
        console.log(err);
      }

      try {
        
        for(let i = 0; i< this.jobApps.length;i++){
          await axios
          .get("http://localhost:8500/api/people/" + this.jobApps[i].peopleId)
          .then((response) => {
            let data = response.data;
            
            this.users.push(data);
            console.log(this.users)
            return this.users
          });

          this.users[i].motivationLetter = this.jobApps[i].peopleLetter
        }
        
      } catch (err) {
        console.log(err);
      }
    },
  },

 
  
  mounted() {
    this.fetchCompanyById(this.companyId);
    this.fetchJobAppsById(this.id);
  },

  props: {
    modify: {},

    category: {
      required: true,
    },
    companyId: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
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
      value: ["Number", "String"],
      required: true,
    },
  },
};
</script>
