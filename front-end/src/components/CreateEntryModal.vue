<template>
  <div>
    <b-modal
      header-bg-variant="dark"
      header-text-variant="white"
      no-stacking
      hide-footer
      id="createModal"
      centered
      title="Creating new database entries.."
    >
      <b-row>
        <b-tabs content>
          <b-tab title="Users">
            <b-form @submit.prevent="addUser" class="mt-2 mx-2">
              <b-row>
                <b-col class="mt-1">
                  <b-form-input
                    id="input-fname"
                    placeholder="First name"
                    v-model="userForm.firstName"
                    required
                  ></b-form-input>
                </b-col>
                <b-col class="mt-1">
                  <b-form-input
                    id="input-name"
                    v-model="userForm.name"
                    placeholder="Name"
                    required
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <b-form-input
                    id="input-email"
                    type="email"
                    placeholder="Email"
                    v-model="userForm.email"
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <b-form-input
                    id="input-pwd"
                    type="password"
                    placeholder="Password"
                    aria-describedby="password-help-block"
                    required
                    v-model="userForm.password"
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3" id="address-input-group">
                <b-col>
                  <b-form-input
                    id="input-address"
                    placeholder="Address"
                    required
                    v-model="userForm.address"
                  ></b-form-input>
                </b-col>
                <b-col>
                  <b-form-input
                    id="input-postalcode"
                    placeholder="Postal Code"
                    required
                    v-model="userForm.postalCode"
                  >
                  </b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3 mx-auto">
                <b-form-input
                  id="input-city"
                  placeholder="City"
                  required
                  v-model="userForm.city"
                ></b-form-input>
              </b-row>

              <b-row class="mt-3 mx-auto">
                <b-form-input
                  type="date"
                  id="input-birthdate"
                  required
                  v-model="userForm.birthDate"
                ></b-form-input>
              </b-row>

              <b-row class="mt-3 mx-auto">
                <b-form-input
                  id="input-website"
                  type="url"
                  placeholder="Website"
                  v-model="userForm.website"
                ></b-form-input>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <b-form-input
                    id="input-phone"
                    type="tel"
                    placeholder="Phone Number"
                    v-model="userForm.phone"
                    required
                  >
                  </b-form-input>
                </b-col>

                <b-col>
                  <b-form-select
                    id="select-gender"
                    required
                    placeholder="Please select an option"
                    v-model="userForm.gender"
                    :options="options"
                  >
                  </b-form-select>
                </b-col>
              </b-row>

              <b-row class="mt-3 mx-auto">
                <b-col>
                  <b-form-file
                    id="input-cv"
                    placeholder="Choose your resume from your computer or drop it here"
                    drop-placeholder="Drop your resume here"
                    v-model="userForm.cv"
                  >
                  </b-form-file>
                </b-col>
                <b-col>
                  <b-form-file
                    id="input-picture"
                    placeholder="Choose your picture from your computer or drop it here"
                    v-model="userForm.picture"
                  >
                  </b-form-file>
                </b-col>
              </b-row>
              <b-row>
                <b-button
                  class="mx-auto mt-1"
                  variant="success"
                  pill
                  type="submit"
                >
                  <b-icon icon="check"></b-icon>
                </b-button>
              </b-row>
            </b-form>
          </b-tab>

          <b-tab title="Companies">
            <b-form
              class="mt-2 mx-2"
              @submit.prevent="addCompany"
              id="formAddCompany"
            >
              <b-row>
                <b-col class="mt-1">
                  <b-form-input
                    id="input-C-name"
                    placeholder="Name"
                    v-model="companyForm.name"
                    required
                  ></b-form-input>
                </b-col>

                <b-col class="mt-1">
                  <b-form-input
                    id="input-C-activities"
                    placeholder="Activities"
                    v-model="companyForm.activities"
                    required
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <b-form-input
                    v-model="companyForm.email"
                    id="input-C-activites"
                    type="email"
                    placeholder="Email"
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <b-form-input
                    v-model="companyForm.password"
                    id="input-C-pwd"
                    type="password"
                    placeholder="Password"
                    aria-describedby="password-help-block"
                    required
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3" id="address-input-group">
                <b-col>
                  <b-form-input
                    v-model="companyForm.address"
                    id="input-address"
                    placeholder="Address"
                    required
                  ></b-form-input>
                </b-col>
                <b-col>
                  <b-form-input
                    v-model="companyForm.postalCode"
                    id="input-C-postalcode"
                    placeholder="Postal Code"
                    required
                  >
                  </b-form-input>
                </b-col>
              </b-row>

              <b-row class="mt-3 mx-auto">
                <b-form-input
                  v-model="companyForm.city"
                  id="input-C-city"
                  placeholder="City"
                  required
                ></b-form-input>
              </b-row>

              <b-row class="mt-3 mx-auto">
                <b-form-input
                  v-model="companyForm.siret"
                  id="input-siret"
                  required
                  max="14"
                  placeholder="SIRET"
                ></b-form-input>
              </b-row>

              <b-row class="mt-3 mx-auto">
                <b-form-input
                  v-model="companyForm.website"
                  id="input-website"
                  type="url"
                  placeholder="Website"
                ></b-form-input>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <b-form-input
                    v-model="companyForm.phone"
                    id="input-C-phone"
                    type="tel"
                    placeholder="Phone"
                    required
                  >
                  </b-form-input>
                </b-col>

                <b-col>
                  <b-form-input
                    v-model="companyForm.contactName"
                    id="input-C-rep"
                    required
                    placeholder="Contact Name"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="mt-3 mx-auto">
                <b-form-input
                  v-model="companyForm.numberEmployees"
                  type="number"
                  id="input-C-ne"
                  placeholder="Number of Employees"
                  required
                >
                </b-form-input>
              </b-row>

              <b-row>
                <b-button
                  pill
                  variant="success"
                  class="mt-3 mx-auto"
                  type="submit"
                >
                  <b-icon icon="check"></b-icon>
                </b-button>
              </b-row>
            </b-form>
          </b-tab>

          <b-tab title="Advertisements">
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
                <b-form-input
                  v-model="formAds.publishDate"
                  type="date"
                  placeholder="Publish Date"
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
                  placeholder="Company Id"
                  type="number"
                  v-model="formAds.companyId"
                >
                </b-form-input>
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
                <b-button
                  pill
                  variant="success"
                  class="mt-3 mx-auto"
                  type="submit"
                >
                  <b-icon icon="check"></b-icon>
                </b-button>
              </b-row>
            </b-form>
          </b-tab>

          <b-tab title="Job Applications">
            <b-form @submit.prevent="addJobApp">
              <b-row class="mt-2 mx-2">
                <b-form-input
                  v-model="formJobApp.advertisementId"
                  type="number"
                  placeholder="Ad ID"
                ></b-form-input>
              </b-row>

              <b-row class="mt-2 mx-2">
                <b-form-input
                  v-model="formJobApp.peopleId"
                  type="number"
                  placeholder="Appliant ID"
                >
                </b-form-input>
              </b-row>

              <b-row class="mt-2 mx-2">
                <b-form-textarea
                  rows="3"
                  max-rows="3"
                  v-model="formJobApp.peopleLetter"
                  placeholder="Motivation Letter"
                >
                </b-form-textarea>
              </b-row>
              <b-row>
                <b-button
                  pill
                  variant="success"
                  class="mt-3 mx-auto"
                  type="submit"
                >
                  <b-icon icon="check"></b-icon>
                </b-button>
              </b-row>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { validators } from "../helpers/validator.js";
import router from "../router/index.js"
export default {
  data() {
    return {
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
      formAds: {},
      userForm: {},
      companyForm: {},
      formJobApp: {},
    };
  },
  methods: {
    async addUser() {
      if (validators.validateForm(this.userForm)) {
        try {
          await axios
            .post("http://localhost:8500/api/people/register", this.userForm)
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
            title: "User successfully added",
          }).then(function() {
            router.go(router.currentRoute);
          });
          
        }
      }
    },

    async addCompany() {
      if (validators.validateForm(this.companyForm)) {
        try {
          await axios
            .post(
              "http://localhost:8500/api/company/register",
              this.companyForm
            )
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
            title: "Company successfully added",
          }).then(function() {
            router.go(router.currentRoute);
          });
          
        }
      }
    },

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

    async addJobApp() {
      try {
        await axios
          .post("http://localhost:8500/api/jobApp/", this.formJobApp)
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
  },
};
</script>
