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
		path: "/track/:trackindex",
		name: "trackBackup",
		component: TrackPage,
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

	if ((to.name = "track" && to.params.trackindex)) {
		contentStore.updateTrackPage(to.params.trackindex, to.params.pageindex);
		appStore.closeIntroVideoPage();
		if (
			!["management", "weekday", "weekend"].includes(to.params.trackindex)
		) {
			router.replace("/");
			contentStore.updateTrackPage(null, null);
			return;
		}
		return;
	}
	contentStore.updateTrackPage(null, null);
});

export default router;
