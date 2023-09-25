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
			<div class="homepage-container">
				<div class="homepage-container-desc">
					<div>
						<h1>{{ t('homepage.title') }}</h1>
						<p>{{ t('homepage.content') }}</p>
					</div>
					<div class="links"><a>{{ t('homepage.dataset') }}</a><a>{{ t('homepage.explore') }}</a></div>
				</div>
				<div class="homepage-container-directory">
					<RouterLink class="management" to="/track/management">
						<h2>{{ t('homepage.management') }}</h2>
						<p>{{ t('homepage.managementdesc') }}</p>
					</RouterLink>
					<RouterLink class="weekday" to="/track/weekday">
						<h2>{{ t('homepage.weekday') }}</h2>
						<p>{{ t('homepage.weekdaydesc') }}</p>
					</RouterLink>
					<RouterLink class="weekend" to="/track/weekend">
						<h2>{{ t('homepage.weekend') }}</h2>
						<p>{{ t('homepage.weekenddesc') }}</p>
					</RouterLink>
				</div>
			</div>
		</div>
	</AnimationWrapper>
</template>

<style scoped lang="scss">
.homepage {

	&-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		height: calc(var(--vh) * 100);
		display: flex;
		justify-content: center;
		align-items: center;

		&-desc {
			width: 350px;
			margin-right: max(5%, 2rem);

			p {
				margin: 1rem 0 2rem;
				text-align: justify;
				font-size: 18px;
			}

			a {
				cursor: pointer;
				margin-right: 0.5rem;
				padding: 0.25rem 0.75rem;
				background-color: white;
				border-radius: 10px;
				color: black;
				font-weight: 700;
				font-size: var(--font-l);
				transition: background-color 0.2s;

				&:hover {
					background-color: rgb(210, 210, 210);
				}
			}
		}

		&-directory {
			display: grid;
			grid-template-columns: 175px 175px;
			grid-template-areas: "management weekday" "management weekend";
			column-gap: 1rem;
			row-gap: 1rem;
			height: 350px;

			a {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;
				border-radius: 10px;
				background-position: center;
				background-size: cover;
				transition: box-shadow 0.3s;

				h2,
				p {
					text-shadow: black 1px 1px 8px;
				}

				p {
					margin-bottom: 1rem;
				}

				&:hover {
					cursor: pointer;
					box-shadow: white 0 0 8px;
				}
			}

			.management {
				grid-area: management;
				background-image: url('../assets/images/homepage/management.png');
			}

			.weekday {
				grid-area: weekday;
				background-image: url('../assets/images/homepage/weekday.png');
			}

			.weekend {
				grid-area: weekend;
				background-image: url('../assets/images/homepage/weekend.png');
			}
		}

		@media screen and (max-width: 810px) {
			flex-direction: column;

			&-desc {
				width: 366px;
				margin-right: 0;
				margin-bottom: 2rem;

				p {
					font-size: var(--font-m);
				}
			}
		}

		@media screen and (max-width: 500px) {
			flex-direction: column;

			&-desc {
				width: 316px;
			}

			&-directory {
				grid-template-columns: 150px 150px;
				height: 300px;
			}
		}
	}
}
</style>