import { createApp } from "vue";

import { createPinia } from "pinia";
import { router } from "@/router";

import "@/assets/styles/default.scss";
import App from "./App.vue";


const Pinia = createPinia();
const Vue = createApp(App);

Vue.use(Pinia);
Vue.use(router);
Vue.mount('#app');
