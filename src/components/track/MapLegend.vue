<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useContentStore } from '../../store/contentStore';
import { useMapStore } from '../../store/mapStore';
import { useAppStore } from '../../store/appStore'

import { allTracks } from '../../assets/mapConfigs/allTracks';

const { BASE_URL } = import.meta.env;

const { t } = useI18n();
const contentStore = useContentStore();
const mapStore = useMapStore();
const appStore = useAppStore();

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
			<div v-else-if="legend[0] === 'line'">
				<div class="line" :style="{ backgroundColor: legend[1] }"></div>
			</div>
			<div v-else-if="legend[0] === 'lineStacked'">
				<div class="linestacked" :style="{ backgroundColor: legend[1] }"></div>
				<div class="linestacked linestacked-2" :style="{ backgroundColor: legend[1] }"></div>
				<div class="linestacked linestacked-3" :style="{ backgroundColor: legend[1] }"></div>
			</div>
			<div v-else-if="legend[0] === 'lineGradient'">
				<div class="linegradient" :style="{ background: `linear-gradient(-90deg, ${legend[1]}, ${legend[2]})` }">
				</div>
			</div>
			<div v-else-if="legend[0] === 'fill'">
				<div class="fill" :style="{ backgroundColor: legend[1] }">
				</div>
			</div>
			<div v-else-if="legend[0] === 'circleStacked'">
				<div class="circlestacked" :style="{ backgroundColor: legend[1] }"></div>
				<div class="circlestacked circlestacked-2" :style="{ backgroundColor: legend[1] }"></div>
				<div class="circlestacked circlestacked-3" :style="{ backgroundColor: legend[1] }"></div>
			</div>
			<div v-else-if="legend[0] === 'symbol'">
				<img class="symbol" :src="`${BASE_URL}images/${legend[1]}.png`" />
			</div>
			<p :style="{fontSize: appStore.lang === 'en' ? '14px' : '16px'}">
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

		>div {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 2.5rem;

			.circle {
				width: 1rem;
				height: 1rem;
				border: solid 1px white;
				border-radius: 50%;
			}

			.line {
				width: 1.5rem;
				height: 0.5rem;
				border: solid 1px white;
				border-radius: 2px;
			}

			.linestacked {
				width: 0.3rem;
				height: 0.6rem;
				border: solid 1px white;
				border-radius: 2px;
				align-self: baseline;
				margin: 0 2px;

				&-2 {
					height: 0.8rem;
				}

				&-3 {
					height: 1.2rem;
				}
			}

			.linegradient {
				width: 2rem;
				height: 0.5rem;
				border: solid 1px white;
				border-radius: 2px;
			}

			.fill {
				width: 1rem;
				height: 1rem;
				border: solid 1px white;
				border-radius: 2px;
			}

			.circlestacked {
				width: 0.3rem;
				height: 0.3rem;
				border: solid 1px white;
				border-radius: 50%;
				margin: 0 1px;

				&-2 {
					width: 0.6rem;
					height: 0.6rem;
				}

				&-3 {
					width: 0.9rem;
					height: 0.9rem;
				}
			}

			.symbol {
				height: 1.2rem;
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