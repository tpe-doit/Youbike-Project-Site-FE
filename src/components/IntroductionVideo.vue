<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "../store/appStore";
import HeaderBar from "./HeaderBar.vue";

const { t } = useI18n();

const appStore = useAppStore();

const entering = ref(false);

function enterHomePage() {
	entering.value = true;
	setTimeout(() => {
		appStore.closeIntroVideoPage();
	}, 2000);
}
</script>

<template>
	<div class="introductionvideo">
		<div class="introductionvideo-video">
			<video
				id="introvideo"
				autoplay
				loop
				preload
				muted
				playsinline
				defaultMuted
			>
				<source src="../assets/videos/kv.mp4#t=0.5" type="video/mp4" />
			</video>
		</div>
		<div
			:class="{
				'introductionvideo-content': true,
				'lang-en': appStore.lang === 'en' ? true : false,
			}"
		>
			<HeaderBar :is-video="true" />
			<div class="introductionvideo-content-title">
				<div class="main">
					<img src="../assets/images/TUIC.svg" />
					<div>
						<h1>{{ t("introvideo.title") }}</h1>
						<h2>{{ t("introvideo.subtitle") }}</h2>
					</div>
				</div>
				<div class="credit">
					<h3>{{ t("introvideo.team") }}</h3>
					<h3>{{ t("introvideo.partner") }}</h3>
				</div>
			</div>
			<div
				:class="{
					'introductionvideo-content-enter': true,
					entering: entering,
				}"
			>
				<button @click="enterHomePage">
					{{ t("introvideo.enter") }}<span>east</span>
				</button>
				<span>directions_bike</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.introductionvideo {
	position: relative;
	display: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	height: calc(var(--vh) * 100);
	z-index: 2;

	&-video {
		position: absolute;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		overflow-x: hidden;

		video {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
	}

	&-content {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		background-color: rgb(30, 30, 30, 0.7);

		&-title {
			display: flex;
			flex-direction: column;
			align-self: center;
			max-width: 80%;

			.main {
				display: flex;
				align-items: center;

				img {
					height: 8rem;
					filter: invert(1);
					margin-right: 2rem;
				}

				h1 {
					font-size: 3rem;
				}

				h2 {
					font-weight: 400;
				}
			}

			.credit {
				margin-top: 8rem;
				align-self: center;

				h3 {
					font-weight: 400;
				}
			}

			@media screen and (max-width: 1000px) {
				max-width: 90%;

				.main {
					img {
						height: 6rem;
					}

					h1 {
						font-size: 2rem;
					}

					h2 {
						font-size: var(--font-m);
					}
				}

				.credit {
					h3 {
						font-size: var(--font-m);
					}
				}
			}

			@media screen and (max-width: 760px) {
				.main {
					flex-direction: column;

					img {
						margin-right: 0;
						margin-bottom: 1rem;
						height: 8rem;
					}

					h1 {
						font-size: 2rem;
						text-align: center;
						margin-bottom: 1rem;
					}

					h2 {
						font-size: var(--font-m);
						text-align: justify;
					}
				}

				.credit {
					margin-top: 6rem;

					h3 {
						font-size: var(--font-m);
					}
				}
			}
			@media screen and (max-height: 660px) {
				.main {
					flex-direction: column;

					img {
						margin-right: 0;
						margin-bottom: 1rem;
						height: 6rem;
					}

					h1 {
						font-size: 1.8rem;
						text-align: center;
						margin-bottom: 1rem;
					}

					h2 {
						font-size: 0.8rem;
						text-align: justify;
					}
				}

				.credit {
					margin-top: 3rem;

					h3 {
						font-size: 0.75rem;
					}
				}
			}
		}

		&-enter {
			align-self: center;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 5rem;

			button {
				position: relative;
				width: 150px;
				height: 50px;
				display: flex;
				align-items: center;
				padding: 0.5rem 2rem 0.5rem 1rem;
				border-radius: 10px;
				border: solid 2px white;
				font-weight: 700;
				font-size: var(--font-xl);
				text-overflow: nowrap;
				overflow-x: hidden;
				z-index: 3;
				transition: width 0.2s, background-color 0.2s,
					border-color 0.2s 0.2s;

				span {
					position: absolute;
					right: 8px;
					font-family: var(--font-icon);
					font-size: var(--font-l);
					transition: right 0.2s, transform 0.3s 0.25s,
						opacity 0.2s 0.3s;
					transition-timing-function: ease;
				}

				&:hover {
					opacity: 0.7;

					span {
						right: 12px;
						transform: translate3d(28px, 0, 0);
						opacity: 0;
					}
				}
			}

			& > span {
				position: absolute;
				top: 4px;
				z-index: 2;
				font-family: var(--font-icon);
				font-size: 2.5rem;
				transform: translate3d(-5rem, -5rem, 0);
				transition: transform 2.5s, opacity 0.2s;
				transition-delay: 0.7s;
				opacity: 0;
			}

			@media screen and (max-height: 660px) {
				margin-bottom: 3rem;
			}
		}
	}
}

.entering {
	button {
		width: 0;
		padding: 0;
		color: rgb(0, 0, 0, 0);
		border-color: rgb(0, 0, 0, 0);

		span {
			color: rgb(0, 0, 0, 0);
		}
	}

	& > span {
		opacity: 1;
		transform: translate3d(5rem, 5rem, 0);
		rotate: -45deg;
	}
}
.lang-en {
	.introductionvideo-content-title .main h1 {
		font-size: 2.5rem;
	}
	.introductionvideo-content-title .main h2 {
		font-size: 1rem;
	}
	@media screen and (max-width: 1200px) {
		.introductionvideo-content-title .main h1 {
			font-size: 2.1rem;
		}
	}
	@media screen and (max-width: 1000px) {
		.introductionvideo-content-title .main h1 {
			font-size: 1.7rem;
		}
	}
	@media screen and (max-width: 760px) {
		.introductionvideo-content-title .main h2 {
			font-size: 0.8rem;
		}
		.introductionvideo-content-title .credit h3 {
			font-size: 0.75rem;
		}
	}
}
</style>
