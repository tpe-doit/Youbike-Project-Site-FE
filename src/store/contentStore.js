import { defineStore } from "pinia";
import router from "../router/index";
import { allTracks } from "../assets/mapConfigs/allTracks";

export const useContentStore = defineStore("content", {
	state: () => ({
		currentTrack: null,
		currentTrackIndexes: [],
		currentPage: null,
		currentPageIndex: null,
	}),
	getters: {},
	actions: {
		updateTrackPage(track, page) {
			this.currentTrack = track;
			this.currentPage = page;

			if (!this.currentTrack) {
				this.currentTrackIndexes.splice(
					0,
					this.currentTrackIndexes.length
				);
				this.currentPageIndex = null;
				return;
			}

			this.currentTrackIndexes = allTracks[this.currentTrack].map(
				(el) => el.index
			);

			if (!this.currentTrackIndexes.includes(this.currentPage)) {
				this.currentPage = this.currentTrackIndexes[0];

				router.replace(
					`/track/${this.currentTrack}/${this.currentTrackIndexes[0]}`
				);
				return;
			}

			this.currentPageIndex = this.currentTrackIndexes.indexOf(
				this.currentPage
			);
		},
	},
});
