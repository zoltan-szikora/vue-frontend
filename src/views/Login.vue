<template>
<div>
  <div class="container my-5">
  <form name="login" @submit.prevent="handleLogin" novalidate :class="submitted ? 'was-validated' : ''" class="row g-3" accept-charset="utf-8">
    <div class="col-md-6 mx-auto border px-5 py-3 shadow form-bg">
      <div class="text-center my-3 fs-1 text-light"><font-awesome-icon icon="sign-in-alt" class="me-1" />Login</div>
      <div v-if="errorMessage" class="alert alert-danger rounded-0" role="alert">{{ errorMessage }}</div>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="formData.username" name="username" id="floatUsername" placeholder="Username" required>
        <label for="floatUsername">Username</label>
        <span class="invalid-feedback">Username is required!</span>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" v-model="formData.password" name="password" id="floatPassword" placeholder="Password" required>
        <label for="floatPassword">Password</label>
        <span class="invalid-feedback">Password is required!</span>
      </div>

      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-teal shadow-none my-3" @click="submitted = true" :disabled="loading">
          Login
        </button>
      </div>
      <hr class="my-4">
      <div class="text-center mb-3 mx-auto">
        <span>Don't have an account?</span>
        <router-link :to="{ name: `registration` }" class="link-light"><font-awesome-icon icon="user-plus" class="me-1" />Sign up</router-link>
      </div>
    </div>
  </form>
  </div>
  <the-footer />
</div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";
import UserService from "../services/user.service";
import User from "../models/user";
import vuex from "vuex";

export default {
  name: 'login',
  components: {
    TheFooter
  },
  data() {
    return {
      formData: new User("", ""),
      loading: false,
      submitted: false,
      errorMessage: ""
    }
  },
  computed: {
    ...vuex.mapGetters(["user"])
  },
  mounted() {
    if (this.user && this.user.username) {
      this.$router.push("/profile");
    }
  },
  methods: {
    ...vuex.mapActions(["updateUser"]),
    handleLogin() {
      if (!this.formData.username || !this.formData.password) {
        return;
      }
      this.loading = true;
      UserService.login(this.formData).then(
        response => {
          response.data.password = this.formData.password;
          this.updateUser(response.data);
          this.$router.push("/profile");
        },
        error => {
          this.errorMessage =
            "Unexpected error occurred : " +
            ((error && error.errorMessage) || error);
          this.loading = false;
        }
      );
    }
  },
}
</script>

<style>
</style>
