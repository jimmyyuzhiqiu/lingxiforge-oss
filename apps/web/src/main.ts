import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./styles/global.scss";
import "./styles/element-overrides.scss";
// import "element-plus/theme-chalk/el-loading.css";
import "element-plus/es/components/message/style/css";
import pinia, { useThemeStore } from "@/stores";

const app = createApp(App);

app.use(router).use(pinia);

useThemeStore(pinia).init();

app.mount("#app");
