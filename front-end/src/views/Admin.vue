<template>
  <div>
    <h1 class="text-center">Admin Control Panel</h1>

    <b-container fluid>
      <b-card bg-variant="dark">
        <template #header>
          <b-button class="mx-2" @click="$bvModal.show('createModal')" >
            <b-icon icon="plus"></b-icon>
          </b-button>
          <b-button class="delete" @click="confirmDelete" variant="danger" >
            <b-icon icon="trash"></b-icon>
          </b-button>
          <span class="mx-3 text-white">Selected rows Id's : 
            <span :key="selectedRows.length" v-for="selectedRows in selectedRows">{{selectedRows.id}},</span></span>
        </template>
        <b-card-body class="text-white">
          <b-tabs content card-header fill>
            <b-tab title="Users" @click="currentTable = 'people'">
              <b-table
                ref="tableUsers"
                selectable
                select-mode="multi"
                responsive
                dark
                striped
                @row-selected="onRowSelected"
                hover
                :fields="usersFields"
                :items="users"
              >
                <template #cell(select)="data">
                  <b-button size="sm" @click="displayUserModal(data.item)">
                    <b-icon icon="brush"></b-icon>
                  </b-button>
                </template>
              </b-table>
            </b-tab>

            <b-tab title="Companies" @click="currentTable = 'company'">
              <b-table
                ref="tableCompanies"
                selectable
                select-mode="multi"
                responsive
                dark
                striped
                hover
                :fields="companiesFields"
                :items="companies"
                @row-selected="onRowSelected"
              >
                <template #cell(select)="data">
                  <b-button size="sm" @click="displayCompanyModal(data.item)">
                    <b-icon icon="brush"></b-icon>
                  </b-button>
                </template>
              </b-table>
            </b-tab>

            <b-tab title="Advertisements" @click="currentTable = 'advertisement'">
              <b-table
                ref="tableAdvertisements"
                selectable
                select-mode="multi"
                responsive
                dark
                hover
                :fields="adsFields"
                :items="advertisements"
                @row-selected="onRowSelected"
              >
                <template #cell(select)="data">
                  <b-button size="sm" @click="displayAdsModal(data.item)">
                    <b-icon icon="brush"></b-icon>
                  </b-button>
                </template>
              </b-table>
            </b-tab>

            <b-tab title="Job Aplications" @click="currentTable = 'jobApp'">
              <b-table
                ref="tableJobApp"
                selectable
                select-mode="multi"
                responsive
                dark
                striped
                hover
                :fields="jobAppFields"
                :items="jobApplications"
                @row-selected="onRowSelected"
              >
                <template #cell(select)="data">
                  <b-button size="sm" @click="displayJobAppModal(data.item)">
                    <b-icon icon="brush"></b-icon>
                  </b-button>
                </template>
              </b-table>
            </b-tab>
          </b-tabs>
        </b-card-body>
      </b-card>
    </b-container>


    <ModifyUsersModal
      :id="selectedRow.id"
      :name="selectedRow.name"
      :firstName="selectedRow.firstName"
      :email="selectedRow.email"
      :address="selectedRow.address"
      :city="selectedRow.city"
      :website="selectedRow.website"
      :phone="selectedRow.phone"
      :gender="selectedRow.gender"
      :postalCode="selectedRow.postalCode"
      :birthDate="selectedRow.birthDate"
    ></ModifyUsersModal>

    <ModifyCompaniesModal
      :id="selectedRow.id"
      :show="showCompaniesModal"
      :name="selectedRow.name"
      :email="selectedRow.email"
      :activities="selectedRow.activities"
      :siret="selectedRow.siret"
      :numberEmployees="selectedRow.numberEmployees"
      :contactName="selectedRow.contactName"
      :address="selectedRow.address"
      :postalCode="selectedRow.postalCode"
      :city="selectedRow.city"
      :website="selectedRow.website"
      :phone="selectedRow.phone"
    ></ModifyCompaniesModal>

    <ModifyAdvertisementsModal
      :id="selectedRow.id"
      :show="showAdsModal"
      :title="selectedRow.title"
      :category="selectedRow.category"
      :description="selectedRow.description"
      :address="selectedRow.address"
      :publishDate="selectedRow.publishDate"
      :companyId="selectedRow.companyId"
      :resume="selectedRow.resume"
      :contratType="selectedRow.contratType"
      :wages="selectedRow.wages"
    ></ModifyAdvertisementsModal>

    <ModifyJobAppModal
      :show="showJobAppModal"
      :advertisementId="selectedRow.advertisementId"
      :peopleId="selectedRow.peopleId"
      :peopleLetter="selectedRow.peopleLetter"
    >
    </ModifyJobAppModal>


  <CreateEntryModal></CreateEntryModal>

  </div>
</template>

<script>
import axios from "axios";
//axios.defaults.withCredentials = true

