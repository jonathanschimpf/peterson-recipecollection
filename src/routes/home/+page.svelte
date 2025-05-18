<script lang="ts">
	import { onMount, tick } from 'svelte';

	let imageLoaded = false;

	onMount(async () => {
		const img = document.querySelector('img.recipe-collection') as HTMLImageElement | null;

		if (!img) return;

		if (img.complete) {
			await tick(); // WAIT FOR DOM TO BIND CLASS DIRECTIVE
			imageLoaded = true;
		} else {
			img.addEventListener('load', async () => {
				await tick();
				imageLoaded = true;
			});
			img.addEventListener('error', () => console.error(`Failed to load ${img.src}`));
		}
	});
</script>

<div class="image-outer">
	<div class="image-container">
		<img
			src="/photographs/kitchen-tall.png"
			alt="Peterson Recipe Collection"
			loading="eager"
			decoding="async"
			class="recipe-collection"
			class:loaded={imageLoaded}
		/>
	</div>
</div>

<style>
	.image-outer {
		padding: 0.5rem 1rem 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 80vh;
	}

	.image-container {
		display: flex;
		justify-content: center;
		width: 100%;
		min-height: 315px; /* 3:2 IMAGE SPACE RESERVED */
	}

	.recipe-collection {
		max-width: 415px;
		width: 80%;
		border-radius: 12px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		height: auto;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.recipe-collection.loaded {
		opacity: 1;
	}
</style>
