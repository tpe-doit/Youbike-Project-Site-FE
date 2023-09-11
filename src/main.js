// Import the Essentials
import { createApp } from "vue";
import "./assets/styles/globalStyles.css";
import App from "./App.vue";

// Import Core Packages: Vue-Router, Pinia, Apexcharts
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { en } from "./assets/lang/en";
import { ch } from "./assets/lang/ch";

const app = createApp(App);

// Add Core Packages: Vue-Router, Pinia, Apexcharts
app.use(router);
const pinia = createPinia();
app.use(pinia);
const i18n = createI18n({
	locale: "ch",
	allowComposition: true,
	messages: {
		en: en,
		ch: ch,
	},
});
app.use(i18n);

app.mount("#app");