import router from '../router/index.js'
import Swal from 'sweetalert2'
import CreateEntryModal from '../components/CreateEntryModal.vue'
import ModifyUsersModal from "../components/ModifyUsersModal.vue";
import ModifyAdvertisementsModal from "../components/ModifyAdvertisementsModal.vue";
import ModifyCompaniesModal from "../components/ModifyCompaniesModal.vue";
import ModifyJobAppModal from "../components/ModifyJobAppModal.vue";
//import { mutations } from "../store/store.js";
export default {
  data() {
    return {

      //default tab
      currentTable:'people',


      //Field definitions

      usersFields: [
        "select",
        "id",
        "name",
        "firstName",
        "email",
        "address",
        "postalCode",
        "city",
        "birthDate",
        "cv",
        "website",
        "picture",
        "isAdmin",
        "phone",
        "gender",
        "role",
      ],

      companiesFields: [
        "select",
        "id",
        "name",
        "activities",
        "address",
        "postalCode",
        "city",
        "siret",
        "numberEmployees",
        "website",
        "phone",
        "contactName",
        "role",
      ],

      adsFields: [
        "select",
        "id",
        "title",
        "category",
        "description",
        "address",
        "publishDate",
        "companyId",
        "resume",
        "contratType",
        "wages",
      ],

      jobAppFields: ["select", "id", "advertisementId", "peopleLetter"],

      //Current Selected Row
      selectedRow: {},

      //Selected Rows
      selectedRows: [],

      showCreateModal:false,
      showUsersModal: false,
      showCompaniesModal: false,
      showAdsModal: false,
      showJobAppModal: false,
      users: [],
      companies: [],

      advertisements: [],

      jobApplications: [],
    };
  },

  components: {
    ModifyUsersModal: ModifyUsersModal,
    ModifyCompaniesModal: ModifyCompaniesModal,
    ModifyAdvertisementsModal: ModifyAdvertisementsModal,
    ModifyJobAppModal: ModifyJobAppModal,
    CreateEntryModal: CreateEntryModal,
  },

  created() {
    this.getAllUsers();
    this.getAllCompanies();
    this.getAllAds();
    this.getAllJobApps();
  },

  methods: {
    

    //Display confirmation to delete
    confirmDelete(){
      if(this.selectedRows.length){
         Swal.fire({
        title:"Are you sure you want to delete this data?",
        text:"You won't be able to come back and recover it!",
        icon:"warning",
        showCancelButton: true,
        cancelButtonColor:'grey',
        confirmButtonText:"Yes",
        confirmButtonColor:'red'

      }).then((result) => {

        if(result.isConfirmed){
          this.deleteData(this.currentTable)
        }
      })
      }else{
         Swal.fire({
        
        title:"Nothing to delete",
        icon:"error",
        

      })
      }
     
    },


    async deleteData(currentTable){
      try{

        for (let i = 0; i < this.selectedRows.length ; i++) {
        await axios
        .delete("http://localhost:8500/api/" + currentTable + "/" + this.selectedRows[i].id)
        .then((this.success = true) )
        }
      
      }catch(err){
        this.success = false
        Swal.fire({
          title:"Failed to delete rows",
          text:err.response.data.message,
          icon:"error"
        })
      }


      if(this.success == true){
        this.reloadData()
        Swal.fire({
          text:"Data deleted succesfully",
          icon:"success"
        }).then(function() {
          router.go(router.currentRoute)})
      }else{
        console.log("fail")
      }

    },

    reloadData(){
      this.getAllUsers()
      this.getAllCompanies()
      this.getAllAds()
      this.getAllJobApps()
    },

    onRowSelected(items) {
      this.selectedRows = items;
      
    },

    clearSelectedRows() {
      this.$refs.tableUsers.clearSelected();
      this.$refs.tableCompanies.clearSelected();
      this.$refs.tableAdvertisements.clearSelected();
      this.$refs.tableJobApp.clearSelected();
    },



    displayCreateModal() {
      this.$bvModal.show()
    },

    displayUserModal(e) {
      
      this.clearSelectedRows();

      
      this.$bvModal.show('modifUsersModal')
     
      
      //Show modal and append data to selectedRow
      this.selectedRow = e;

      //this.clearSelectedRow();
    },

    displayCompanyModal(e) {
      this.clearSelectedRows();

      this.$bvModal.show('modifCompaniesModal')

      this.selectedRow = e;
    },

    displayAdsModal(e) {
      this.clearSelectedRows();
      this.$bvModal.show('modifAdsModal')
      this.selectedRow = e;
    },

    displayJobAppModal(e) {
      this.clearSelectedRows();
     this.$bvModal.show('modifJobAppModal')
      this.selectedRow = e;
    },

    async getAllUsers() {
      try {
        await axios
          .get("http://localhost:8500/api/people/")
          .then((response) => {
            let data = response.data;
            for (let key in data) {
              this.users.push(data[key]);
            }
            return this.users;
          });
      } catch (err) {
        console.log(err);
      }
    },

    async getAllCompanies() {
      try {
        await axios
          .get("http://localhost:8500/api/company/")
          .then((response) => {
            let data = response.data;
            for (let key in data) {
              this.companies.push(data[key]);
            }
            return this.companies;
          });
      } catch (err) {
        console.log(err);
      }
    },

    async getAllAds() {
      try {
        await axios
          .get("http://localhost:8500/api/advertisement/")
          .then((response) => {
            let data = response.data;
            for (let key in data) {
              this.advertisements.push(data[key]);
            }
            return this.advertisements;
          });
      } catch (err) {
        console.log(err);
      }
    },

    async getAllJobApps() {
      try {
        await axios
          .get("http://localhost:8500/api/jobApp/")
          .then((response) => {
            let data = response.data;
            for (let key in data) {
              this.jobApplications.push(data[key]);
            }
            return this.jobApplications;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
