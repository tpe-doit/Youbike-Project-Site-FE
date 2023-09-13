// Cleaned

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import TrackPage from "../views/TrackPage.vue";
import { useContentStore } from "../store/contentStore";
import { useAppStore } from "../store/appStore";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomePage,
	},
	{
		path: "/track/:trackindex/:pageindex",
		name: "track",
		component: TrackPage,
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

router.beforeEach((to) => {
	const contentStore = useContentStore();
	const appStore = useAppStore();

	if ((to.name = "track" && to.params.trackindex && to.params.pageindex)) {
		contentStore.updateTrackPage(to.params.trackindex, to.params.pageindex);
		appStore.closeIntroVideoPage();
		return;
	}
	contentStore.updateTrackPage(null, 0);
});

export default router;
