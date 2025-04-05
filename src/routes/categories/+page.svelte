<script>
	import { base } from '$app/paths';

	// CATEGORY LIST WITH REAL IMAGE PATHS
	const categories = [
		{ name: 'Appetizers', image: `${base}/photographs/categories/categories_appetizers.jpg` },
		{ name: 'Beverages', image: `${base}/photographs/categories/categories_beverages.jpg` },
		{ name: 'Breads', image: `${base}/photographs/categories/categories_breads.jpg` },
		{
			name: 'Cakes and Frostings',
			image: `${base}/photographs/categories/categories_cakesandfrostings.jpg`
		},
		{ name: 'Casseroles', image: `${base}/photographs/categories/categories_casseroles.jpg` },
		{
			name: 'Christmas Recipes',
			image: `${base}/photographs/categories/categories_christmasrecipes.jpg`
		},
		{ name: 'Cookies', image: `${base}/photographs/categories/categories_cookies.jpg` },
		{ name: 'Desserts', image: `${base}/photographs/categories/categories_desserts.jpg` },
		{ name: 'Eggs', image: `${base}/photographs/categories/categories_eggs.jpg` },
		{ name: 'Meat', image: `${base}/photographs/categories/categories_meat.jpg` },
		{ name: 'Pasta and Rice', image: `${base}/photographs/categories/categories_pastaandrice.jpg` },
		{
			name: 'Pies and Pastries',
			image: `${base}/photographs/categories/categories_piesandpastries.jpg`
		},
		{ name: 'Poultry', image: `${base}/photographs/categories/categories_poultry.jpg` },
		{
			name: 'Salads and Dressings',
			image: `${base}/photographs/categories/categories_saladsanddressings.jpg`
		},
		{ name: 'Sauces', image: `${base}/photographs/categories/categories_sauces.jpg` },
		{ name: 'Seafood', image: `${base}/photographs/categories/categories_seafood.jpg` },
		{
			name: 'Soups and Sandwiches',
			image: `${base}/photographs/categories/categories_soupsandsandwiches.jpg`
		},
		{ name: 'Vegetables', image: `${base}/photographs/categories/categories_vegetables.jpg` }
	];
</script>

<!-- CATEGORIES PAGE -->
<section class="categories">
	<div class="grid">
		{#each categories as category}
			<a
				href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
				class="category-card"
			>
				<div class="image-wrapper">
					<img src={category.image} alt={category.name} width="500" height="333" loading="lazy" />
					<div class="overlay"></div>
					<span class="category-title">{category.name}</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- STYLES -->
<style>
	a {
		-webkit-tap-highlight-color: transparent;
	}

	a:focus,
	a:active {
		outline: none;
	}

	.categories {
		text-align: center;
		margin-top: 20px;
		font-family: 'Arial', sans-serif;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 20px;
		padding: 20px;
		justify-content: center;
		text-align: center; /* STAY CENTERED */
	}

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

	.category-card:hover {
		transform: scale(1.05);
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		max-width: 300px;
		border-radius: 10px;
		overflow: hidden;
		margin: 0 auto;
	}

	.image-wrapper img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
		border-radius: 10px;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
	}

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

	.category-card:hover .overlay {
		background: rgba(0, 0, 0, 0.2);
	}

	.category-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 18px;
		font-weight: bold;
		text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
	}

	/* MOBILE TAP FIX */
	@media (max-width: 768px) {
		.category-card:active .overlay {
			background: rgba(0, 0, 0, 0.5);
		}
	}
</style>
