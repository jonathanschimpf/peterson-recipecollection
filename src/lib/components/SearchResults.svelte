<script lang="ts">
	import { searchTerm } from '$lib/stores/search';
	import recipeData from '$lib/data/recipe_data.json';
	import { onDestroy } from 'svelte';
	import type { Recipe } from '$types/json';

	let term = '';
	let results: Recipe[] = [];
	let unsubscribe: () => void;

	// ✅ SUBSCRIBE TO GLOBAL SEARCH TERM
	unsubscribe = searchTerm.subscribe((value) => {
		term = value.trim().toLowerCase();
		results =
			term.length > 0
				? recipeData.filter((r) =>
						r.recipe_name.toLowerCase().includes(term) ||
						(r.credit?.toLowerCase().includes(term))
				  )
				: [];
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

{#if term.length > 0}
	<!-- 🕳️ GHOST BACK ARROW SPACER TO MAINTAIN VERTICAL ALIGNMENT -->
	<div class="ghost-arrow-spacer"></div>

	<!-- 🔍 LIVE SEARCH RESULTS (NO ANIMATION) -->
	<div class="staycentered">
		<h1>Results for "{term}"</h1>

		{#if results.length > 0}
			<ul>
				{#each results as recipe}
					<li>
						<a href={`/recipes/${recipe.recipe_name.replace(/\s+/g, '-').toLowerCase()}`}>
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
							<span class="recipe-title">{recipe.recipe_name}</span>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No recipes match your search.</p>
		{/if}
	</div>
{/if}


<style>
	/* 🧭 GHOST BACK ARROW SPACER TO PRESERVE VISUAL ALIGNMENT */
	.ghost-arrow-spacer {
		height: 40px; /* MATCH .back-link HEIGHT */
		width: 100%;
	}

	.staycentered {
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
		padding: 20px 0;
		min-height: 70vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	h1 {
		font-size: 32px;
		font-family: Arial, sans-serif;
		margin-bottom: 20px;
	}

	a {
		text-decoration: none;
		color: black;
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 10px;
		border-radius: 8px;
		transition: background 0.3s ease-in-out;
	}

	a:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	li {
		font-size: 20px;
		font-family: Arial, sans-serif;
		text-align: left;
		margin: 12px 0;
		display: flex;
		align-items: center;
	}

	.thumb-container {
		width: 100px;
		height: 100px;
		overflow: hidden;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
	}

	.recipe-thumb {
		width: 250px;
		height: 250px;
		object-fit: cover;
		transition: transform 0.2s ease-in-out;
	}

	.recipe-thumb:hover {
		transform: scale(1.1);
	}

	.recipe-title {
		font-size: 20px;
		font-weight: bold;
	}

	@media (max-width: 600px) {
		.recipe-title {
			font-size: 18px;
		}
	}
</style>
