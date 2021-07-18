<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class="container">
      <a class="navbar-brand" href="#">Brand Name</a>
      <button class="navbar-toggler rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link"><font-awesome-icon icon="home" class="me-1" />Home</router-link>
          </li>
        </ul>

        <div class="d-flex" v-if="!user">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: `login` }" class="nav-link"><font-awesome-icon icon="sign-in-alt" class="me-1" />Login</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: `registration` }" class="nav-link"><font-awesome-icon icon="user-plus" class="me-1" />Registration</router-link>
            </li>
          </ul>
        </div>

        <div class="d-flex" v-if="user">
          <form class="form-inline" id="frmlogout" action="@{/logout}" method="POST">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>
                    <i class="fas fa-user me-1"></i>
                    <span><font-awesome-icon icon="user" class="me-1" />{{ user.username }}</span>
                  </span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdown01">
                  <li><router-link :to="{ name: `profile` }" class="dropdown-item"><font-awesome-icon icon="user" class="me-1" />Profile</router-link></li>
                  <li><router-link :to="{ name: `updateUser` }" class="dropdown-item"><font-awesome-icon icon="user-edit" class="me-1" />Edit Profile</router-link></li>
                  <li><router-link :to="{ name: `updatePassword` }" class="dropdown-item"><font-awesome-icon icon="user-shield" class="me-1" />Change Password</router-link></li>
                  <li><router-link :to="{ name: `deleteProfile` }" class="dropdown-item"><font-awesome-icon icon="trash" class="me-1" />Delete Profile</router-link></li>
                  <li v-if="user.roles.length > 1"><router-link class="dropdown-item" :to="{ name: `users` }"><font-awesome-icon icon="users" class="me-1" />Users</router-link></li>
                  <li>
                    <a class="dropdown-item" @click="logOut"><font-awesome-icon icon="sign-out-alt" class="me-1" />LogOut</a>
                  </li>
                </ul>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import UserService from "../services/user.service";
import vuex from "vuex";

export default {
  name: 'TheNavbar',
  computed: {
    ...vuex.mapGetters(["user"])
  },
  methods: {
    ...vuex.mapActions(["updateUser"]),
    logOut() {
      UserService.logOut().then(() => {
        this.updateUser(null);
        this.$swal({
          icon: 'success',
          title:'Logout successful!',
          showConfirmButton: false,
          timer: 1500
          });
        this.$router.push("/");
      });
    }
  }
}
</script>

<style scoped>
</style>
