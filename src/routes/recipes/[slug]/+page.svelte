<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Recipe } from '../../../types/json';
	import ScanModal from '$lib/components/ScanModal.svelte';

	export let data: { recipe: Recipe; htmlContent: string; credit: string | null };

	const { recipe, htmlContent, credit } = data;
	let showModal = false;

	onMount(() => {
		window.scrollTo(0, 0);
	});

	const backLink = `/categories/${recipe.category.toLowerCase().replace(/\s+/g, '-')}`;
</script>

<svelte:head>
	{#if recipe?.image_path}
		<link rel="preload" as="image" href={recipe.image_path} />
	{/if}
</svelte:head>

<div transition:fade={{ duration: 250 }}>
	<a href={backLink} class="back-link">←</a>

	<h1 class="recipe-title">{recipe.recipe_name}</h1>

	<div class="scan-wrapper">
		<div class="scan-container">
			<button class="scan-button" on:click={() => (showModal = true)}>
				<img src={recipe.image_path} alt="Recipe scan" class="scan-thumb" />
			</button>

			{#if credit}
				<div class="recipe-credit">{credit}</div>
			{/if}
		</div>
	</div>

	<div class="markdown">
		<div class="markdown-inner">
			{@html htmlContent}
		</div>
	</div>
</div>

<ScanModal imageUrl={recipe.image_path} isOpen={showModal} close={() => (showModal = false)} />

<style>
	/* -----------------   FORCE IT   -----------------*/
	img {
		image-rendering: crisp-edges !important;
		image-rendering: -webkit-optimize-contrast !important;
		backface-visibility: hidden !important;
	}
	/* ----------------- MOBILE FIRST ----------------- */
	.back-link {
		font-size: 2rem;
		text-decoration: none;
		margin-left: 1rem;
		color: black;
		transition: color 0.2s ease;
	}
	.back-link:hover {
		color: grey;
	}

	.recipe-title {
		text-align: center;
		font-size: 20px;
		margin: 2rem 0 1rem;
		font-family: Arial, sans-serif;
	}

	.scan-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1.5rem 0;
		position: relative;
	}

	.scan-container {
		width: 85%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.scan-button {
		background: none;
		border: none;
		padding: 0;
		cursor: zoom-in;
	}

	.scan-thumb {
		width: 100%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
	}

	.recipe-credit {
		font-size: 10px;
		color: #888;
		padding-top: 0.5rem;
		padding-right: 0.25rem;
		align-self: flex-end;
	}

	.markdown {
		max-width: 700px;
		margin: 2rem auto 4rem;
		padding: 0 1rem;
		font-size: 13px;
		line-height: 1.6;
		font-family: Arial, sans-serif;
	}

	.markdown-inner {
		text-align: center;
	}

	/* ----------------- TABLET ----------------- */
	@media (min-width: 481px) {
		.recipe-title {
			font-size: 24px;
		}
		.markdown {
			font-size: 15px;
		}
	}

	/* ----------------- DESKTOP ----------------- */
	@media (min-width: 769px) {
		.recipe-title {
			font-size: 28px;
		}
		.scan-container {
			max-width: 33%;
			width: 100%;
		}
		.markdown {
			font-size: 16px;
		}
	}
</style>
