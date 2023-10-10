<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useContentStore } from "../store/contentStore";
import { useAppStore } from "../store/appStore";
import { useMapStore } from "../store/mapStore";

import HeaderBar from "../components/HeaderBar.vue";
import AnimationWrapper from "../components/util/AnimationWrapper.vue";
import PrevNext from "../components/util/PrevNext.vue";
import ProgressDots from "../components/util/ProgressDots.vue";
import MultipleChoice from "../components/track/MultipleChoice.vue";
import MapControlBtns from "../components/track/MapControlBtns.vue";
import MapLegend from "../components/track/MapLegend.vue";
import TrackCredits from "../components/track/TrackCredits.vue";
import TutorialOverlay from "../components/TutorialOverlay.vue";

import { allTracks } from "../assets/mapConfigs/allTracks";

const { BASE_URL } = import.meta.env;

const { t } = useI18n();
const contentStore = useContentStore();
const mapStore = useMapStore();
const appStore = useAppStore();

const isTeam = ref(true);

const currentPage = computed(() => {
	if (!contentStore.currentTrack) return "home";
	return allTracks[contentStore.currentTrack][contentStore.currentPageIndex];
});

function toggleCreditCards() {
	isTeam.value = isTeam.value ? false : true;
}

// function handleSwipeStart(e) {
// 	if (!appStore.isNarrowDevice || !appStore.isMobileDevice || !canSwipe.value) return;
// 	swipeX.value = +e.touches.item(0).clientX;

// 	canSwipe.value = false;
// }

// function handleSwipeEnd(e) {
// 	if (!appStore.isNarrowDevice || !appStore.isMobileDevice) return;
// 	if (Math.abs(+e.touches.item(0).clientX - +swipeX.value) < 1) {
// 		canSwipe.value = true;
// 		return;
// 	}

// 	if (+e.touches.item(0).clientX > +swipeX.value && contentStore.currentPageIndex > 0) {
// 		router.push(`/track/${contentStore.currentTrack}/${contentStore.currentTrackIndexes[contentStore.currentPageIndex - 1]}`);
// 	} else if (+e.touches.item(0).clientX < +swipeX.value && contentStore.currentPageIndex < contentStore.currentTrackIndexes.length - 1) {
// 		router.push(`/track/${contentStore.currentTrack}/${contentStore.currentTrackIndexes[contentStore.currentPageIndex + 1]}`);
// 	}

// 	setTimeout(() => {
// 		canSwipe.value = true;
// 	}, 5000);
// }
</script>

