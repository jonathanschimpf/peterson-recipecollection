<script lang="ts">
	import { onMount } from 'svelte';

	// IMPORT DATA FROM SERVER
	export let data;
	let loaded = false;

	// FADE-IN EFFECT AFTER DATA LOADS
	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 150); // SLIGHT DELAY FOR SMOOTHER TRANSITION
	});
</script>

<!-- ← BACK LINK-->
<a href="/categories" class="back-link fade-in">←</a>

{#if loaded}
	<div class="fade-in">
		<div class="staycentered">
			<h1>Desserts</h1>

			{#if data.desserts.length > 0}
				<ul>
					{#each data.desserts as recipe}
						<li>
							<a href={`/recipes/${recipe.recipe_name.replace(/\s+/g, '-').toLowerCase()}`}>
								<!-- CROPPED THUMBNAIL DISPLAY -->
								<div class="thumb-container">
									<img
										class="recipe-thumb"
										src={recipe.image_path}
										alt={recipe.recipe_name}
										on:error={(event) => {
											const target = event.target as HTMLImageElement;
											if (target) target.style.display = 'none';
										}}
									/>
								</div>

								<!-- DISPLAY RECIPE NAME -->
								<span class="recipe-title">{recipe.recipe_name}</span>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No dessert recipes found.</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* FADE-IN EFFECT */
	.fade-in {
		opacity: 0;
		animation: fadeIn 0.6s ease-in-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* ← BACK LINK */
	.back-link {
		font-size: 2rem;
		text-decoration: none;
		margin-left: 1rem;
		color: black;
		transition: color 0.2s ease;
		display: inline; /* FIXES THE BLOCK BEHAVIOR */
		padding: 0; /* REMOVE EXTRA SPACE */
		background: transparent; /* PREVENT HOVER FILL-IN */
	}
	.back-link:hover {
		color: grey;
		background: transparent; /* PREVENT HOVER FILL-IN */
	}

	/* PAGE CONTAINER CENTERED */
	.staycentered {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding-top: 20px;
	}

	/* STYLING FOR HEADER */
	h1 {
		font-size: 32px;
		font-family: Arial, sans-serif;
		margin-bottom: 20px;
	}

	/* REMOVE DEFAULT LINK STYLES */
	a {
		text-decoration: none;
		color: black;
		display: flex;
		align-items: center; /* ALIGN IMAGE + TEXT */
		gap: 20px;
		padding: 10px;
		border-radius: 8px;
		transition: background 0.3s ease-in-out;
	}

	/* HOVER EFFECT */
	a:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	/* CENTER THE LIST */
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start; /* ENSURE ALL ITEMS ALIGN LEFT */
	}

	/* STYLE LIST ITEMS */
	li {
		font-size: 20px;
		font-family: Arial, sans-serif;
		text-align: left;
		margin: 12px 0;
		display: flex;
		align-items: center;
	}

	/* CONTAINER FOR THUMBNAILS */
	.thumb-container {
		width: 100px; /* FIXED SIZE */
		height: 100px;
		overflow: hidden;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
	}

	/* CROPPED THUMBNAIL IMAGE */
	.recipe-thumb {
		width: 250px; /* ZOOMED IN */
		height: 250px; /* ZOOMED IN */
		object-fit: cover; /* CENTER AND CROP */
		transition: transform 0.2s ease-in-out;
	}

	.recipe-thumb:hover {
		transform: scale(1.1); /* SLIGHT ZOOM ON HOVER */
	}

	/* RECIPE TITLE */
	.recipe-title {
		font-size: 20px;
		font-weight: bold;
	}

	/* MEDIA QUERY: ADJUST TEXT SIZE ON SMALLER SCREENS */
	@media (max-width: 600px) {
		.recipe-title {
			font-size: 18px;
		}
	}
</style>
