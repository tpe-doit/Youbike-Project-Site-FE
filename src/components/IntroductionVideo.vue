<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../store/appStore';
import HeaderBar from './HeaderBar.vue';

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
			<video id="introvideo" src="../assets/videos/kv.mp4" autoplay loop preload muted playsinline
				defaultMuted></video>
		</div>
		<div class="introductionvideo-content">
			<HeaderBar :is-video="true" />
			<div class="introductionvideo-content-title">
				<div class="main">
					<img src="../assets/images/TUIC.svg" />
					<div>
						<h1>{{ t('introvideo.title') }}</h1>
						<h2>{{ t('introvideo.subtitle') }}</h2>
					</div>
				</div>
				<div class="credit">
					<h3>{{ t('introvideo.team') }}</h3>
					<h3>{{ t('introvideo.partner') }}</h3>
				</div>
			</div>
			<div :class="{ 'introductionvideo-content-enter': true, entering: entering }">
				<button @click="enterHomePage">{{ t('introvideo.enter') }}</button>
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
				width: 130px;
				height: 51px;
				padding: 0.5rem 1rem;
				background-color: white;
				border-radius: 10px;
				color: black;
				font-weight: 700;
				font-size: var(--font-xl);
				text-wrap: nowrap;
				overflow-x: hidden;
				z-index: 3;
				transition: width 0.5s, background-color 0.2s;

				&:hover {
					background-color: rgb(210, 210, 210);
				}
			}

			span {
				position: absolute;
				top: 4px;
				z-index: 2;
				font-family: var(--font-icon);
				font-size: 2.5rem;
				transition: transform 2.5s;
				transition-delay: 0.7s;
			}
		}
	}
}

.entering {
	button {
		width: 0;
		padding: 0;
		color: white;

		&:hover {
			color: rgb(210, 210, 210);
		}
	}

	span {
		transform: translateX(10rem);
	}
}
</style>