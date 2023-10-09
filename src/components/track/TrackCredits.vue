<script setup>
import { useI18n } from 'vue-i18n';
import { useAppStore } from '../../store/appStore'

const { t } = useI18n();
const appStore = useAppStore();
</script>

<template>
	<div :class="{trackcredits: true,'lang-en': appStore.lang === 'en' ? true : false}">
		<h2>{{ t('credits.title-1') }}</h2>
		<h2>{{ t('credits.title-2') }}</h2>
		<div class="trackcredits-cont">
			<RouterLink class="trackcredits-cont-button" :to="`/`">
				<span>north_east</span>
				{{ t('credits.btn-1') }}
			</RouterLink>
			<a href="" target="_blank" rel="noreferrer" class="trackcredits-cont-button"><span>north_east</span>{{
				t('credits.btn-2') }}</a>
			<a href="" target="_blank" rel="noreferrer" class="trackcredits-cont-button"><span>north_east</span>{{
				t('credits.btn-3') }}</a>
		</div>
	</div>
</template>

<style scoped lang="scss">
.trackcredits {
	padding: var(--font-l);

	h2 {
		font-size: 2.5rem;
	}

	&-cont {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: var(--font-s);
		margin-top: var(--font-l);

		&-button {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			padding-bottom: var(--font-s);
			min-height: 4rem;
			border: solid 2px white;
			border-radius: 10px;
			font-size: var(--font-m);
			font-weight: 700;
			transition: opacity 0.2s;

			span {
				position: absolute;
				top: 4px;
				right: 4px;
				font-family: var(--font-icon);
				font-size: var(--font-l);
				transition: top 0.2s, right 0.2s, transform 0.3s 0.25s, opacity 0.2s 0.3s;
				transition-timing-function: ease;
			}

			&:last-child {
				background-color: white;
				color: black;

				span {
					color: black;
				}
			}

			&:hover {
				opacity: 0.7;

				span {
					top: 12px;
					right: 12px;
					transform: translate3d(28px, -28px, 0);
					opacity: 0;
				}
			}
		}
	}

	@media screen and (max-width: 1000px) {
		width: min(350px, 85%);

		h2 {
			font-size: 2rem;
		}
	}
}
.lang-en {
	h2 {
		font-size: 1.75rem;
	}
	.trackcredits-cont-button {
		font-size: 14px;
	}

	@media screen and (max-width: 1000px) {
		h2 {
			font-size: 1.5rem;
		}
		.trackcredits-cont-button {
		font-size: 12px;
	}
	}
}
</style>