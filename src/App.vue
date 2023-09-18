<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';

import { useMapStore } from './store/mapStore';
import { useAppStore } from './store/appStore';
import AnimationWrapper from './components/util/AnimationWrapper.vue';
import { useContentStore } from './store/contentStore';

const { locale } = useI18n();

const mapStore = useMapStore();
const appStore = useAppStore();
const contentStore = useContentStore();

onBeforeMount(() => {
	appStore.checkIfMobile();

	let vh = window.innerHeight * 0.01;
	let vw = window.innerWidth;

	document.documentElement.style.setProperty('--vh', `${vh}px`);

	if (vw < 760) {
		contentStore.mapMode = false;
		contentStore.contentMode = true;
		appStore.isNarrowDevice = true;
	}

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		let vw = window.innerWidth;

		document.documentElement.style.setProperty('--vh', `${vh}px`);

		if (vw < 760) {
			contentStore.mapMode = false;
			contentStore.contentMode = true;
			appStore.isNarrowDevice = true;
		} else {
			contentStore.mapMode = true;
			contentStore.contentMode = true;
			appStore.isNarrowDevice = false;
		}
	});
});
onMounted(() => {
	document.title =
		appStore.lang === "en"
			? "YouBike Optimization Analysis"
			: "YouBike優化分析";
	localStorage.setItem("lang", appStore.lang);
	locale.value = appStore.lang;
	mapStore.initializeMapBox();
});
</script>

<template>
	<div id="mapboxBox"></div>
	<div id="routerview">
		<router-view v-slot="{ Component }">
			<AnimationWrapper>
				<component :is="Component" />
			</AnimationWrapper>
		</router-view>
	</div>
</template>

<style lang="scss" scoped>
#mapboxBox {
	width: 100%;
	height: 100vh;
	height: calc(var(--vh) * 100);
}

#routerview {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	height: calc(var(--vh) * 100);
}
</style>
