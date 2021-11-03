<template>
  <div>
    <b-modal
      no-stacking
      header-bg-variant="dark"
      header-text-variant="white"
      hide-footer
      id="modifCompaniesModal"
      centered
      title="Modifying database entry ..."
    >
      <b-row class="mt-1 mx-auto">
        <b-form @submit.prevent="updateCompany" id="formModifyCompany">
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

          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-name">Name</label>

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

          <b-row class="mt-3 ">
            <b-col>
              <label class="mx-2 mt-1" for="input-city">City</label>

              <b-form-input
                class="mt-1"
                v-model="form.city"
                id="input-city"
                :placeholder="city"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-website">Website</label>

              <b-form-input
                v-model="form.website"
                id="input-website"
                type="url"
                :placeholder="website"
              ></b-form-input>
            </b-col>
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
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-activities">Activities</label>

              <b-form-input
                id="input-activities"
                v-model="form.activities"
                :placeholder="activities"
              >
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-siret">SIRET</label>

              <b-form-input
                id="input-siret"
                v-model="form.siret"
                :placeholder="siret"
              >
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-nb">Number of employees</label>

              <b-form-input
                id="input-nb"
                type="number"
                v-model="form.numberEmployees"
                :placeholder="numberEmployees"
              >
              </b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label for="input-contact">
                Contact name
              </label>

              <b-form-input
                id="input-contact"
                v-model="form.contactName"
                :placeholder="contactName"
              >
              </b-form-input>
            </b-col>
          </b-row>
        </b-form>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { validators } from "../helpers/validator.js";
import router from "../router/index.js";
export default {
  data: function() {
    return {
      form: {},
    };
  },

  methods: {
    async updateCompany() {
      if (validators.validateUpdate(this.form)) {
        try {
          await axios
            .patch("http://localhost:8500/api/company/" + this.id, this.form)
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
            title: "Company successfully updated",
          }).then(function() {
            router.go(router.currentRoute);
          });
        }
      }
    },
  },
  props: {
    showing: null,

    id: {
      required: true,
    },

    name: {
      required: true,
    },

    email: {
      required: true,
    },

    activities: {
      required: true,
    },

    siret: {
      required: true,
    },

    numberEmployees: {
      required: true,
    },

    contactName: {
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

    website: {},

    picture: {},

    phone: {
      required: true,
    },
  },
};
</script>
