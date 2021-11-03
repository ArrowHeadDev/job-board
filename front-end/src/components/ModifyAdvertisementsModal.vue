<template>
  <div>
    <b-modal
      no-stacking
      header-bg-variant="dark"
      header-text-variant="white"
      hide-footer
      id="modifAdsModal"
      centered
      title="Modifying database entry ..."
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
              <b-button class="mx-3" variant="danger">
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
                :placeholder="description"
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
                :placeholder="address"
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
                :placeholder="publishDate"
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
                :placeholder="resume"
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
        }).then(function() {
          router.go(router.currentRoute);
        });
      }
    },
  },

  props: {
    show: null,

    id: {
      required: true,
    },

    title: {
      required: true,
    },

    category: {
      required: true,
    },

    description: {
      required: true,
    },

    address: {
      required: true,
    },

    publishDate: {
      required: true,
    },

    companyId: {
      required: true,
    },

    resume: {
      required: true,
    },

    contratType: {
      required: true,
    },

    wages: {
      required: true,
    },
  },
};
</script>
