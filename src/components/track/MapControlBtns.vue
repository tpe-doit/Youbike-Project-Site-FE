<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useContentStore } from '../../store/contentStore';
import { useMapStore } from '../../store/mapStore';

import { allTracks } from '../../assets/mapConfigs/allTracks';

const { t } = useI18n();
const contentStore = useContentStore();
const mapStore = useMapStore();

const currentPage = computed(() => {
	if (!contentStore.currentTrack) return;
	return allTracks[contentStore.currentTrack][contentStore.currentPageIndex];
});
</script>

<template>
	<div class="mapcontrolbtns">
		<div :class="`mapcontrolbtns-background index-${mapStore.currentMap}`"></div>
		<button :class="{ 'mapcontrolbtns-btn': true, 'btn-focus': mapStore.currentMap === index }"
			v-for="(control, index) in currentPage.mapControls"
			:key="`${contentStore.currentTrack}-${contentStore.currentPage}-btn-${index + 1}`"
			@click="mapStore.switchMap(index, currentPage.mapControls, currentPage.index)">
			{{ t(`${currentPage.index}.btn-${index + 1}`) }}
		</button>
	</div>
</template>

<style scoped lang="scss">
.mapcontrolbtns {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2rem;
	border: solid 1px white;
	border-radius: 2rem;

	&-background {
		position: absolute;
		height: 100%;
		width: 5rem;
		background-color: white;
		border-radius: 2rem;
		transition: left 0.4s ease-in-out;
	}

	&-btn {
		position: relative;
		height: 100%;
		width: 5rem;
		font-size: var(--font-m);
		padding: 0 0.75rem;
		border-radius: 2rem;
		transition: background-color 0.3s, font-weight 0.3s;
		z-index: 2;

		&:hover {
			background-color: var(--color-track-items);
		}
	}
}

.btn-focus {
	font-weight: 700;
	color: black;

	&:hover {
		background-color: transparent;
	}
}

.index-0 {
	left: 0;
}

.index-1 {
	left: 80px;
}

.index-2 {
	left: 160px;
}

.index-3 {
	left: 240px
}
</style>