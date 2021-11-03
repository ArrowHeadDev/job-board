<template>
  <div>
    <h1 class="text-center">Your Profile</h1>
    <b-container>
      <b-row>
        <b-col>
          <b-card bg-variant="dark" class="overflow-hidden">
            <b-col v-if="role == 'User'">
              <b-row>
                <b-card-img
                  class="rounded-circle mx-auto mb-5 pp "
                  :src="picture"
                >
                </b-card-img>
                
              </b-row>
            </b-col>
            <b-row v-if="role == 'User' || role == 'Admin'">
              <b-col>
                <b-toast id="toast" static>
                  You are now editing your profile !
                </b-toast>
                <b-list-group v-if="!modifying">
                  <b-list-group-item> {{ firstName }}</b-list-group-item>
                  <b-list-group-item>{{ name }}</b-list-group-item>
                  <b-list-group-item>{{ email }}</b-list-group-item>
                  <b-list-group-item
                    ><b-row>
                      <b-col>{{ address }}</b-col>
                      <b-col>{{ postalcode }}</b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        {{ city }}
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item v-if="website">
                    {{ website }}
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ phone }}
                  </b-list-group-item>
                  <b-row>
              <b-img class ="mt-4 mx-auto" thumbnail fluid :src="cv"> </b-img>
              </b-row>
                </b-list-group>
                
                <b-form v-if="modifying && role == 'User'">
                  <b-list-group>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.firstName"
                        placeholder="First Name"
                      ></b-form-input>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.name"
                        placeholder="Name"
                      ></b-form-input>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.email"
                        type="email"
                        placeholder="Email"
                      ></b-form-input>
                    </b-list-group-item>

                    <b-list-group-item>
                      <b-row>
                        <b-col
                          ><b-form-input
                            v-model="formData.address"
                            placeholder="Address"
                          ></b-form-input
                        ></b-col>
                        <b-col
                          ><b-form-input
                            v-model="formData.postalCode"
                            placeholder="Postal Code"
                          ></b-form-input
                        ></b-col>
                      </b-row>
                      <b-row
                        ><b-col class="mt-1"
                          ><b-form-input
                            v-model="formData.city"
                            placeholder="City"
                          ></b-form-input></b-col
                      ></b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-form-input
                        type="tel"
                        v-model="formData.phone"
                        placeholder="Phone"
                      ></b-form-input>
                    </b-list-group-item>
                  </b-list-group>
                </b-form>
              </b-col>
              
            </b-row>

            <b-row v-else>
              <b-col>
                <b-list-group v-if="!modifying">
                  <b-list-group-item>{{ name }}</b-list-group-item>
                  <b-list-group-item>{{ email }}</b-list-group-item>
                  <b-list-group-item>{{ activities }}</b-list-group-item>
                  <b-list-group-item
                    ><b-row>
                      <b-col>{{ address }}</b-col>
                      <b-col>{{ postalcode }}</b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        {{ city }}
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ siret }}
                  </b-list-group-item>
                  <b-list-group-item>{{ nbEmployees }} </b-list-group-item>

                  <b-list-group-item v-if="website">
                    {{ website }}
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ phone }}
                  </b-list-group-item>

                  <b-list-group-item>
                    {{ contactName }}
                  </b-list-group-item>
                </b-list-group>

                <b-form v-if="modifying && role == 'Company'">
                  <b-list-group>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.name"
                        placeholder="Name"
                      ></b-form-input>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.email"
                        type="email"
                        placeholder="Email"
                      ></b-form-input>
                    </b-list-group-item>
                    <b-list-group-item
                      ><b-form-input
                        v-model="formData.activities"
                        placeholder="activities"
                      ></b-form-input>
                    </b-list-group-item>

                    <b-list-group-item>
                      <b-row>
                        <b-col
                          ><b-form-input
                            v-model="formData.address"
                            placeholder="Address"
                          ></b-form-input
                        ></b-col>
                        <b-col
                          ><b-form-input
                            v-model="formData.postalCode"
                            placeholder="Postal Code"
                          ></b-form-input
                        ></b-col>
                      </b-row>
                      <b-row
                        ><b-col class="mt-1"
                          ><b-form-input
                            v-model="formData.city"
                            placeholder="City"
                          ></b-form-input></b-col
                      ></b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.siret"
                        placeholder="SIRET"
                      ></b-form-input>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.numberEmployees"
                        type="number"
                        placeholder="Number of employees"
                      ></b-form-input>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.phone"
                        type="tel"
                        placeholder="Phone"
                      ></b-form-input>
                    </b-list-group-item>

                    <b-list-group-item>
                      <b-form-input
                        v-model="formData.contactName"
                        placeholder="Contact Name"
                      ></b-form-input>
                    </b-list-group-item>
                  </b-list-group>
                </b-form>
              </b-col>
            </b-row>

            <b-row v-if="!modifying"
              ><b-button
                size="lg"
                @click="modifying = !modifying"
                variant="dark"
                pill
                block
                class="mt-4 mx-auto"
                >Modify</b-button
              >
            </b-row>

            <b-row v-else>
              <b-button
                @click="modify"
                size="lg"
                variant="success"
                pill
                class="mt-4 mx-auto"
                ><b-icon icon="check"></b-icon
              ></b-button>

              <b-button
                size="lg"
                @click="modifying = !modifying"
                variant="danger"
                pill
                class="mt-4 mx-auto"
                ><b-icon icon="x-circle"> </b-icon
              ></b-button>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { validators } from "../helpers/validator.js";
