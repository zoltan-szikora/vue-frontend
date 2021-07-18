<template>
  <div class="container my-3 pb-5" v-if="user">
    <div class="pt-3">
      <h1 class="display-5 fw-bold"><font-awesome-icon icon="user" class="me-1" />Profile</h1>
      <hr class="my-4">
    </div>

    <div class="px-4">
      <h2 class="col-md-8 fs-1"><strong>My profile </strong></h2>
      <div class="row fs-3">
        <div class="col-12 col-md-6"><strong>First name: </strong><span>{{ user.firstName }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Last name: </strong><span>{{ user.lastName }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Username: </strong><span>{{ user.username }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Date of birth: </strong><span>{{ user.dateOfBirth }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>E-mail: </strong><span>{{ user.email }}</span><br/></div>
        <div class="col-12 col-md-6"><strong>Activated: </strong><span>{{ user.activation }}</span><br/></div>
      </div>
    </div>
  </div>
</template>

<script>
import vuex from "vuex";

export default {
  computed: {
    ...vuex.mapGetters(["user"])
  }
}
</script>

<style>
</style>
