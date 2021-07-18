import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import  './assets/css/main.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPhone, faUser, faUsers, faUserPlus, faUserShield, faPlus, faHome, faInfo, faSignInAlt, faMobile,
  faEnvelope, faMapMarkerAlt, faArrowLeft, faEye, faTrash, faUserEdit, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faPhone, faUser, faUsers, faUserPlus, faUserShield, faPlus, faHome, faInfo, faSignInAlt, faMobile,
  faEnvelope, faMapMarkerAlt, faArrowLeft, faEye, faTrash, faUserEdit, faUserCog, faSignOutAlt)

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const options = { confirmButtonColor: '#20c997', cancelButtonColor: '#dc3545', };

createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2, options)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
