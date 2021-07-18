<template>
<div>
  <div class="container my-5 content">
    <form name="registration" @submit.prevent="handleRegister" :class="submitted ? 'was-validated' : ''" class="row g-3" accept-charset="utf-8">
      <div class="col-md-6 mx-auto border px-3 py-3 shadow form-bg">
        <div class="text-center my-3 fs-1 text-light"><font-awesome-icon icon="user-plus" class="me-1" />Registration</div>
        <div v-if="success" class="alert alert-success rounded-0">Registration successful</div>
        <div v-if="errorMessage" class="alert alert-danger rounded-0" role="alert">{{ errorMessage }}</div>

        <div v-if="!success">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input type="text" class="form-control" name="firstName" v-model="formData.firstName" placeholder="First name" :title="firstNamePattern"
                minlength="2" maxlength="20" pattern="[A-Za-záéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ]{2,20}" required>
              <span class="invalid-feedback">First name is invalid!</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input type="text" class="form-control" name="lastName" v-model="formData.lastName" placeholder="Last name" :title="lastNamePattern"
                minlength="2" maxlength="20" pattern="[A-Za-záéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ]{2,20}" required>
              <span class="invalid-feedback">Last name is invalid!</span>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input type="date" class="form-control" name="dateOfBirth" v-model="formData.dateOfBirth" placeholder="Date of birth"
              min="1900-01-01" :max="currentDate" required>
            <label for="dateOfBirth">Date of birth</label>
            <span class="invalid-feedback">Date of birth is required!</span>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="username">Username</label>
              <input type="text" class="form-control" name="username" v-model="formData.username" placeholder="Username" :title="usernamePattern"
                minlength="3" maxlength="16" pattern="[A-Za-z0-9_-]{3,16}" required>
              <span class="invalid-feedback">Username is invalid!</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email">E-mail</label>
              <input type="email" class="form-control" name="email" v-model="formData.email" placeholder="E-mail" required>
              <span class="invalid-feedback">E-mail is required!</span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password" v-model="formData.password" placeholder="Password" :title="passwordPattern"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}" required>
              <span class="invalid-feedback">Password is required!</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="confirmPassword">Confirm password</label>
              <input type="password" class="form-control" name="confirmPassword" v-model="formData.confirmPassword" placeholder="Confirm password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}" required>
              <span class="invalid-feedback">Confirm password is required!</span>
            </div>
          </div>

          <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-teal shadow-none my-3" @click="submitted = true" :disabled="loading">
              Submit
            </button>
          </div>
        </div>

        <hr class="my-4">
        <div class="text-center mb-3 mx-auto">
          <span th:text="#{label.page.haveAcc}">Have an account? </span>
          <router-link :to="{ name: `login` }" class="link-light"><font-awesome-icon icon="sign-in-alt" class="me-1" />Login</router-link>
        </div>

      </div>
    </form>
  </div>
  <the-footer />
</div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";
import User from "../models/user";
import UserService from "../services/user.service";

export default {
  data() {
    return {
      formData: new User("", "", "", "", "", "", ""),
      success: false,
      loading: false,
      submitted: false,
      errorMessage: "",
      currentDate:"",
      firstNamePattern: '',
      lastNamePattern: '',
      usernamePattern: '',
      passwordPattern: ''
    }
  },
  components: {
    TheFooter
  },
  methods: {
    date_function: function () {
      this.currentDate = new Date().toJSON().slice(0,10);
    },
    handleRegister() {
      if (
        !this.formData.firstName ||
        !this.formData.lastName ||
        !this.formData.dateOfBirth ||
        !this.formData.email ||
        !this.formData.username ||
        !this.formData.password ||
        !this.formData.confirmPassword
      ) {
        return;
      }
      this.loading = true;
      this.errorMessage = "";
      UserService.register(this.formData)
        .then(
          () => {
            this.success = true;
            this.errorMessage = "";
          },
          error => {
            if (!error.response) {
              this.errorMessage =
                "Unexpected error: " +
                ((error && error.errorMessage) || error);
            } else {
              this.errorMessage =
                "Error: " +
                error.response.data.errors[0].defaultMessage;
            }
          }
        )
        .then(() => {
          this.loading = false;
        });
    }
  },
  mounted () {
    this.date_function();
    this.firstNamePattern = process.env.VUE_APP_FIRSTNAME_PATTERN;
    this.lastNamePattern = process.env.VUE_APP_LASTNAME_PATTERN;
    this.usernamePattern = process.env.VUE_APP_USERNAME_PATTERN;
    this.passwordPattern = process.env.VUE_APP_PASSWORD_PATTERN;
  }
}
</script>

<style>
</style>
