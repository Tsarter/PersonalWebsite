import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import Carousel3d from "vue-carousel-3d"
const app = createApp(App);

app.use(Carousel3d)
app.use(router);
app.mount("#app");