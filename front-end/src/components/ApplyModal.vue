<template>
  <div class="apply mt-3" v-if="show">
    <b-button
      @click="showModal = !showModal"
      modal-center
      block
      pill
      variant="primary"
    >
      Apply
    </b-button>

    <b-modal
    header-bg-variant="dark"
      header-text-variant="white"
      v-model="showModal"
      hide-footer
      id="applyModal"
      centered
      title="Enter required information to apply."
    >
      <b-form v-if="!isLogged" @submit.prevent="apply" class="applyForm">
        <b-row>
          <b-col class="mt-1">
            <label for="input-fname">First Name</label>
            <b-form-input
              id="input-fname"
              v-model="formData.firstName"
              placeholder="First name"
              required
            ></b-form-input>
          </b-col>
          <b-col class="mt-1">
            <label for="input-name">Name</label>
            <b-form-input
              id="input-name"
              v-model="formData.name"
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
              v-model="formData.email"
              type="email"
              placeholder="Your email"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-3" id="address-input-group">
          <b-col>
            <label for="input-address">Address</label>
            <b-form-input
              v-model="formData.address"
              id="input-address"
              placeholder="Address"
              required
            ></b-form-input>
          </b-col>
          <b-col>
            <label for="input-postalcode">Postal Code</label>
            <b-form-input
              v-model="formData.postalCode"
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
            v-model="formData.city"
            id="input-city"
            placeholder="City"
            required
          ></b-form-input>
        </b-row>

        <b-row class="mt-3 mx-auto">
          <label for="input-birthdate">Birth Date</label>
          <b-form-input
            type="date"
            v-model="formData.birthDate"
            id="input-birthdate"
            required
          ></b-form-input>
        </b-row>

        <b-row class="mt-3 mx-auto">
          <label for="input-website">Your website</label>
          <b-form-input
            v-model="formData.website"
            id="input-website"
            type="url"
            placeholder="www.mywebsite.com"
          ></b-form-input>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <label for="input-phone">Phone Number</label>
            <b-form-input
              id="input-phone"
              v-model="formData.phone"
              type="tel"
              placeholder="+0000000"
              required
            >
            </b-form-input>
          </b-col>

          <b-col>
            <label for="select-gender"> Gender </label>
            <b-form-select
              v-model="formData.gender"
              :options="options"
              id="select-gender"
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
            :state="Boolean(files)"
          >
          </b-form-file>
          <label for="pp-input">Profile Picture </label>
          <b-form-file
            name="pp-input"
            @change="selectFile($event)"
            enctype="multipart/form-data"
            ref="file"
            :state="Boolean(files)"
          >
          </b-form-file>
        </b-form>

        <b-row class="mt-3 mx-auto">
          <label for="motivation"> Motivation letter </label>
          <b-form-textarea
            id="motivation"
            v-model="applicationData.peopleLetter"
            placeholder="Enter a motivation letter for the recruter"
            row="3"
            max-rows="6"
            required
          >
          </b-form-textarea>
        </b-row>
        <div class="mt-3 submit">
          <b-button id="b-submit" size="lg" pill variant="dark" type="submit"
            >Submit</b-button
          >
        </div>
      </b-form>

      <b-form v-else @submit.prevent="applyPost(getId())" class="applyForm">
        <b-row> </b-row>
        <b-form-textarea
          id="motivation"
          v-model="applicationData.peopleLetter"
          placeholder="Enter a motivation letter for the recruter"
          row="3"
          max-rows="6"
          required
        >
        </b-form-textarea>

        <div class="mt-3 submit">
          <b-button id="b-submit" size="lg" pill variant="dark" type="submit"
            >Submit</b-button
          >
        </div>
      </b-form>
    </b-modal>
  </div>
</template>
<style lang="scss">
.submit {
  text-align: center;
}
</style>
<script>
import axios from "axios";
import swal from "sweetalert2";
import { validators } from "../helpers/validator.js";

import { authService } from "../helpers/auth";
export default {
  data: function () {
    return {
      error: false,
      message: "",
      files: [],

      props: {
        isLogged: {},
      },
      showModal: false,
      formData: {
        role: "Secret",
      },
      applicationData: {
        advertisementId: this.adId.toString(),
        peopleLetter: null,
        peopleId: null,
      },
      submitted: false,
      options: [
        {
          value: null,
          text: "Please select an option",
        },
        {
          value: "male",
          text: "Male",
        },
        {
          value: "female",
          text: "Female",
        },
      ],
    };
  },
  computed: {
    isLogged() {
      return this.checkLogin();
    },
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
            this.formData.cv = res.data.filePath1;
            this.formData.picture = res.data.filePath2
          });
        this.message = "Files has been uploaded";
        this.file = "";
        this.error = true;
      } catch (error) {
        this.message = "Something went wrong";
        this.error = true;
      }
    },

    getId() {
      if (this.checkLogin()) {
        return (this.applicationData.peopleId =
          authService.currentUserValue.id);
      }
    },

    checkLogin() {
      if (authService.currentUserValue === null) {
        return false;
      } else {
        return true;
      }
    },

    async apply() {
      try {
        this.sendFile();
      } catch (err) {
        console.log(err);
      }

      if (validators.validateForm(this.formData)) {
        try {
          await axios
            .post("http://localhost:8500/api/people/register", this.formData)
            .then((res) => {
              console.log(res.data.userId);
              this.applyPost(res.data.userId.toString());
            });
        } catch (err) {
          validators.errorValidator(
            err.response.data.message,
            err.response.data.status
          );
        }
      }
    },

    async applyPost(id) {
      this.applicationData.peopleId = id;
      try {
        await axios
          .post("http://localhost:8500/api/jobApp", this.applicationData)
          .then((this.submitted = true));
      } catch (err) {
        console.log(err);
      }

      if (this.submitted == true) {
        this.CloseModal();
      }
    },

    CloseModal() {
      this.showModal = false;
      swal.fire({
        title: "You successfully applied to this job offer",
        icon: "success",
      });
    },
  },

  props: {
    adId: null,
    show: {
      type: Boolean,
    },
  },
};
</script>