import axios from "axios";
import { authService } from "../helpers/auth.js";
import router from "../router/index.js";
import Swal from "sweetalert2";
export default {
  data: function() {
    return {
      role: authService.getRole(),
      modifying: false,

      picture: null,
      cv:null,

      firstName: null,
      name: null,
      email: null,
      address: null,
      postalcode: null,
      city: null,
      website: null,
      phone: null,
      activities: null,
      nbEmployees: null,
      contactName: null,
      siret: null,

      formData: {},
      submitted: false,
    };
  },

  methods: {
    async modify() {
      if (validators.validateUpdate(this.formData)) {
        if (this.role == "Company") {
          try {
            await axios.patch(
              "http://localhost:8500/api/company/" +
                authService.currentUserValue.id,
              this.formData
            );

            this.submitted == true;
          } catch (err) {
            this.submitted = false;
            validators.errorValidator(
              err.response.data.message,
              err.response.data.status
            );
            return
          }
          try {
            await axios
              .get(
                "http://localhost:8500/api/company/" +
                  authService.currentUserValue.id
              )
              .then((user) => {
                localStorage.setItem("currentUser", JSON.stringify(user.data));
              });

            this.submitted = true;
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            await axios.patch(
              "http://localhost:8500/api/people/" +
                authService.currentUserValue.id,
              this.formData
            );
          } catch (err) {
            this.submitted = false;
            validators.errorValidator(
              err.response.data.message,
              err.response.data.status
            );
            return
          }
          try {
            await axios
              .get(
                "http://localhost:8500/api/people/" +
                  authService.currentUserValue.id
              )
              .then((user) => {
                localStorage.setItem("currentUser", JSON.stringify(user.data));
              });

            this.submitted = true;
          } catch (err) {
            console.log(err);
          }
        }

        if (this.submitted) {
          Swal.fire({
            title: "Your info was updated",
            icon: "success",
          }).then(function() {
            router.go(router.currentRoute);
          });
        }
      }
    },

    reloadPage() {
      this.$router.go(this.$router.currentRoute);
    },

    populateProfile() {
      if (this.role == "User") {
        this.firstName = authService.currentUserValue.firstName;
        this.name = authService.currentUserValue.name;
        this.email = authService.currentUserValue.email;
        this.address = authService.currentUserValue.address;
        this.postalcode = authService.currentUserValue.postalCode;
        this.city = authService.currentUserValue.city;
        this.website = authService.currentUserValue.website;
        this.phone = authService.currentUserValue.phone;
        this.picture = "http://localhost:8500" + authService.currentUserValue.picture
        this.cv = "http://localhost:8500" + authService.currentUserValue.cv
      } else {
        this.name = authService.currentUserValue.name;
        this.email = authService.currentUserValue.email;
        this.address = authService.currentUserValue.address;
        this.postalcode = authService.currentUserValue.postalCode;
        this.city = authService.currentUserValue.city;
        this.website = authService.currentUserValue.website;
        this.phone = authService.currentUserValue.phone;
        this.activities = authService.currentUserValue.activities;
        this.nbEmployees = authService.currentUserValue.numberEmployees;
        this.contactName = authService.currentUserValue.contactName;
        this.siret = authService.currentUserValue.siret;
      }
    },
  },

  created() {
    
    this.populateProfile();
    console.log(this.picture)
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/profile.scss";
</style>
