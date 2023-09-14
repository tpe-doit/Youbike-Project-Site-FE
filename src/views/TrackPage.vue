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

const { t } = useI18n();
const contentStore = useContentStore();

const currentPage = computed(() => {
	if (!contentStore.currentTrack) return;
	return allTracks[contentStore.currentTrack][contentStore.currentPageIndex];
})

</script>

<template>
	<div>
		<HeaderBar />
		<div class="trackpage">
			<ProgressDots />
			<AnimationWrapper>
				<div class="trackpage-main" :key="`${contentStore.currentTrack}-${contentStore.currentPage}`"
					v-if="contentStore.currentTrack">
					<PrevNext mode="prev" v-if="contentStore.currentPageIndex > 0" />
					<MultipleChoice v-if="currentPage.multipleChoice" />
					<div v-else class="trackpage-main-content">
						<h2>{{ t(`${currentPage.index}.title`) }}</h2>
						<p>{{ t(`${currentPage.index}.content`) }}</p>
						<MapControlBtns v-if="currentPage.mapControls" />
					</div>
					<PrevNext mode="next"
						v-if="contentStore.currentPageIndex < contentStore.currentTrackIndexes.length - 1" />
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
			background-color: rgba(106, 106, 106, 0.75);
			padding: var(--font-l);
			margin: var(--font-l) 0;

			p {
				margin-top: var(--font-m);
				text-align: justify;
				font-size: var(--font-m);
			}
		}

		@media screen and (max-width: 1000px) {
			width: 350px;
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