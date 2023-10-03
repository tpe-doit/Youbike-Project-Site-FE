<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useContentStore } from '../../store/contentStore';

const { t } = useI18n();
const contentStore = useContentStore();

const selected = ref(null);

function handleClick() {
	// eslint-disable-next-line no-undef
	gtag('event', contentStore.currentPage, {
		event_category: 'YouBike Survey',
		event_label: t(`${contentStore.currentPage}.ans-${selected.value}`),
	});
}

onMounted(() => {
	selected.value = contentStore.answers[contentStore.currentPage];
});
</script>

<template>
	<div class="multiplechoice">
		<h2>{{ t(`${contentStore.currentPage}.title`) }}</h2>
		<div v-for="i in [1, 2, 3, 4]" :key="`${contentStore.currentTrack}-${contentStore.currentPage}-Q${i}`"
			class="multiplechoice-option">
			<input type="radio" :value="i" :id="`${contentStore.currentTrack}-${contentStore.currentPage}-Q${i}`"
				:name="`${contentStore.currentTrack}-${contentStore.currentPage}`" v-model="selected"
				@change="contentStore.submitAnswer(contentStore.currentPage, selected)" @click="handleClick"
				:disabled="selected">
			<label :for="`${contentStore.currentTrack}-${contentStore.currentPage}-Q${i}`">
				<div class="label">
					<div class="circle">
						<div></div>
					</div>
					<p>{{ t(`${contentStore.currentPage}.ans-${i}`) }}</p>
				</div>
			</label>
		</div>
	</div>
</template>

<style scoped lang="scss">
.multiplechoice {
	h2 {
		border-radius: 10px;
		background-color: rgba(106, 106, 106, 0.75);
		padding: var(--font-l);
		margin: var(--font-l) 0 var(--font-m);
	}

	&-option {
		input {
			display: none;
		}

		label .label {
			display: flex;
			align-items: center;
			padding: var(--font-s) var(--font-l);
			border: solid 2px var(--color-complement-text);
			border-radius: 10px;
			cursor: pointer;
			margin-bottom: var(--font-m);
			transition: background-color 0.3s, border-color 0.3s;

			.circle {
				display: flex;
				align-items: center;
				justify-content: center;
				width: var(--font-m);
				height: var(--font-m);
				margin-right: 1rem;
				border-radius: 50%;
				border: solid 1px var(--color-complement-text);

				div {
					width: 0px;
					height: 0px;
					border-radius: 50%;
					transition: width 0.3s, height 0.3s, background-color 0.3s;
				}
			}

			p {
				text-align: justify;
				font-size: var(--font-m);
				transition: color 0.3s;
			}
		}

		input:checked+label .label {
			background-color: white;
			border-color: white;

			.circle div {
				width: 10px;
				height: 10px;
				background-color: var(--color-complement-text);
			}

			p {
				color: var(--color-complement-text)
			}
		}

		input:disabled+label .label {
			opacity: 0.7;
			cursor: not-allowed;
		}
	}

	@media screen and (max-width: 760px) {
		width: min(350px, 85%);

		h2 {
			margin: 0 0 var(--font-s);
		}

		&-option label .label {
			margin-bottom: var(--font-s);
		}
	}
}
</style>