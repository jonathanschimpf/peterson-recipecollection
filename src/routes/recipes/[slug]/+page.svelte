<script lang="ts">
	import { onMount } from 'svelte';
	import type { Recipe } from '../../../types/json';
	import ScanModal from '$lib/components/ScanModal.svelte'; // 🛠 OKAY NOW

	export let data: { recipe: Recipe; htmlContent: string };

	const { recipe, htmlContent } = data;
	let showModal = false;

	onMount(() => {
		window.scrollTo(0, 0);
	});

	const backLink = `/categories/${recipe.category.toLowerCase().replace(/\s+/g, '-')}`;
</script>

<a href={backLink} class="back-link">←</a>

<h1 class="recipe-title">{recipe.recipe_name}</h1>

<div class="scan-wrapper">
	<button class="scan-button" on:click={() => (showModal = true)}>
		<img src={recipe.image_path} alt="Recipe scan" class="scan-thumb" />
	</button>
</div>

<div class="markdown">
	<div class="markdown-inner">
		{@html htmlContent}
	</div>
</div>

<ScanModal imageUrl={recipe.image_path} isOpen={showModal} close={() => (showModal = false)} />

<style>
	/* == YOUR EXISTING STYLES INCLUDED EXACTLY AS-IS == */
	@media (max-width: 768px) {
		.scan-thumb {
			max-width: 70% !important ;
		}
	}
	@media (max-width: 480px) {
		.scan-thumb {
			max-width: 75% !important ;
		}
		:global(.recipe-title) {
			font-size: 20px !important ;
		}
		:global(.markdown) {
			font-size: 13px !important ;
		}
	}
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
		font-size: 2.5rem;
		margin: 2rem 0 1rem;
		font-family: Arial, sans-serif;
		font-size: 28px;
	}
	.scan-wrapper {
		display: flex;
		justify-content: center;
		margin: 1.5rem 0;
	}
	.scan-button {
		background: none;
		border: none;
		padding: 0;
		cursor: zoom-in;
	}
	.scan-thumb {
		max-width: 33%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
	}
	.markdown {
		max-width: 700px;
		margin: 2rem auto;
		padding: 0 1rem;
		font-size: 1.125rem;
		line-height: 1.6;
		font-family: Arial, sans-serif;
		font-size: 16px;
	}
	.markdown-inner {
		text-align: center;
	}
</style>
