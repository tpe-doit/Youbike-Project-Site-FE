<script setup>
import { useI18n } from "vue-i18n";
import { useAppStore } from "../store/appStore";

import IntroductionVideo from "../components/IntroductionVideo.vue";
import AnimationWrapper from "../components/util/AnimationWrapper.vue";
import HeaderBar from "../components/HeaderBar.vue";

const { t } = useI18n();
const appStore = useAppStore();
</script>

<template>
	<AnimationWrapper>
		<IntroductionVideo v-if="appStore.introVideoPage" />
		<div class="homepage" v-else>
			<HeaderBar :is-home="true" />
			<div class="homepage-container">
				<div
					:class="{
						'homepage-container-positioner': true,
						'lang-en': appStore.lang === 'en' ? true : false,
					}"
				>
					<div class="homepage-container-desc">
						<div>
							<h1>
								{{ t("homepage.title") }}
							</h1>
							<p>
								{{ t("homepage.content") }}
							</p>
						</div>
						<div class="links">
							<a
								href="https://github.com/tpe-doit/YouBike-Optimization"
								rel="noreferrer"
								target="_blank"
								>{{ t("homepage.dataset")
								}}<span>north_east</span></a
							>
							<a
								href="https://citydashboard.taipei/dashboard?index=youbike"
								rel="noreferrer"
								target="_blank"
								>{{ t("homepage.explore")
								}}<span>north_east</span></a
							>
						</div>
					</div>
					<div class="homepage-container-directory">
						<RouterLink class="management" to="/track/management">
							<div></div>
							<h2>{{ t("homepage.management") }}</h2>
							<p>{{ t("homepage.managementdesc") }}</p>
						</RouterLink>
						<RouterLink class="weekday" to="/track/weekday">
							<div></div>
							<h2>{{ t("homepage.weekday") }}</h2>
							<p>{{ t("homepage.weekdaydesc") }}</p>
						</RouterLink>
						<RouterLink class="weekend" to="/track/weekend">
							<div></div>
							<h2>{{ t("homepage.weekend") }}</h2>
							<p>{{ t("homepage.weekenddesc") }}</p>
						</RouterLink>
					</div>
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

		&-positioner {
			display: flex;
		}

		&-desc {
			width: 350px;
			margin-right: max(5%, 2rem);

			div:first-child {
				background-color: var(--color-track-items);
				border-radius: 10px;
				padding: var(--font-s);
				margin-bottom: 1rem;
			}

			p {
				margin: 1rem 0 0;
				text-align: justify;
				font-size: 18px;
			}

			.links {
				display: flex;
			}

			a {
				position: relative;
				display: flex;
				align-items: center;
				width: fit-content;
				margin-right: 0.5rem;
				padding: 0.25rem 1.75rem 0.25rem 0.75rem;
				border: solid white 2px;
				border-radius: 10px;
				font-weight: 700;
				font-size: var(--font-l);
				transition: background-color 0.2s;
				cursor: pointer;

				span {
					position: absolute;
					top: 8px;
					right: 4px;
					font-family: var(--font-icon);
					font-size: var(--font-l);
					transition: top 0.2s, right 0.2s, transform 0.3s 0.25s,
						opacity 0.2s 0.3s;
					transition-timing-function: ease;
				}

				&:last-child {
					background-color: white;
					color: black;

					span {
						color: black;
					}
				}

				&:hover {
					opacity: 0.7;

					span {
						top: 12px;
						right: 8px;
						transform: translate3d(12px, -12px, 0);
						opacity: 0;
					}
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
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;
				border-radius: 10px;
				background-position: center;
				background-size: cover;
				transition: box-shadow 0.3s;

				div {
					position: absolute;
					background-color: rgb(0, 0, 0, 0.35);
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}

				h2,
				p {
					position: relative;
					text-shadow: black 1px 1px 8px;
				}

				p {
					margin-bottom: 1rem;
					font-weight: 700;
					font-size: 0.85rem;
				}

				&:hover {
					cursor: pointer;
					box-shadow: white 0 0 8px;
				}
			}

			.management {
				grid-area: management;
				background-image: url("../assets/images/homepage/management.jpg");
			}

			.weekday {
				grid-area: weekday;
				background-image: url("../assets/images/homepage/weekday.jpg");
			}

			.weekend {
				grid-area: weekend;
				background-image: url("../assets/images/homepage/weekend.jpg");
			}
		}

		@media screen and (max-width: 810px) {
			&-positioner {
				flex-direction: column;
			}

			&-desc {
				width: 366px;
				margin-right: 0;
				margin-bottom: 2rem;

				p {
					font-size: var(--font-m);
				}

				.links a {
					font-size: var(--font-m);
				}
				.links span {
					top: 6px;
				}
			}
		}

		@media screen and (max-width: 500px) {
			flex-direction: column;

			&-desc {
				width: 324px;

				h1 {
					font-size: 1.25rem;
				}

				p {
					font-size: 14px;
				}
			}

			&-directory {
				grid-template-columns: 154px 154px;
				height: 300px;

				a p {
					font-size: 0.75rem;
				}
				a h2 {
					font-size: 1rem;
				}
			}
		}

		@media screen and (max-height: 700px) and (max-width: 810px) {
			&-desc {
				margin-bottom: 1rem;
			}

			&-directory {
				height: 230px;
			}
		}
		@media screen and (max-height: 660px) and (max-width: 810px) {
			&-directory {
				height: 170px;
			}
		}
	}
}
.lang-en {
	.homepage-container-desc h1 {
		font-size: 1.25rem;
	}
	.homepage-container-desc p {
		font-size: 14px;
		line-height: 18px;
	}
}
</style>
