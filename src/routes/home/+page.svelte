<!-- src/routes/home/+page.svelte -->
<!-- src/routes/home/+page.svelte -->
<div class="image-outer">
	<div class="image-container">
		<img
			src="/photographs/kitchen-tall.png"
			class="recipe-collection"
			alt="Peterson Recipe Collection"
		/>
	</div>
</div>

<style>
	.image-outer {
		min-height: calc(80vh);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.image-container {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.recipe-collection {
		max-width: 415px;
		width: 80%;
		border-radius: 12px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		height: auto;
	}
</style>
