<script lang="ts">
	import { marked } from 'marked';
	import ScanModal from '$lib/components/ScanModal.svelte';

	// LOAD DATA FROM SERVER
	export let data;
	const { title, content, image } = data;

	// MODAL STATE CONTROL
	let showModal = false;
	const closeModal = () => {
		showModal = false;
	};

	// ZOOM TOGGLE
	let zoomed = false;
	const toggleZoom = (event: MouseEvent) => {
		event.stopPropagation();
		zoomed = !zoomed;
	};
</script>

<!-- BACK LINK -->
<a href="/categories/appetizers" class="back-arrow">←</a>

<!-- RECIPE TITLE -->
<h1 class="recipe-title">{title}</h1>

<!-- RECIPE SCAN THAT TRIGGERS MODAL -->
<div class="recipe-container">
	<button
		class="image-button"
		type="button"
		aria-label="Open full-size scan of recipe"
		on:click={() => (showModal = true)}
	>
		<img src={image} alt={`Scan of ${title}`} class="recipe-image" />
	</button>
</div>

<!-- MODAL WITH FULL-SIZE SCAN -->
<ScanModal isOpen={showModal} close={closeModal}>
	<button
		class="zoom-wrapper"
		type="button"
		aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
		on:click={toggleZoom}
	>
		<img
			src={image}
			alt={`Full-size scan of ${title}`}
			class="full-scan {zoomed ? 'zoomed' : ''}"
		/>
	</button>
</ScanModal>

<!-- TRANSCRIBED RECIPE TEXT -->
{#if content}
	<div class="recipe-text">
		{@html marked(content)}
	</div>
{:else}
	<div class="recipe-text">
		<p><em>LOADING MARKDOWN...</em></p>
	</div>
{/if}

<style>
	/* BACK ARROW */
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

	/* RECIPE TITLE */
	.recipe-title {
		text-align: center;
		font-size: 2em;
		font-weight: bold;
		margin-bottom: 20px;
	}

	/* OUTER FLEX CONTAINER */
	.recipe-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		width: 100%;
		padding-bottom: 20px;
	}

	/* RESET BUTTON STYLING */
	.image-button {
		all: unset;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 500px;
	}

	/* SCAN PREVIEW IMAGE ON PAGE */
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

	/* FULL-SIZE SCAN IN MODAL */
	.full-scan {
		max-width: 100%;
		height: auto;
		display: block;
		border-radius: 4px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
		cursor: zoom-in;
		user-select: none;
		transition: transform 0.25s ease;
		margin: 0 auto;
	}

	/* WHEN ZOOMED IN */
	.zoomed {
		cursor: grab;
		transform: scale(2);
	}

	.zoomed:active {
		cursor: grabbing;
	}

	/* TRANSCRIBED TEXT STYLING */
	.recipe-text {
		text-align: center;
		padding: 20px;
		font-size: 1.2em;
		line-height: 1.5;
		max-width: 800px;
		margin: 0 auto 80px;
	}
</style>
