<script lang="ts">
	import { onMount } from 'svelte';
	import ScanModal from '$lib/components/ScanModal.svelte';
	import type { Recipe } from '../../../types/json';

	export let data: { recipe: Recipe; text: string };

	const { recipe, text } = data;
	let showModal = false;

	// 🧭 SCROLL TO TOP ON PAGE LOAD
	onMount(() => {
		window.scrollTo(0, 0);
	});

	// 🔙 BACK LINK FROM CATEGORY
	const backLink = `/categories/${recipe.category.toLowerCase().replace(/\s+/g, '-')}`;
</script>

<!-- 🔙 BACK ARROW -->
<a href={backLink} class="back-link">←</a>

<!-- 📝 TITLE -->
<h1 class="recipe-title">{recipe.recipe_name}</h1>

<!-- 🖼️ SCAN THUMBNAIL (TRIGGERS MODAL) -->
<div class="scan-wrapper">
	<button class="scan-button" on:click={() => (showModal = true)}>
		<img src={recipe.image_path} alt="Recipe scan" class="scan-thumb" />
	</button>
</div>

<!-- 📜 RECIPE TRANSCRIPTION -->
<div class="markdown">
	<div class="markdown-inner">
		{@html text}
	</div>
</div>

<!-- 🔍 MODAL IMAGE ZOOM -->
<ScanModal imageUrl={recipe.image_path} isOpen={showModal} close={() => (showModal = false)} />

<style>
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
		max-width: 65%;
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
	}

	.markdown-inner {
		text-align: center;
	}
</style>
