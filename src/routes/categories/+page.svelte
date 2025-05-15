<script lang="ts">
	import { onMount } from 'svelte';

	const categories = [
		{ name: 'Appetizers', image: '/photographs/categories/categories_appetizers.jpg' },
		{ name: 'Beverages', image: '/photographs/categories/categories_beverages.jpg' },
		{ name: 'Breads', image: '/photographs/categories/categories_breads.jpg' },
		{
			name: 'Cakes and Frostings',
			image: '/photographs/categories/categories_cakesandfrostings.jpg'
		},
		{ name: 'Casseroles', image: '/photographs/categories/categories_casseroles.jpg' },
		{ name: 'Christmas Recipes', image: '/photographs/categories/categories_christmasrecipes.jpg' },
		{ name: 'Cookies', image: '/photographs/categories/categories_cookies.jpg' },
		{ name: 'Desserts', image: '/photographs/categories/categories_desserts.jpg' },
		{ name: 'Eggs', image: '/photographs/categories/categories_eggs.jpg' },
		{ name: 'Meat', image: '/photographs/categories/categories_meat.jpg' },
		{ name: 'Pasta and Rice', image: '/photographs/categories/categories_pastaandrice.jpg' },
		{ name: 'Pies and Pastries', image: '/photographs/categories/categories_piesandpastries.jpg' },
		{ name: 'Poultry', image: '/photographs/categories/categories_poultry.jpg' },
		{
			name: 'Salads and Dressings',
			image: '/photographs/categories/categories_saladsanddressings.jpg'
		},
		{ name: 'Sauces', image: '/photographs/categories/categories_sauces.jpg' },
		{ name: 'Seafood', image: '/photographs/categories/categories_seafood.jpg' },
		{
			name: 'Soups and Sandwiches',
			image: '/photographs/categories/categories_soupsandsandwiches.jpg'
		},
		{ name: 'Vegetables', image: '/photographs/categories/categories_vegetables.jpg' }
	];

	let imageLoadedMap: Record<string, boolean> = {};

	onMount(() => {
		// Check each image in DOM on initial hydration
		categories.forEach((cat) => {
			const selector = `img[data-name="${cat.name}"]`;
			const img = document.querySelector(selector) as HTMLImageElement | null;
			if (img?.complete) {
				imageLoadedMap[cat.name] = true;
			}
		});
	});

	function handleImageLoad(name: string) {
		imageLoadedMap[name] = true;
	}
</script>

<section class="categories">
	<div class="grid">
		{#each categories as category (category.name)}
			<a
				href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
				class="category-card"
			>
				<div class="image-wrapper">
					<img
						data-name={category.name}
						src={category.image}
						alt={category.name}
						width="500"
						height="333"
						loading="lazy"
						class="category-image"
						class:loaded={imageLoadedMap[category.name]}
						on:load={() => handleImageLoad(category.name)}
						on:error={() => console.error(`Failed to load ${category.image}`)}
					/>
					<div class="overlay"></div>
					<span class="category-title">{category.name}</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	/* DISABLE BLUE TAP HIGHLIGHT ON MOBILE */
	a {
		-webkit-tap-highlight-color: transparent;
	}
	a:focus,
	a:active {
		outline: none;
	}

	/* WRAPS ENTIRE CATEGORIES SECTION */
	.categories {
		text-align: center;
		margin-top: 20px;
		font-family: 'Arial', sans-serif;
	}

	/* MAIN RESPONSIVE GRID LAYOUT */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* DEFAULT RESPONSIVE FALLBACK */
		gap: 20px;
		padding: 20px;
		justify-content: center;
		text-align: center;
		max-width: 1860px; /* 6 COLUMNS @ 300PX + 5 GAPS @ 20PX */
		margin: 0 auto;
	}

	/* FORCE 6 COLUMNS ONLY WHEN WIDE ENOUGH TO PREVENT HORIZONTAL SCROLL ON EDGE DEVICES */
	@media (min-width: 1320px) {
		.grid {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	/* STEP DOWN TO 3 COLUMNS AT LAPTOP WIDTH */
	@media (max-width: 1319px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* STEP DOWN TO 2 COLUMNS AT SMALL TABLET WIDTH */
	@media (max-width: 870px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* SINGLE COLUMN STACK FOR MOBILE */
	@media (max-width: 580px) {
		.grid {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	/* INDIVIDUAL CATEGORY CARDS */
	.category-card {
		width: 100%;
		max-width: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: white;
		overflow: hidden;
		border-radius: 10px;
		position: relative;
		transition: transform 0.2s ease-in-out;
		margin: 0 auto;
	}

	/* HOVER SCALE EFFECT */
	.category-card:hover {
		transform: scale(1.05);
	}

	/* WRAPS IMAGE + OVERLAY + TITLE */
	.image-wrapper {
		position: relative;
		width: 100%;
		max-width: 300px;
		border-radius: 10px;
		overflow: hidden;
		margin: 0 auto;
	}

	/* CATEGORY IMAGE STYLING */
	.category-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
		border-radius: 10px;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	/* FADE-IN WHEN LOADED */
	.category-image.loaded {
		opacity: 1;
	}

	/* DARK OVERLAY ON IMAGE */
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		transition: background 0.3s ease-in-out;
		border-radius: 10px;
	}

	/* LIGHTER OVERLAY ON HOVER */
	.category-card:hover .overlay {
		background: rgba(0, 0, 0, 0.2);
	}

	/* CENTERED CATEGORY TEXT */
	.category-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 18px;
		font-weight: bold;
		text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
		text-align: center;
	}

	/* MOBILE OVERLAY INTENSITY WHEN TAPPED */
	@media (max-width: 768px) {
		.category-card:active .overlay {
			background: rgba(0, 0, 0, 0.5);
		}
	}
</style>
