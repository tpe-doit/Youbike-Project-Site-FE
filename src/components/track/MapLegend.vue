<script setup>
import { computed, onMounted } from 'vue';
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

onMounted(() => {

});
</script>

<template>
	<div class="maplegend">
		<div :class="{ 'maplegend-item': true }"
			v-for="(legend, index) in currentPage.mapControls[mapStore.currentMap].legend"
			:key="`${contentStore.currentTrack}-${contentStore.currentPage}-legend-${mapStore.currentMap + 1}-${index + 1}`">
			<div v-if="legend[0] === 'circle'">
				<div class="circle" :style="{ backgroundColor: legend[1] }"></div>
			</div>
			<p>
				{{ t(`${currentPage.index}.legend-${mapStore.currentMap + 1}-${index + 1}`) }}
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.maplegend {
	display: flex;
	flex-direction: column;
	padding: var(--font-s);
	background-color: var(--color-track-items);
	border-radius: 10px;



	&-item {
		display: flex;
		margin: 4px 0;

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 2rem;

			.circle {
				width: 1rem;
				height: 1rem;
				border: solid 1px white;
				border-radius: 50%;
			}
		}

		p {
			margin-left: 0.5rem;
			font-size: var(--font-m);
			text-align: left;
			min-width: 4rem;
		}

	}
}
</style>