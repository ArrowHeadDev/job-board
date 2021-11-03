<template>
  <div>
    <b-container>
      <h1 class="text-center">Register</h1>
      <b-card id="form" style="max-width:50rem;" class="mx-auto">
        <b-card-body>
          <b-form
            @submit.prevent="register"
            v-if="!isCompany"
            id="formregisterPeople"
          >
            <b-row class="mt-1">
              <b-checkbox
                v-model="isCompany"
                id="isCompany"
                size="lg
                  "
                switch
              >
                <b>I'm a company</b></b-checkbox
              >
            </b-row>
            <b-row>
              <b-col class="mt-1">
                <label for="input-fname">First Name</label>
                <b-form-input
                  id="input-fname"
                  v-model="formP.firstName"
                  placeholder="First name"
                  required
                ></b-form-input>
              </b-col>
              <b-col class="mt-1">
                <label for="input-name">Name</label>
                <b-form-input
                  id="input-name"
                  v-model="formP.name"
                  placeholder="Name"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col>
                <label for="input-email">Email</label>
                <b-form-input
                  id="input-email"
                  v-model="formP.email"
                  type="email"
                  placeholder="Email (this will be your login)"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-form-group class="mt-3" id="pwd-input-group" label="Password">
              <b-form-input
                id="input-pwd"
                v-model="formP.password"
                type="password"
                placeholder="Password"
                aria-describedby="password-help-block"
                required
              ></b-form-input>
            </b-form-group>

            <b-row class="mt-3" id="address-input-group">
              <b-col>
                <label for="input-address">Address</label>
                <b-form-input
                  v-model="formP.address"
                  id="input-address"
                  placeholder="Address"
                  required
                ></b-form-input>
              </b-col>
              <b-col>
                <label for="input-postalcode">Postal Code</label>
                <b-form-input
                  v-model="formP.postalCode"
                  id="input-postalcode"
                  placeholder="Postal Code"
                  required
                >
                </b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-3 mx-auto">
              <label for="input-city">City</label>
              <b-form-input
                v-model="formP.city"
                id="input-city"
                placeholder="City"
                required
              ></b-form-input>
            </b-row>

            <b-row class="mt-3 mx-auto">
              <label for="input-birthdate">Birth Date</label>
              <b-form-input
                type="date"
                v-model="formP.birthDate"
                id="input-birthdate"
                required
              ></b-form-input>
            </b-row>

            <b-row class="mt-3 mx-auto">
              <label for="input-website">Your website</label>
              <b-form-input
                v-model="formP.website"
                id="input-website"
                type="url"
                placeholder="http://www.mywebsite.com"
              ></b-form-input>
            </b-row>

            <b-row class="mt-3">
              <b-col>
                <label for="input-phone">Phone Number</label>
                <b-form-input
                  id="input-phone"
                  v-model="formP.phone"
                  type="tel"
                  placeholder="+060000000"
                  required
                >
                </b-form-input>
              </b-col>

              <b-col>
                <label for="select-gender">
                  Gender
                </label>
                <b-form-select
                  v-model="formP.gender"
                  :options="options"
                  id="select-gender"
                  required
                  placeholder="Please select an option"
                >
                </b-form-select>
              </b-col>
            </b-row>

             <b-form class="mt-1" @submit.prevent="sendFile">
          <label for="cv-input">Curiculum Vitae </label>
          <b-form-file
            name="cv-input"
            @change="selectFile($event)"
            enctype="multipart/form-data"
            ref="file"
            
          >
          </b-form-file>
          <label for="pp-input">Profile Picture </label>
          <b-form-file
            name="pp-input"
            @change="selectFile($event)"
            enctype="multipart/form-data"
            ref="file"
            
          >
          </b-form-file>

          <b-button pill class="mx-auto mt-2" variant="primary" type=submit> Submit </b-button>
        </b-form>
            <div class="mt-3 ">
              <b-button
                id="b-register"
                size="lg"
                pill
                variant="dark"
                type="submit"
                >Register</b-button
              >
            </div>
          </b-form>

          <b-form
            @submit.prevent="register"
            v-if="isCompany"
            id="formregisterCompany"
          >
            <b-row class="mt-1">
              <b-checkbox v-model="isCompany" id="isCompany" size="lg" switch>
                <b>I'm a company</b></b-checkbox
              >
            </b-row>
            <b-row>
              <b-col class="mt-1">
                <label for="input-C-name"> Company Name</label>
                <b-form-input
                  id="input-C-name"
                  v-model="formC.name"
                  placeholder="Name"
                  required
                ></b-form-input>
              </b-col>

              <b-col class="mt-1">
                <label for="input-C-name"> Sectors of Activities</label>
                <b-form-input
                  id="input-C-activities"
                  v-model="formC.activities"
                  placeholder="The sectors your company operates in"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col>
                <label for="input-C-email">Email</label>
                <b-form-input
                  id="input-C-activites"
                  v-model="formC.email"
                  type="email"
                  placeholder="Email (this will be your login)"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-form-group class="mt-3" id="pwd-input-group" label="Password">
              <b-form-input
                id="input-C-pwd"
                v-model="formC.password"
                type="password"
                placeholder="Password"
                aria-describedby="password-help-block"
                required
              ></b-form-input>
            </b-form-group>

            <b-row class="mt-3" id="address-input-group">
              <b-col>
                <label for="input-C-address">Address</label>
                <b-form-input
                  v-model="formC.address"
                  id="input-address"
                  placeholder="Address"
                  required
                ></b-form-input>
              </b-col>
              <b-col>
                <label for="input-C-postalcode">Postal Code</label>
                <b-form-input
                  v-model="formC.postalCode"
                  id="input-C-postalcode"
                  placeholder="Postal Code"
                  required
                >
                </b-form-input>
              </b-col>
            </b-row>

            <b-row class="mt-3 mx-auto">
              <label for="input-C-city">City</label>
              <b-form-input
                v-model="formC.city"
                id="input-C-city"
                placeholder="City"
                required
              ></b-form-input>
            </b-row>

            <b-row class="mt-3 mx-auto">
              <label for="input-siret">Company's SIRET</label>
              <b-form-input
                v-model="formC.siret"
                id="input-siret"
                required
                max="14"
              ></b-form-input>
            </b-row>

            <b-row class="mt-3 mx-auto">
              <label for="input-website">Company's website</label>
              <b-form-input
                v-model="formC.website"
                id="input-website"
                type="url"
                placeholder="http://www.mywebsite.com"
              ></b-form-input>
            </b-row>

            <b-row class="mt-3">
              <b-col>
                <label for="input-phone">Representant's phone Number</label>
                <b-form-input
                  id="input-C-phone"
                  v-model="formC.phone"
                  type="tel"
                  placeholder="+060000000"
                  required
                >
                </b-form-input>
              </b-col>

              <b-col>
                <label for="input-rep">
                  Representant's Name
                </label>
                <b-form-input
                  id="input-C-rep"
                  v-model="formC.contactName"
                  required
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-3 mx-auto">
              <label class="mt-1" for="input-cv">Number of employees</label>
              <b-form-input
                type="number"
                id="input-C-ne"
                v-model="formC.numberEmployees"
                required
              >
              </b-form-input>
            </b-row>
            

            <div class="mt-3 ">
              <b-button
                id="b-register"
                size="lg"
                pill
                variant="dark"
                type="submit"
                >Register</b-button
              >
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

