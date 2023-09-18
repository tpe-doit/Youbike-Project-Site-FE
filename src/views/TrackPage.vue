<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useContentStore } from '../store/contentStore';

import HeaderBar from '../components/HeaderBar.vue';
import AnimationWrapper from '../components/util/AnimationWrapper.vue';
import PrevNext from '../components/util/PrevNext.vue';
import ProgressDots from '../components/util/ProgressDots.vue';
import MultipleChoice from '../components/track/MultipleChoice.vue';
import MapControlBtns from '../components/track/MapControlBtns.vue';

import { allTracks } from '../assets/mapConfigs/allTracks';
import { useMapStore } from '../store/mapStore';
import MapLegend from '../components/track/MapLegend.vue';
import { useAppStore } from '../store/appStore';

const { t } = useI18n();
const contentStore = useContentStore();
const mapStore = useMapStore();
const appStore = useAppStore();

const currentPage = computed(() => {
	if (!contentStore.currentTrack) return "home";
	return allTracks[contentStore.currentTrack][contentStore.currentPageIndex];
});
</script>

<template>
	<div>
		<HeaderBar />
		<div class="trackpage">
			<ProgressDots />
			<AnimationWrapper>
				<div class="trackpage-main" :key="`${contentStore.currentTrack}-${contentStore.currentPage}`"
					v-if="contentStore.currentTrack && contentStore.contentMode">
					<PrevNext mode="prev" v-if="contentStore.currentPageIndex > 0" />
					<MultipleChoice v-if="currentPage.multipleChoice" />
					<div v-else class="trackpage-main-content">
						<h2>{{ t(`${currentPage.index}.title`) }}</h2>
						<p>{{ t(`${currentPage.index}.content`) }}</p>
						<i v-if="currentPage.caption">{{ t(`${currentPage.index}.note`) }}</i>
					</div>
					<PrevNext mode="next"
						v-if="contentStore.currentPageIndex < contentStore.currentTrackIndexes.length - 1" />
				</div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div class="trackpage-mapcontrols" v-if="currentPage.mapControls && contentStore.mapMode">
					<MapControlBtns v-if="currentPage.mapControls.length > 1" />
					<div class="trackpage-mapcontrols-title">
						<h3
							:key="`${contentStore.currentTrack}-${contentStore.currentPage}-map-${mapStore.currentMap + 1}`">
							{{ t(`${currentPage.index}.map-${mapStore.currentMap + 1}`) }}</h3>
					</div>
				</div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div class="trackpage-maplegend" v-if="currentPage.mapControls && contentStore.mapMode"
					:key="`${contentStore.currentTrack}-${contentStore.currentPage}-legend-${mapStore.currentMap + 1}`">
					<MapLegend />
				</div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div class="trackpage-maptoggle" v-if="currentPage.mapControls && appStore.isNarrowDevice">
					<button @click="contentStore.toggleContentMapMode()">{{ contentStore.contentMode ? t('tomapmode') :
						t('tocontentmode') }}</button>
				</div>
			</AnimationWrapper>
		</div>
	</div>
</template>

<style scoped lang="scss">
.trackpage {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	height: calc(var(--vh) * 100);
	display: flex;
	align-items: center;

	&-main {
		width: 400px;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		&-content {
			border-radius: 10px;
			background-color: var(--color-track-items);
			padding: var(--font-l);
			margin: var(--font-l) 0;

			p {
				margin: var(--font-m) 0 var(--font-s);
				text-align: justify;
				font-size: var(--font-m);
			}

			i {
				color: rgb(205, 205, 205);
				font-size: var(--font-s);
			}
		}

		@media screen and (max-width: 1000px) {
			width: 350px;
		}
	}

	&-mapcontrols {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		&-title {
			width: 250px;
			background-color: var(--color-track-items);
			border-radius: 10px;
			margin: var(--font-s) 0 3rem;
			padding: var(--font-s) var(--font-l);

			@media screen and (max-width: 1000px) {
				margin: var(--font-s) 0 4.5rem;
			}

			h3 {
				text-align: center;
				font-size: var(--font-l);
			}
		}
	}

	&-maplegend {
		position: absolute;
		bottom: 3rem;
		right: 2rem;

		@media screen and (max-width: 1000px) {
			top: 4rem;
			right: 1rem;
		}
	}

	&-maptoggle {
		position: absolute;
		top: 1rem;
		left: 1rem;
		padding: 2px 4px;
		z-index: 11;
		background-color: white;
		border-radius: 10px;

		button {
			font-size: var(--font-m);
			color: black;
			font-weight: 700;
		}
	}

	@media screen and (max-width: 760px) {
		flex-direction: column-reverse;

		&-main {
			flex-direction: row;
			width: min(350px, 85%);

			&-content {
				margin: 0 var(--font-l);
			}
		}
	}
}
</style>