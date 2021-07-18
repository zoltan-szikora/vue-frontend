<template>
  <div v-if="user">
    <div class="container my-3 pb-5 content">
      <div class="pt-3">
        <h1 class="display-5 fw-bold"><font-awesome-icon icon="trash" class="me-1" />Delete Your Profile</h1>
        <hr class="my-4">
      </div>

      <div  class="px-4">
        <!-- Messages -->
        <div v-if="success" class="alert alert-success rounded-0">Your request is accepted!</div>
        <div v-if="errorMessage" class="alert alert-danger rounded-0" role="alert">{{ errorMessage }}</div>

        <div v-if="!success">
          <div v-if="user.status=='P'" class="alert alert-info rounded-0">You have already sent the request!</div>
          <div v-if="user.status=='A'">
            <h2 class="col-md-8 fs-4">Submit a request</h2>
            <p><strong>Please Note: </strong> If you delete your profile, you won't be able to reactivate it later.</p>
            <form name="update" @submit.prevent="submitUpdateStatus" class="row g-3" accept-charset="utf-8">
              <div class="mx-auto border form-bg px-5 py-3">

                <div class="mb-3">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" :class="{ invalid: passwordValidity === 'invalid' }" name="password" v-model.trim="currentPassword" placeholder="Password" id="password" required>
                  <span class="invalid-feedback">Password is required!</span>
                  <span class="err-msg" v-if="passwordValidity == 'invalid'">Your password is invalid!</span>
                </div>
                <button type="button" class="btn btn-danger rounded-0" @click="handleProfileDelete">Delete Profile</button>

              </div>
            </form>
          </div>
        </div>
      </div>
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
      loading: false,
      success: false,
      errorMessage: "",
      passwordValidity: "pending",
      currentPassword: ""
    }
  },
  computed: {
    ...vuex.mapGetters(["user"])
  },
  methods: {
    ...vuex.mapActions(["updateUser"]),
    handleProfileDelete() {
      this.$swal({
        title: 'Are you sure?',
        text: "Are you really want to delete your profile?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#20c997',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitUpdateStatus();
        }
      });
    },
    submitUpdateStatus() {
      this.loading = true;
      if (!this.currentPassword) {
        this.passwordValidity = "invalid";
        this.loading = false;
        this.$swal({
          icon: 'info',
          title: 'Password fied is empty!'
        });
        return;
      }

      if (this.currentPassword == this.user.password || bcrypt.compareSync(this.currentPassword, this.user.password)) {
        this.passwordValidity = "valid";
      } else {
        this.passwordValidity = "invalid";
        this.loading = false;
        this.$swal({
          icon: 'error',
          title: 'Your password is invalid!'
        });
        return;
      }

      UserService.updateStatus(this.user, this.currentPassword, "P")
      .then(
        (response) => {
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
          } else {
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
}
</script>

<style>

</style>
