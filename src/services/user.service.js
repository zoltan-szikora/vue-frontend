import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

class UserService {
  register(user) {
    return axios.post(API_URL + "reg", user);
  }

  login(user) {
    const header = {
      authorization: "Basic " + btoa(user.username + ":" + user.password),
      'Content-Type': 'application/json; charset=UTF-8'
    };
    return axios.get(API_URL + "login", { headers: header });
  }

  logOut() {
    return axios.post(API_URL + "logout", {});
  }

  update(user) {
    const header = {
      authorization: "Basic " + btoa(user.username + ":" + user.password),
      "Content-Type": "application/json; charset=UTF-8"
    };
    return axios.put(API_URL + "user/" + user.id, user, { headers: header });
  }

  updatePassword(user, currentPassword, hash) {
    const header = {
      authorization: "Basic " + btoa(user.username + ":" + currentPassword),
      "Content-Type": "application/json; charset=UTF-8"
    };
    return axios.patch(API_URL + "user/update-password", hash, { headers: header });
  }

  updateStatus(user, currentPassword, status) {
    const header = {
      authorization: "Basic " + btoa(user.username + ":" + currentPassword),
      "Content-Type": "application/json; charset=UTF-8"
    };
    return axios.patch(API_URL + "user/" + user.id +"/status/" + status, status, { headers: header });
  }

}

export default new UserService();
