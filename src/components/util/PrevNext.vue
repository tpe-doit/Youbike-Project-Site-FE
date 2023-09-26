<script setup>
import { useContentStore } from '../../store/contentStore';

defineProps(['mode']);

const contentStore = useContentStore();
</script>

<template>
	<RouterLink v-if="mode === 'prev'"
		:to="`/track/${contentStore.currentTrack}/${contentStore.currentTrackIndexes[contentStore.currentPageIndex - 1]}`"
		class="prevnext prev" @click="contentStore.checkAndSubmit">
		<hr>
		<span>keyboard_arrow_up</span>
		<hr>
	</RouterLink>
	<RouterLink v-else
		:to="`/track/${contentStore.currentTrack}/${contentStore.currentTrackIndexes[contentStore.currentPageIndex + 1]}`"
		class="prevnext next" @click="contentStore.checkAndSubmit">
		<hr>
		<span>keyboard_arrow_down</span>
		<hr>
	</RouterLink>
</template>

<style scoped lang="scss">
.prevnext {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;

	hr {
		width: 5rem;
		border-top: none;
		border-color: var(--color-complement-text);
		transition: border-color 0.3s;
	}

	span {
		margin: 0 0.5rem;
		font-size: 2rem;
		font-family: var(--font-icon);
		color: var(--color-complement-text);
		transition: color 0.3s;
	}

	&:hover {
		hr {
			border-color: white;
		}

		span {
			color: white
		}
	}
}

.prev {
	top: -2rem;
}

.next {
	bottom: -2rem;
}

@media screen and (max-width: 760px) {
	.prevnext {
		transform: rotate(-90deg);

		hr {
			display: none;
		}
	}

	.prev {
		top: auto;
		left: -1.5rem;
	}

	.next {
		bottom: auto;
		right: -1.5rem;
	}
}
</style>