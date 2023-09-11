// Cleaned

import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: App,
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notFoundRedirect",
		redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	base: import.meta.env.BASE_URL,
	routes,
});

export default router;