import { validators } from "../helpers/validator.js";
import Swal from 'sweetalert2';


export default {
  mixins: [validators],
  data: function() {
    return {
      files:[],
      formP: {},
      
      submitted: false,
      formC: {},
      isCompany: false,

      options: [
        {
          value: "male",
          text: "Male",
        },
        {
          value: "female",
          text: "Female",
        },
      ],

      errors: [],
    };
  },

  methods: {

    selectFile(event) {
      this.files.push(event.target.files[0]);
      
      this.error = false;
      this.message = "";

    },

    async sendFile() {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files", file); // note, no square-brackets;
      }
      

      try {
        await axios
          .post(`http://localhost:8500/api/upload`, formData)
          .then((res) => {
            this.formP.cv = res.data.filePath1;
            this.formP.picture = res.data.filePath2
            console.log(this.formP.cv,this.formP.picture);
          });
        this.message = "Files has been uploaded";
        this.file = "";
        this.error = true;
      } catch (error) {
        this.message = "Something went wrong";
        this.error = true;
      }
    },
    //Register sends post request to node API to add new people/company to db and displays errors
    async register() {
      if (this.isCompany === false) {
        
        
        if (validators.validateForm(this.formP)) {
          try {
            await axios
              .post("http://localhost:8500/api/people/register", this.formP)
              .then((this.submitted = true));
          } catch (err) {
            this.submitted = false;
            validators.errorValidator(err.response.data.message,err.response.data.status)

          }
        }
        if (this.submitted) {
           Swal.fire({
            icon:"success",
            title:"Welcome!",
            text:"Successfully registered!"

          }).then(this.$router.push("login"))
        }
      } else {
        if (validators.validateForm(this.formC)) {
          try {
            await axios
              .post("http://localhost:8500/api/company/register", this.formC)
              .then((this.submitted = true));
          } catch (err) {
            this.submitted = false;
            validators.errorValidator(err.response.data.message,err.response.data.status)
          }
        }
        if (this.submitted) {
          Swal.fire({
            icon:"success",
            title:"Welcome!",
            text:"Successfully registered!"

          }).then(this.$router.push("login"))
          
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/login.scss";
</style>
