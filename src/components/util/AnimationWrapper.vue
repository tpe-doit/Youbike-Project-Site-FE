<script setup>
</script>

<template>
	<Transition name="fade" mode="out-in">
		<slot></slot>
	</Transition>
</template>

<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.7s ease;
}
</style>