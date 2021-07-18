<template>
  <div class="container my-3 pb-5 content">
    <div class="pt-3">
      <h1 class="display-5 fw-bold"><font-awesome-icon icon="user-cog" class="me-1" />User Details</h1>
      <hr class="my-4">
    </div>

    <div class="px-4">
      <div v-if="errorMessage" class="alert alert-danger rounded-0" role="alert">{{ errorMessage }}</div>
      <p class="col-md-8 fs-1"><strong>ID: </strong> <span>{{ $route.params.id }}</span></p>

      <div class="row fs-3">
        <div class="col-12 col-md-6"><strong>First name: </strong><span>{{ selectedUser.firstName }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Last name: </strong><span>{{ selectedUser.lastName }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Date of birth: </strong><span>{{ selectedUser.dateOfBirth }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Username: </strong><span>{{ selectedUser.username }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>E-mail: </strong><span>{{ selectedUser.email }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Status: </strong><span>{{ selectedUser.status }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Role(s): </strong><span v-for="(role, index) in selectedUser.roles" :key="index">{{ role.role }}&nbsp;</span><br/></div>
        <div class="col-12 col-md-6"><strong>Profile activated: </strong><span>{{ selectedUser.activation }}</span><br/></div>
      </div>

      <router-link :to="{ name: `users` }" class="btn btn-teal my-2"><font-awesome-icon icon="arrow-left" class="me-1" />Back</router-link>
    </div>

  </div>
</template>

<script>
import AdminService from "@/services/admin.service";

export default {
  data() {
    return {
      errorMessage: "",
      selectedUser: ""
    }
  },
  mounted () {
    AdminService.getUserDetails(this.$route.params.id).then(response => {
      this.selectedUser = response.data;
    },
    error => {
      if (!error.response) {
        this.errorMessage =
          "Unexpected error: " +
          ((error && error.errorMessage) || error);
      } else {
        this.errorMessage =
          "Error: " + error.response.data.errors[0].defaultMessage;
      }
    });

  },
}
</script>

<style>

</style>
