<script>
	let imageLoaded = false;
</script>

<section class="about-section">
	<div class="image-outer">
		<div class="image-container">
			<img
				src="/photographs/categories-overhead.png"
				alt="Overhead view of the Peterson recipe box"
				class:loaded={imageLoaded}
				on:load={() => (imageLoaded = true)}
				class="recipe-collection"
			/>
		</div>
	</div>

	<p class="about-text">
		A nostalgic archive of handwritten and printed recipes, continuously collected and preserved by the Peterson family since the 1980s. Digitized by scanning & OCR-GPT-transcribed in 2024–2025.
	</p>
</section>

<style>
	.about-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 85vh;
		padding: 2rem;
		box-sizing: border-box;
		text-align: center;
	}

	.image-outer {
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
		width: 94%;
		border-radius: 12px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		height: auto;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.recipe-collection.loaded {
		opacity: 1;
	}

	.about-text {
		font-family: Arial, sans-serif;
		font-size: 14px;
		color: black;
		line-height: 1.5;
		max-width: 640px;
	}
</style>
