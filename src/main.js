import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vuetify from '@/config/Vuetify';
import 'vuetify/dist/vuetify.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "vue-loading-overlay/dist/css/index.css";

library.add(fas);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import $ from 'jquery'

window.$ = window.jQuery = $

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(Vuetify)

app.component('icon', FontAwesomeIcon);

app.use(Toast);

app.mount('#app');
