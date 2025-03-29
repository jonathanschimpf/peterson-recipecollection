<script lang="ts">
	import { marked } from 'marked';
	import ScanModal from '$lib/components/ScanModal.svelte';

	export let data: {
		slug: string;
		recipeName: string;
		markdown: string;
		imageUrl: string;
	};

	let isModalOpen = false;

	const openModal = () => {
		isModalOpen = true;
	};

	const closeModal = () => {
		isModalOpen = false;
	};
</script>

<!-- BACK BUTTON -->
<a href="/categories/appetizers" class="back-arrow">←</a>

<!-- PAGE CONTENT WRAPPER -->
<div class="recipe-page">
	<!-- RECIPE TITLE -->
	<h1 class="recipe-title">{data.recipeName}</h1>

	<!-- IMAGE SCAN (TRIGGERS MODAL) -->
	<div class="image-wrapper">
		<button class="image-button" on:click={openModal} aria-label="Open full recipe scan">
			<img src={data.imageUrl} alt="Scanned recipe" class="recipe-image" />
		</button>
	</div>

	<!-- MODAL -->
	<ScanModal isOpen={isModalOpen} close={closeModal} imageUrl={data.imageUrl} />

	<!-- TRANSCRIBED MARKDOWN -->
	<div class="recipe-text">
		{@html marked(data.markdown ?? '')}
	</div>
</div>

<style>
	.back-arrow {
		text-decoration: none;
		font-size: 24px;
		font-weight: bold;
		color: black;
		display: inline-block;
		margin: 1rem;
		transition: color 0.2s ease-in-out;
	}

	.back-arrow:hover,
	.back-arrow:active {
		color: lightgrey;
	}

	.recipe-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
	}

	.recipe-title {
		text-align: center;
		font-size: 2em;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.image-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.image-button {
		all: unset;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 500px;
	}

	.recipe-image {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 6px;
		border: none;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
		transition: box-shadow 0.2s ease-in-out;
	}

	.recipe-image:hover {
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
	}

	.recipe-text {
		text-align: center;
		padding: 20px;
		font-size: 1.2em;
		line-height: 1.5;
		max-width: 800px;
		margin: 0 auto 80px;
	}
</style>
