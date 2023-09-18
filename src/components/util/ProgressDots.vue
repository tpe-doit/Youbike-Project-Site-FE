<script setup>
import { useContentStore } from '../../store/contentStore';

const contentStore = useContentStore();
</script>

<template>
	<div class="contentdots">
		<RouterLink v-for="(dot, index) in contentStore.currentTrackIndexes"
			:class="{ current: index === contentStore.currentPageIndex }" :key="`${contentStore.currentTrack}-${dot}-dot`"
			:to="`/track/${contentStore.currentTrack}/${dot}`" @click="contentStore.toggleContentMapMode('content')">
		</RouterLink>
	</div>
</template>

<style scoped lang="scss">
.contentdots {
	position: relative;
	height: fit-content;
	display: flex;
	flex-direction: column;
	margin: 0 1rem;
	z-index: 2;

	a {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 0.5rem;
		background-color: var(--color-complement-text);
		margin: 3px 0;
		cursor: pointer;
		transition: width 0.5s, height 0.5s;
	}

	a.current {
		height: 1.9rem;
		background-color: white;
	}

	@media screen and (max-width: 760px) {
		flex-direction: row;
		align-items: center;
		margin: 1rem 0 3rem;

		a {
			margin: 0 3px;
		}

		a.current {
			height: 0.5rem;
			width: 1.9rem;
		}
	}
}
</style>