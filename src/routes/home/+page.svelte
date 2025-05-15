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
