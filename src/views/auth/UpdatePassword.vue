<template>
  <div class="container my-3 pb-5">
    <div class="pt-3">
      <h1 class="display-5 fw-bold"><font-awesome-icon icon="user-shield" class="me-1" />Change password</h1>
      <hr class="my-4">
    </div>
    <div v-if="success" class="alert alert-success rounded-0">Your password successfully updated!</div>
    <div v-if="errorMessage" class="alert alert-danger rounded-0" role="alert">{{ errorMessage }}</div>

    <div v-if="!success" class="px-4">
      <h2 class="col-md-8 fs-4">Change your password</h2>

      <form name="update" ref="form" @submit.prevent="submitUpdatedData" class="row g-3" accept-charset="utf-8">
        <div class="mx-auto border form-bg px-5 py-3">

          <div class="mb-3">
            <label for="oldPassword">Current Password</label>
            <input type="password" class="form-control" :class="{ invalid: passwordValidity === 'invalid' }" name="oldPassword" v-model.trim="currentPassword" placeholder="Current Password" required>
            <span class="invalid-feedback">Password is required!</span>
            <span class="err-msg" v-if="passwordValidity == 'invalid'">Your password is invalid!</span>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="password">New password</label>
              <input type="password" class="form-control" :class="{ invalid: newPasswordValidity === 'invalid' }" name="password" v-model.trim="newPassword" placeholder="New password"
                :title="passwordPattern" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}" required>
              <span class="invalid-feedback">New password is required!</span>
              <span class="err-msg" v-if="newPasswordValidity == 'invalid'">Your new password cannot be same as old password!</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="confirmPassword">Repeat new password</label>
              <input type="password" class="form-control" :class="{ invalid: confirmPasswordValidity === 'invalid' }" name="confirmPassword" v-model.trim="confirmPassword"
                placeholder="Confirm password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}" required>
              <span class="invalid-feedback">Confirm password is required!</span>
              <span class="err-msg" v-if="confirmPasswordValidity == 'invalid'">The password fields must match!</span>
            </div>
          </div>

          <div class="d-grid gap-2 col-4 mx-auto">
            <button class="btn btn-teal shadow-none my-3" @click="submitted = true" :disabled="loading">Submit</button>
          </div>

        </div>
      </form>

    </div>
  </div>
</template>

<script>
import vuex from "vuex";
import UserService from "@/services/user.service";
import bcrypt from 'bcryptjs';

export default {
  data() {
    return {
      salt: bcrypt.genSaltSync(10),
      hash: "",
      passwordValidity: "pending",
      confirmPasswordValidity: "pending",
      newPasswordValidity: "pending",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
      success: false,
      errorMessage: "",
      passwordPattern: ""
    }
  },
  computed: {
    ...vuex.mapGetters(["user"])
  },
  methods: {
    ...vuex.mapActions(["updateUser"]),
    submitUpdatedData() {
      this.loading = true;
      if (
        !this.currentPassword ||
        !this.newPassword ||
        !this.confirmPassword
      )  return;

      //if newPassword and confirmPassword not equals
      if(this.newPassword != this.confirmPassword){
        this.confirmPasswordValidity = "invalid";
        this.loading = false;
        return;
      } else this.confirmPasswordValidity = "valid";

      //currentPassword invalid
      if (this.currentPassword == this.user.password || bcrypt.compareSync(this.currentPassword, this.user.password)) {
        this.passwordValidity = "valid";
      } else {
        this.passwordValidity = "invalid";
        this.currentPassword =""
        this.loading = false;
        return;
      }

      //newPassword and currentPassword equals
      if (this.currentPassword == this.newPassword) {
        this.newPasswordValidity = "invalid";
        this.loading = false;
        return;
      }

      this.hash = bcrypt.hashSync(this.newPassword, this.salt);

      UserService.updatePassword(this.user, this.currentPassword, this.hash)
      .then(
        (response) => {
          response.data.password = this.newPassword;
          const u = response.data;
          this.updateUser(u);
          this.success = true;
          this.errorMessage = "";
          this.$swal({
            icon: 'success',
            title:'Password Changed!',
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
    this.passwordPattern = process.env.VUE_APP_PASSWORD_PATTERN;
  }
}
</script>

<style>
</style>
