import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
	state: () => ({
		lang: localStorage.getItem("lang") || "ch",
		isMobileDevice: false,
		introVideoPage: true,
	}),
	getters: {},
	actions: {
		toggleLang(lang) {
			this.lang = lang;
			localStorage.setItem("lang", this.lang);
			document.title =
				this.lang === "en"
					? "YouBike Optimization Analysis"
					: "YouBike優化分析";
		},
		checkIfMobile() {
			if (navigator.maxTouchPoints > 2) {
				this.isMobileDevice = true;
			}
			if (window.matchMedia("(pointer:fine)").matches) {
				this.isMobileDevice = false;
			}
		},
		closeIntroVideoPage() {
			this.introVideoPage = false;
		},
	},
});
