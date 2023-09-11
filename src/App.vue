<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import { useMapStore } from './store/mapStore';
import { useAppStore } from './store/appStore';

const { locale } = useI18n();

const mapStore = useMapStore();
const appStore = useAppStore();

onBeforeMount(() => {
	appStore.checkIfMobile();

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
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
</template>

<style lang="scss" scoped>
#mapboxBox {
	width: 100%;
	height: 100vh;
	height: calc(var(--vh) * 100);
}
</style>
