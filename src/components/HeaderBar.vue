<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../store/appStore';

defineProps({
	isVideo: {
		default: false,
		type: Boolean
	},
	isHome: {
		default: false,
		type: Boolean
	}
});

const router = useRouter();
const { t, locale } = useI18n();

const appStore = useAppStore();

const isPlaying = ref(true);

function toggleLang() {
	const changeTo = appStore.lang === 'en' ? 'ch' : 'en';
	localStorage.setItem("lang", changeTo);
	locale.value = changeTo;
	appStore.toggleLang(changeTo);
}

function toggleVideoPlayback() {
	const videoplayer = document.getElementById('introvideo');
	isPlaying.value = isPlaying.value ? false : true;

	if (isPlaying.value) {
		videoplayer.play();
	} else {
		videoplayer.pause();
	}
}
</script>

<template>
	<div class="headerbar">
		<button v-if="isVideo" @click="toggleVideoPlayback"><span :class="{ black: isVideo }">{{ isPlaying ?
			'pause_circle_filled' :
			'play_circle_filled' }}</span></button>
		<button v-if="!isHome && !isVideo" @click="router.push('/')"><span :class="{ black: isVideo }">home</span></button>
		<button :class="{ 'headerbar-lang': true, black: isVideo }" @click="toggleLang">{{ t('oppositeLanguage') }}</button>
	</div>
</template>

<style scoped lang="scss">
.headerbar {
	position: relative;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-top: var(--font-m);
	padding-right: var(--font-m);
	z-index: 10;

	button {
		height: 1.6rem;
		margin-left: 4px;
	}

	span {
		font-size: 1.75rem
	}

	&-lang {
		width: 2rem;
		font-size: var(--font-m);
		line-height: var(--font-m);
		border: solid white 1px;
		border-radius: 10px;
	}
}

.black {
	color: white;
}
</style>