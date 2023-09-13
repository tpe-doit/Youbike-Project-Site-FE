import { defineStore } from "pinia";

export const useContentStore = defineStore("content", {
	state: () => ({
		currentTrack: null,
		currentPage: 0,
	}),
	getters: {},
	actions: {
		updateTrackPage(track, page) {
			this.currentTrack = track;
			this.currentPage = page;
		},
	},
});
