<template>
  <div>
    <div class="container my-3 pb-5 content">
      <div class="pt-3">
        <h1 class="display-5 fw-bold"><font-awesome-icon icon="users" class="me-1" />Users</h1>
				<hr class="my-4">
      </div>

      <div class="px-4">
        <div v-if="errorMessage" class="alert alert-danger rounded-0" role="alert">{{ errorMessage }}</div>

        <h2 class="col-md-8 fs-4">Number of users: {{ totalItems }}</h2>
        <div class="table-responsive">
          <table class="table table-striped table-bordered">
              <thead class="thead-dark form-bg">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Details</th>
                  <th>Add Admin Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody v-if="!usersList.length">
                <tr>
                  <td colspan="7">The users table is empty!</td>
                </tr>
              </tbody>
              <tbody v-if="usersList.length">
                <tr v-for="(user, ind) in usersList" :key="ind"
                  :class="{'myRowStyle' : ind % 2 == 0 }">
                  <td>{{ user.id }}</td>
                  <td>{{ user.firstName + " " + user.lastName }}</td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <router-link :to="{name:'user-details',params:{id:user.id}}" tag="button" class="btn btn-info btn-sm rounded-0"><font-awesome-icon icon="eye" />
                      <!-- Details -->
                    </router-link>
                  </td>
                  <td>
                    <button v-if="user.roles.length > 1" class="btn btn-purple disabled btn-sm rounded-0">Administrator</button>
                    <button v-if="user.roles.length == 1" type="button" class="btn btn-danger btn-sm rounded-0" @click="handleAddRole(user.id, currentPage)">Add role</button>
                  </td>
                  <td>
                    <span title="Active">
                      <button v-if="user.status == 'A'" class="btn btn-success disabled btn-sm rounded-0">A</button>
                    </span>
                    <span title="Deleted">
                      <button v-if="user.status == 'D'" class="btn btn-danger disabled btn-sm rounded-0">D</button>
                    </span>
                    <span v-if="user.status == 'P'" title="Progress">
                      <button class="btn btn-warning btn-sm rounded-0" type="button"  @click="handleStatus(user.id, currentPage)">P</button>
                    </span>
                  </td>
                </tr>
              </tbody>
          </table>
        </div>

        <div v-if="totalPages > 0" class="mt-2">
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li v-if="currentPage > 0" class="page-item" @click="previousPage(currentPage-1)">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">{{ currentPage +1 }}</a></li>
              <li v-if="currentPage +1 < totalPages" class="page-item" @click="nextPage(currentPage+1)">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/admin.service";

export default {
  data() {
    return {
      errorMessage: "",
      usersList: [],
      selectedUserId: "",
      totalItems: "",
      totalPages: "",
      currentPage: ""
    }
  },
  mounted() {
    this.handlePage(0);
  },
  methods: {
    handleAddRole(id, currentPage) {
      this.$swal({
        title: 'Are you sure?',
        text: "Are you really want to add Admin Role? User ID: " + id,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.addAdminRole(id, currentPage);
        }
      });
    },
    addAdminRole(id, currentPage){
      AdminService.addAdminRole(id)
      .then(
        this.usersList = "",
        this.$swal({
          icon: 'success',
          title:'Ok!',
          showConfirmButton: false,
          timer: 1500
        }),
      )
      .then(
        this.usersList = [],
        this.handlePage(currentPage)
      )
      .catch(function (error) {
        this.errorMessage = "Unexpected error: " +
        ((error && error.errorMessage) || error);
      });
    },
    handleStatus(id, currentPage){
      const status = "D"; //Deleted status
      AdminService.setStatus(id, status)
      .then(
        this.usersList = "",
        this.$swal({
          icon: 'success',
          title:'Ok!',
          showConfirmButton: false,
          timer: 1500
        }),
      )
      .then(
        this.usersList = [],
        this.handlePage(currentPage)
      )
      .catch(function (error) {
        this.errorMessage = "Unexpected error: " +
        ((error && error.errorMessage) || error);
      });
    },
    nextPage(page){
      this.handlePage(page);
    },
    previousPage(page){
      this.handlePage(page);
    },
    async handlePage(page){
      await AdminService.getUsers(page).then(response => {
        this.usersList = response.data.users;
        this.totalItems = response.data.totalItems;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      },
      error => {
        if (!error.response) {
          this.errorMessage = "Unexpected error: " +
            ((error && error.errorMessage) || error);
        } else {
          this.errorMessage =
          "Error: " + error.response.data.errors[0].defaultMessage;
        }
      });
    }
  },
}
</script>

<style>
.swal2-styled,
.swal2-cancel,
.swal2-styled.swal2-cancel,
.swal2-styled.swal2-confirm,
.swal2-popup {
  border-radius: 0;
}

.swal-button{
  border: 0;
  border-radius: 0;
}

.myRowStyle{
  font-weight: bold;
}
</style>
