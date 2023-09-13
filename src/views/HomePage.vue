<script setup>
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../store/appStore';

import IntroductionVideo from '../components/IntroductionVideo.vue';
import AnimationWrapper from '../components/util/AnimationWrapper.vue';
import HeaderBar from '../components/HeaderBar.vue';

const { t } = useI18n();
const appStore = useAppStore();
</script>

<template>
	<AnimationWrapper>
		<IntroductionVideo v-if="appStore.introVideoPage" />
		<div class="homepage" v-else>
			<HeaderBar :is-home="true" />
			<div class="homepage-container-desc">
				<div class="homepage-container">
					<div>
						<h2>{{ t('homepage.title') }}</h2>
						<p>{{ t('homepage.content') }}</p>
					</div>
					<div><button>{{ t('homepage.dataset') }}</button><button>{{ t('homepage.explore') }}</button></div>
				</div>
				<div class="homepage-container-directory">
					<div>
						<h2>{{ t('homepage.management') }}</h2>
						<p>{{ t('homepage.managementdesc') }}</p>
					</div>
					<div>
						<h2>{{ t('homepage.weekday') }}</h2>
						<p>{{ t('homepage.weekdaydesc') }}</p>
					</div>
					<div>
						<h2>{{ t('homepage.weekend') }}</h2>
						<p>{{ t('homepage.weekenddesc') }}</p>
					</div>
				</div>
			</div>
		</div>
	</AnimationWrapper>
</template>

<style scoped lang="scss">
.homepage {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	height: calc(var(--vh) * 100);
	display: grid;
	grid-template-rows: 42px 1fr;
}
</style>