<template>
  <div class="container my-3 pb-5" v-if="user">
    <div class="pt-3">
      <h1 class="display-5 fw-bold"><font-awesome-icon icon="user-edit" class="me-1" />Edit Profile</h1>
      <hr class="my-4">
    </div>
    <div class="px-4">
      <div v-if="success" class="alert alert-success rounded-0">Your profile information updated successfully!</div>
      <div v-if="errorMessage" class="alert alert-danger rounded-0" role="alert">{{ errorMessage }}</div>

      <div v-if="!success" >
        <h2 class="col-md-8 fs-4">Edit your personal info</h2>
        <form name="update" @submit.prevent="submitUpdatedData" class="row g-3" accept-charset="utf-8">
          <div class="mx-auto border form-bg px-5 py-3">

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" name="firstName" v-model.trim="updatedUser.firstName" placeholder="First name" :title="firstNamePattern"
                  minlength="2" maxlength="20" pattern="[A-Za-záéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ]{2,20}" required>
                <span class="invalid-feedback">First name is invalid!</span>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" name="lastName" v-model.trim="updatedUser.lastName" placeholder="Last name" :title="lastNamePattern"
                  minlength="2" maxlength="20" pattern="[A-Za-záéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ]{2,20}" required>
                <span class="invalid-feedback">Last name is invalid!</span>
              </div>
            </div>

            <div class="mb-3">
              <label for="dateOfBirth">Date of birth</label>
              <input type="date" class="form-control" name="dateOfBirth" v-model="updatedUser.dateOfBirth"
                min="1900-01-01" :max="getCurrentDate" required>
              <span class="invalid-feedback">Date of birth is required!</span>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="username">Username</label>
                <input type="text" class="form-control" name="username" v-model.trim="updatedUser.username" readonly>
              </div>
              <div class="col-md-6 mb-3">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" name="email" v-model.trim="updatedUser.email" placeholder="E-mail" required>
                <span class="invalid-feedback">E-mail is required!</span>
              </div>
            </div>

            <div class="mb-3">
              <label for="password">Password</label>
              <input type="password" class="form-control" :class="{ invalid: passwordValidity === 'invalid' }" name="password" v-model.trim="currentPassword" placeholder="Password" required>
              <span class="invalid-feedback">Password is required!</span>
              <span class="err-msg" v-if="passwordValidity == 'invalid'">Your password is invalid!</span>
            </div>

            <div class="d-grid gap-2 col-4 mx-auto">
              <button class="btn btn-teal shadow-none my-3" @click="submitted = true" :disabled="loading">Submit</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
import vuex from "vuex";
import bcrypt from 'bcryptjs';

export default {
  data() {
    return {
      salt: bcrypt.genSaltSync(10),
      currentPassword: "",
      passwordValidity: "pending",
      updatedUser: { ...this.user },
      success: false,
      loading: false,
      submitted: false,
      errorMessage: "",
      currentDate:"",
      firstNamePattern: '',
      lastNamePattern: '',
      passwordPattern: ''
    }
  },
  props: {
    user: {
      type: Object,
    }
  },
  computed: {
    ...vuex.mapGetters(["getCurrentDate"])
  },
  methods: {
    ...vuex.mapActions(["updateUser"]),
    submitUpdatedData() {
      this.loading = true;
      if (
        !this.updatedUser.firstName ||
        !this.updatedUser.lastName ||
        !this.updatedUser.dateOfBirth ||
        !this.updatedUser.email ||
        !this.updatedUser.username ||
        !this.currentPassword
      )  return;

      if (this.currentPassword == this.user.password || bcrypt.compareSync(this.currentPassword, this.user.password)) {
        this.passwordValidity = "valid";
        this.updatedUser.password = this.currentPassword;
      } else {
        this.loading = false;
        this.passwordValidity = "invalid";
        return;
      }

      UserService.update(this.updatedUser)
      .then(
        (response) => {
          response.data.password = this.currentPassword;
          this.currentPassword ="";
          const u = response.data;
          this.updateUser(u);
          this.success = true;
          this.errorMessage = "";
          this.$swal({
            icon: 'success',
            title:'Ok!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          if (!error.response) {
            this.errorMessage =
              "Unexpected error: " +
              ((error && error.errorMessage) || error);
          } else if (error.response.status === 401) {
            this.errorMessage = "Password is not valid!";
          } else if (error.response.status === 406) {
            this.errorMessage = "E-mail is already registered!";
          }
          else {
            this.errorMessage =
              "Error: " + error.response.data.errors[0].defaultMessage;
          }
        }
      )
      .then(() => {
        this.loading = false;
      });
    }
  },
  mounted () {
    this.firstNamePattern = process.env.VUE_APP_FIRSTNAME_PATTERN;
    this.lastNamePattern = process.env.VUE_APP_LASTNAME_PATTERN;
    this.passwordPattern = process.env.VUE_APP_PASSWORD_PATTERN;
  }
}
</script>

<style>
</style>
