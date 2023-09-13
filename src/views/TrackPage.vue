<script setup>
import HeaderBar from '../components/HeaderBar.vue';
import AnimationWrapper from '../components/util/AnimationWrapper.vue';
import { useContentStore } from '../store/contentStore';

const contentStore = useContentStore();
</script>

<template>
	<AnimationWrapper>
		<div>
			<HeaderBar />
		</div>
	</AnimationWrapper>
</template>

<style scoped lang="scss"></style>