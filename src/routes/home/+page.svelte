<script>
	let imageLoaded = false;
</script>

<div class="image-outer">
	<div class="image-container">
		<img
			src="/photographs/kitchen-tall.png"
			alt="Peterson Recipe Collection"
			class:loaded={imageLoaded}
			on:load={() => (imageLoaded = true)}
			class="recipe-collection"
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
