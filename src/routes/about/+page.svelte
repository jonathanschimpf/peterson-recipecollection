<!-- ABOUT -->
<script>
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
</script>

<section class="about-section">
	<p class="about-text">
		A nostalgic archive of handwritten and printed family recipes collected since the mid-1980s.
		<br />
		Scanned and OCR-GPT-transcribed in 2024–2025.
	</p>
</section>

<style>
	.about-section {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 70vh;
		padding: 2rem;
		box-sizing: border-box;
		text-align: center;
	}

	.about-text {
		font-family: Arial, sans-serif;
		font-size: 15px;
		color: black;
		line-height: 1.5;
	}
</style>

