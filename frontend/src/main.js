import { createApp } from "vue";
import router from "./router/router.js";
import { createPinia } from "pinia";

import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
const pinia = createPinia();

Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(key, ElementPlusIconsVue[key]);
});

app.use(router).use(pinia).use(ElementPlus);

app.mount("#app");
