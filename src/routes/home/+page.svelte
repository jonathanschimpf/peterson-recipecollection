<!-- src/routes/home/+page.svelte -->
<div class="image-container">
	<img
		src="/photographs/kitchen-tall.png"
		class="recipe-collection"
		alt="Peterson Recipe Collection"
	/>
</div>

<style>
	.image-container {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.recipe-collection {
		max-width: 415px;
		width: 80%;
		border-radius: 12px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		height: auto;
	}
</style>
