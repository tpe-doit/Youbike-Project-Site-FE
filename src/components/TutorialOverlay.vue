<script setup>
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../store/appStore';

const { t } = useI18n();
const appStore = useAppStore();
</script>

<template>
	<div class="tutorialoverlay" @click="appStore.toggleIsFirstTime">
		<div class="tutorialoverlay-item flex-reverse"
			:style="{ transform: appStore.isNarrowDevice ? 'translate3d(0.65rem, -5em, 0)' : 'translate3d(0.65rem, -6rem, 0)' }">
			<p>{{ t('tutorial.dots') }}</p>
			<span class="updown">south</span>
		</div>
		<div class="tutorialoverlay-item"
			:style="{ transform: appStore.isNarrowDevice ? 'translate3d(100px, -255px, 0)' : 'translate3d(190px, 250px, 0)' }">
			<p>{{ t('tutorial.next') }}</p>
			<span :class="appStore.isNarrowDevice ? 'leftright' : 'updown'">{{ appStore.isNarrowDevice ? 'east' : 'north'
			}}</span>
		</div>
		<div class="tutorialoverlay-item" :style="{ right: '12px', top: '3rem' }">
			<p>{{ t('tutorial.header') }}</p>
			<span class="updown">north</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.tutorialoverlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	height: calc(var(--vh) * 100);
	display: flex;
	align-items: center;
	background-color: var(--color-overlay);
	z-index: 20;
	cursor: pointer;

	&-item {
		position: absolute;
		display: flex;
		align-items: center;

		p {
			font-size: var(--font-l);
			margin: 0 4px;
		}

		span {
			font-family: var(--font-icon);
			font-size: var(--font-l);
			color: white;

			&.updown {
				animation: updown 1s ease-in-out infinite;
			}

			&.leftright {
				animation: leftright 1s ease-in-out infinite;
			}
		}
	}

	@media screen and (max-width: 760px) {
		flex-direction: column;
		justify-content: flex-end;

		&-content p {
			font-size: var(--font-m);
		}
	}
}

.flex-reverse {
	flex-direction: row-reverse;
}

@keyframes updown {
	0% {
		transform: translateY(-5px);
	}

	50% {
		transform: translateY(5px);
	}

	100% {
		transform: translateY(-5px);
	}
}

@keyframes leftright {
	0% {
		transform: translateX(-5px);
	}

	50% {
		transform: translateX(5px);
	}

	100% {
		transform: translateX(-5px);
	}
}
</style>