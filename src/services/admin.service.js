import axios from "axios";
import Store from "../store";

const API_ADMIN_URL = process.env.VUE_APP_API_URL + "admin/";
const user = Store.getters["user"];

class AdminService {

  header = {
    authorization: "Basic " + btoa(user.username + ":" + user.password),
    "Content-Type": "application/json"
  };

  getUsers(page) {
    return axios.get(API_ADMIN_URL + "users?page=" + page + "&sort=id,asc", { headers: this.header });
  }

  getUserDetails(id) {
    return axios.get(API_ADMIN_URL + "users/" + id + "/details", { headers: this.header });
  }

  addAdminRole(id) {
    return axios.put(API_ADMIN_URL + "users/" + id + "/role", id, { headers: this.header });
  }

  setStatus(id, status) {
    return axios.put(API_ADMIN_URL + "users/" + id + "/status/" + status, status, { headers: this.header });
  }

}

export default new AdminService();
