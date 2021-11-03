<template>
  <div>
    <b-container>
      <h1 class="text-center">Login</h1>
      <b-card id="form" style="max-width:50rem;" class="mx-auto">
        <b-card-body>
          <b-form @submit.prevent="submit" id="formlogin">
            <b-row class="mt-1">
              <b-checkbox
                v-model="isCompany"
                id="isCompany"
                size="lg"
                switch
              >
                <b>I'm a company</b></b-checkbox
              >
            </b-row>
            <b-form-group
              id="email-input-group"
              label="Email"
              label-for="input-email"
            >
              <b-form-input
                id="input-email"
                v-model="formData.email"
                placeholder="Email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mt-3" id="pwd-input-group" label="Password">
              <b-form-input
                id="input-pwd"
                v-model="formData.password"
                type="password"
                placeholder="Password"
                aria-describedby="password-help-block"
                required
              ></b-form-input>
            </b-form-group>
            <div class="mt-3 ">
              <b-button type="submit" id="b-login" size="lg" pill variant="dark"
                >Login</b-button
              >
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>

import { authService } from "../helpers/auth.js";
import { router } from "../router/index.js";

export default {
  data: function() {
    return {
      isCompany : false,
      formData: {}
    };
  },

  created() {
    if (authService.currentUserValue) {
      return router.push("/");
    }
  },

  methods: {
    submit() {
      authService.login(this.formData,this.isCompany)
      .then(
        //this.user => router.push(this.returnUrl),
        error => {
          this.error = error
        }
      )
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/login.scss";
</style>
