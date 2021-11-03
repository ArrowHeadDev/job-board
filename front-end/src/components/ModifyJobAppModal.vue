<template>
  <div>
    <b-modal
      no-stacking
      header-bg-variant="dark"
      header-text-variant="white"
      v-model="show"
      hide-footer
      id="modifJobAppModal"
      centered
      title="Modifying database entry ..."
    >
      <b-row>
        <b-col>
          <b-button class="mx-1" variant="success">
            <b-icon icon="check"></b-icon
          ></b-button>
          <b-button class="mx-3" variant="danger">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </b-col>
      </b-row>

      <b-row class="mt-1 mx-auto">
        <b-form id="formModifyCompany">
          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-adsId"
                >Advertisement ID</label
              >
              <b-form-input
                type="number"
                id="input-adsId"
                v-model="form.advertisementId"
                :placeholder="advertisementId"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-peopleID">People ID</label>

              <b-form-input
                type="number"
                id="input-peopleId"
                v-model="form.peopleId"
                :placeholder="peopleId"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <label class="mx-2 mt-1" for="input-peopleLetter"
                >People Letter</label
              >

              <b-form-input
                type="text-area"
                id="input-peopleLetter"
                v-model="form.peopleLetter"
                :placeholder="peopleLetter"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-form>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },

  props: {
    show: null,

    advertisementId: {
      required: true,
    },

    peopleId: {
      required: true,
    },

    peopleLetter: {
      required: true,
    },
  },
};
</script>