<template>
	<div>
		<HeaderBar />
		<div class="trackpage">
			<ProgressDots />
			<AnimationWrapper>
				<div
					:class="{
						'trackpage-main': true,
						'lang-en': appStore.lang === 'en' ? true : false,
					}"
					:key="`${contentStore.currentTrack}-${contentStore.currentPage}`"
					v-if="contentStore.currentTrack && contentStore.contentMode"
				>
					<PrevNext
						mode="prev"
						v-if="contentStore.currentPageIndex > 0"
					/>
					<MultipleChoice v-if="currentPage.multipleChoice" />
					<TrackCredits v-else-if="currentPage.index === 'credits'" />
					<div v-else class="trackpage-main-content">
						<h2>
							{{ t(`${currentPage.index}.title`) }}
						</h2>
						<p>
							{{ t(`${currentPage.index}.content`) }}
						</p>
						<i v-if="currentPage.caption">{{
							t(`${currentPage.index}.note`)
						}}</i>
					</div>
					<PrevNext
						mode="next"
						v-if="
							contentStore.currentPageIndex <
							contentStore.currentTrackIndexes.length - 1
						"
					/>
				</div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div
					class="trackpage-mapcontrols"
					v-if="currentPage.mapControls && contentStore.mapMode"
				>
					<MapControlBtns v-if="currentPage.mapControls.length > 1" />
					<div class="trackpage-mapcontrols-title">
						<h3
							:key="`${contentStore.currentTrack}-${
								contentStore.currentPage
							}-map-${mapStore.currentMap + 1}`"
							:style="{
								fontSize:
									appStore.lang === 'en' ? '16px' : '20px',
							}"
						>
							{{
								t(
									`${currentPage.index}.map-${
										mapStore.currentMap + 1
									}`
								)
							}}
						</h3>
					</div>
				</div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div
					class="trackpage-maplegend"
					v-if="currentPage.mapControls && contentStore.mapMode"
					:key="`${contentStore.currentTrack}-${
						contentStore.currentPage
					}-legend-${mapStore.currentMap + 1}`"
				>
					<MapLegend />
				</div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div
					class="trackpage-maptoggle"
					v-if="currentPage.mapControls && appStore.isNarrowDevice"
				>
					<button
						@click="contentStore.toggleContentMapMode()"
						:class="{ flip: !contentStore.contentMode }"
					>
						{{ t("tomapmode") }}
					</button>
					<button
						@click="contentStore.toggleContentMapMode()"
						:class="{ flip: contentStore.contentMode }"
					>
						{{ t("tocontentmode") }}
					</button>
				</div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div class="trackpage-image" v-if="currentPage.images">
					<img
						:src="`${BASE_URL}/images/${currentPage.index}${
							currentPage.images === 'nocaption' &&
							appStore.lang === 'en'
								? '-en'
								: ''
						}.png`"
						:alt="t(`${currentPage.index}.image`)"
					/>
					<h3 v-if="currentPage.images !== 'nocaption'">
						{{ t(`${currentPage.index}.image`) }}
					</h3>
				</div>
				<div v-else></div>
			</AnimationWrapper>
			<AnimationWrapper>
				<div
					class="trackpage-credits"
					v-if="currentPage.index === 'credits'"
				>
					<div
						:class="{
							'trackpage-credits-card': true,
							flip: !isTeam,
						}"
					>
						<button
							v-if="appStore.isNarrowDevice"
							@click="toggleCreditCards"
						>
							<span>analytics</span>
						</button>
						<h3>{{ t("credits.team") }}</h3>
						<p>{{ t("credits.team-1") }}</p>
						<p>{{ t("credits.team-2") }}</p>
						<p>{{ t("credits.team-3") }}</p>
						<p>{{ t("credits.team-4") }}</p>
						<p>{{ t("credits.team-5") }}</p>
						<p>{{ t("credits.team-6") }}</p>
						<p>{{ t("credits.team-7") }}</p>
						<p>{{ t("credits.team-8") }}</p>
					</div>
					<div
						:class="{
							'trackpage-credits-card': true,
							flip: isTeam,
						}"
					>
						<button
							v-if="appStore.isNarrowDevice"
							@click="toggleCreditCards"
						>
							<span>diversity_3</span>
						</button>
						<h3>{{ t("credits.data") }}</h3>
						<p>{{ t("credits.data-1") }}</p>
						<p>{{ t("credits.data-2") }}</p>
						<p>{{ t("credits.data-3") }}</p>
						<p>{{ t("credits.data-4") }}</p>
						<p>{{ t("credits.data-5") }}</p>
						<p>{{ t("credits.data-6") }}</p>
						<p>{{ t("credits.data-7") }}</p>
						<p>{{ t("credits.data-8") }}</p>
					</div>
				</div>
				<div v-else></div>
			</AnimationWrapper>
		</div>
		<AnimationWrapper>
			<TutorialOverlay v-if="appStore.isFirstTime !== 'not'" />
		</AnimationWrapper>
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
				font-size: 18px;
			}

			i {
				display: block;
				color: rgb(205, 205, 205);
				font-size: var(--font-s);
			}
		}

		@media screen and (max-width: 1000px) {
			width: 350px;

			&-content {
				background-color: rgba(106, 106, 106, 0.9);
				p {
					font-size: var(--font-m);
					margin-bottom: 0;
				}
				i {
					margin-top: 0.5rem;
				}
			}
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
		display: flex;
		border-radius: 10px;

		button {
			position: absolute;
			top: 0;
			left: 0;
			padding: 3px 6px;
			width: 135px;
			background-color: white;
			border-radius: 10px;
			font-size: var(--font-m);
			color: black;
			font-weight: 700;
			z-index: 11;
			transition: opacity 0.2s, transform 0.5s;
		}

		.flip {
			transform: rotateX(180deg);
			z-index: 1;
			opacity: 0;
		}
	}

	&-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 350px;
		margin-left: 3rem;

		img {
			width: 100%;
			border-radius: 10px;
		}

		h3 {
			width: 100%;
			padding: var(--font-s) 0;
			text-align: center;
			background-color: white;
			border-radius: 10px;
			color: black;
			box-shadow: var(--color-component-background) 0 -2px 10px;
			font-weight: 400;
			transform: translateY(-1rem);
		}

		@media screen and (max-width: 1000px) {
			margin-left: 1rem;
		}

		@media screen and (max-width: 760px) {
			margin-left: 0rem;
			margin-bottom: 1rem;
			flex-direction: column-reverse;
			width: min(310px, calc(85% - 40px));

			h3 {
				box-shadow: var(--color-component-background) 0 2px 10px;
				transform: translateY(1rem);
			}
		}
	}

	&-credits {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: var(--font-s);
		width: 450px;
		margin-left: 3rem;

		&-card {
			background-color: var(--color-track-items);
			border-radius: 10px;
			padding: var(--font-m);
			transition: opacity 0.2s, transform 0.5s;

			h3 {
				font-size: var(--font-l);
				margin-bottom: 6px;
			}

			p {
				font-size: 0.85rem;
			}
		}

		@media screen and (max-width: 1000px) {
			grid-template-columns: 1fr;
			row-gap: var(--font-s);
			width: 225px;
		}

		@media screen and (max-width: 760px) {
			margin-left: 0;
			width: min(250px, 80%);
			display: flex;
			justify-content: center;
			position: relative;

			button {
				position: absolute;
				right: 1.2rem;
				top: 1.2rem;

				span {
					font-size: var(--font-xl);
				}
			}

			&-card {
				position: absolute;
				bottom: 0;
				width: 100%;
				z-index: 2;
			}

			.flip {
				transform: rotateY(180deg);
				z-index: 1;
				opacity: 0;
			}
		}

		@media screen and (max-height: 660px) {
			h3 {
				font-size: 1.1rem;
			}

			p {
				font-size: 13px;
				line-height: 18px;
			}

			button span {
				font-size: 1.25rem;
			}
		}
	}

	@media screen and (max-width: 760px) {
		flex-direction: column-reverse;

		&-main {
			flex-direction: row;
			width: min(350px, 85%);

			&-content {
				margin: 0 var(--font-l);

				h2 {
					font-size: 1.25rem;
				}

				p {
					font-size: 14px;
				}
			}
		}
	}

	@media screen and (max-height: 660px) {
		&-main-content {
			padding: var(--font-m);

			h2 {
				font-size: 1.1rem;
			}

			p {
				font-size: 13px;
				line-height: 17px;
			}
		}
	}
}
.lang-en {
	.trackpage-main-content h2 {
		font-size: 1.25rem;
	}
	.trackpage-main-content p {
		font-size: 14px;
		line-height: 18px;
	}
	@media screen and (max-height: 660px) {
		.trackpage-main-content {
			h2 {
				font-size: 1.1rem;
			}

			p {
				font-size: 13px;
				line-height: 17px;
			}
		}
	}
}
</style>
