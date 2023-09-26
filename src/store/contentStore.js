import { defineStore } from "pinia";
import router from "../router/index";
import { allTracks } from "../assets/mapConfigs/allTracks";
import { useMapStore } from "./mapStore";
import { useAppStore } from "./appStore";

export const useContentStore = defineStore("content", {
	state: () => ({
		currentTrack: null,
		currentTrackIndexes: [],
		currentPage: null,
		currentPageIndex: null,
		contentMode: true,
		mapMode: true,
		answers: {
			"management-question":
				localStorage.getItem("management-question") || null,
			"weekday-question":
				localStorage.getItem("weekday-question") || null,
			"weekend-question":
				localStorage.getItem("weekend-question") || null,
		},
	}),
	getters: {},
	actions: {
		updateTrackPage(track, page) {
			const mapStore = useMapStore();
			const appStore = useAppStore();

			mapStore.clearMap();

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

			const currentPageConfig =
				allTracks[this.currentTrack][this.currentPageIndex];

			if (
				appStore.isNarrowDevice &&
				currentPageConfig.mapConfig.mobileCenter
			) {
				mapStore.easeToLocation(
					currentPageConfig.mapConfig.mobileCenter
				);
			} else {
				mapStore.easeToLocation(currentPageConfig.mapConfig.center);
			}

			if (currentPageConfig.mapConfig.layers) {
				mapStore.fetchLocalGeoJson(
					currentPageConfig.mapConfig.layers,
					currentPageConfig.index,
					currentPageConfig.mapControls
				);
			}

			if (currentPageConfig.threed) {
				mapStore.add3dLayer(
					currentPageConfig.index,
					currentPageConfig.threed
				);
			}
		},
		toggleContentMapMode(mode) {
			if (this.contentMode && this.mapMode) return;

			if (mode === "content") {
				this.contentMode = true;
				this.mapMode = false;
				return;
			}

			this.contentMode = this.contentMode ? false : true;
			this.mapMode = this.mapMode ? false : true;
		},
		checkAndSubmit() {
			if (!this.currentPage.includes("question")) {
				return;
			}
			console.log(this.answers);
		},
		submitAnswer(question, index) {
			this.answers[question] = index;
			localStorage.setItem(question, index);
		},
	},
});
