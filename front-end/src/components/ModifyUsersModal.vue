<template>
  <div>
    <b-modal
      no-stacking
      header-bg-variant="dark"
      header-text-variant="white"
      hide-footer
      id="modifUsersModal"
      centered
      title="Modifying database entry ..."
    >
      <b-row class="mt-1 mx-auto">
        <b-form @submit.prevent="patchUser" id="formModifyPeople">
          <b-row>
            <b-col>
              <b-button type="submit" class="mx-1" variant="success">
                <b-icon icon="check"></b-icon
              ></b-button>
              <b-button class="mx-3" variant="danger">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="mt-1">
              <label class="mx-2 mt-1" for="input-fname">First Name</label>

              <b-form-input
                id="input-fname"
                v-model="form.firstName"
                :placeholder="firstName"
              ></b-form-input>
            </b-col>
            <b-col class="mt-1">
              <label for="input-name">Name</label>

              <b-form-input
                id="input-name"
                v-model="form.name"
                :placeholder="name"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-email">Email</label>

              <b-form-input
                id="input-email"
                v-model="form.email"
                type="email"
                :placeholder="email"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3" id="address-input-group">
            <b-col>
              <label class="mx-2 mt-1" for="input-address">Address</label>

              <b-form-input
                v-model="form.address"
                id="input-address"
                :placeholder="address"
              ></b-form-input>
            </b-col>
            <b-col>
              <label class="mx-2 mt-1" for="input-postalcode"
                >Postal Code</label
              >

              <b-form-input
                v-model="form.postalCode"
                id="input-postalcode"
                :placeholder="postalCode"
              >
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3 mx-auto">
            <label class="mx-2 mt-1" for="input-city">City</label>

            <b-form-input
              class="mt-1"
              v-model="form.city"
              id="input-city"
              :placeholder="city"
            ></b-form-input>
          </b-row>

          <b-row class="mt-3 mx-auto">
            <label class="mx-2 mt-1" for="input-birthdate">Birth Date</label>

            <b-form-input
              class="mt-1"
              type="date"
              v-model="form.birthDate"
              id="input-birthdate"
              :placeholder="birthDate"
            ></b-form-input>
          </b-row>

          <b-row class="mt-3 mx-auto">
            <label class="mx-2 mt-1" for="input-website">Website</label>

            <b-form-input
              v-model="form.website"
              id="input-website"
              type="url"
              :placeholder="website"
            ></b-form-input>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-phone" class="mx-2 mt-1">Phone Number</label>

              <b-form-input
                id="input-phone"
                v-model="form.phone"
                type="tel"
                :placeholder="phone"
              >
              </b-form-input>
            </b-col>

            <b-col>
              <label for="select-gender" class="mx-2 mt-1">
                Gender
              </label>

              <b-form-select v-model="form.gender" id="select-gender">
              </b-form-select>
            </b-col>
          </b-row>

          <b-row class="mt-3 mx-auto">
            <b-col>
              <label class="mt-1 mx-3" for="input-cv">CV</label>
            </b-col>
            <b-col>
              <label class="mt-1 mx-3" for="input-picture">Picture</label>
            </b-col>
          </b-row>
        </b-form>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import router from "../router/index.js";
import axios from "axios";
import { validators } from "../helpers/validator.js";
export default {
  data: function() {
    return {
      form: {},
    };
  },

  methods: {
    async patchUser() {
      if (validators.validateUpdate(this.form)) {
        try {
          await axios
            .patch("http://localhost:8500/api/people/" + this.id, this.form)
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
            title: "User successfully updated",
          }).then(function() {
            router.go(router.currentRoute);
          });
        }
      }
    },
  },

  props: {
    id: {
      required: true,
    },

    name: {
      required: true,
    },

    firstName: {
      required: true,
    },

    email: {
      required: true,
    },

    address: {
      required: true,
    },

    postalCode: {
      required: true,
    },

    city: {
      required: true,
    },

    birthDate: {
      required: true,
    },
    cv: {},

    website: {},

    picture: {},

    phone: {
      required: true,
    },

    gender: {
      required: true,
    },
  },
};
</script>
