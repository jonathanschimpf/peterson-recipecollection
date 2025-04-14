<script>
	import { page } from '$app/stores';
	import { searchTerm } from '$lib/stores/search';
	import { afterNavigate } from '$app/navigation';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';

	// 🚨 CLEAR SEARCH ON PAGE NAVIGATION
	afterNavigate(() => {
		searchTerm.set('');
		scrollTo(0, 0);
	});
</script>

<!-- NAVIGATION BAR -->
<nav class="navbar">
	<a href="/" class="title"> Peterson Recipe Collection </a>
	<div class="nav-container">
		<!-- 🔍 GLOBAL SEARCH BAR -->
		<SearchBar />

		<div class="nav-links">
			<a href="/categories" class:active={$page.url.pathname === '/categories'}>Categories</a>
			<a href="/about" class:active={$page.url.pathname === '/about'}>About</a>
		</div>
	</div>
</nav>

<!-- 📷 HOME PAGE IMAGE (ONLY IF NO SEARCH) -->
{#if $page.url.pathname === '/' && $searchTerm.trim().length === 0}
	<div class="image-container">
		<img src="/photographs/kitchen-tall.png" alt="Kitchen Setup" />
	</div>
{/if}

<!-- 🧠 SLOT: PAGE CONTENT (ONLY IF NO SEARCH TERM) -->
{#if $searchTerm.trim().length === 0}
	<slot />
{/if}

<!-- 🔥 GLOBAL LIVE SEARCH RESULTS (TAKES OVER PAGE) -->
{#if $searchTerm.trim().length > 0}
	<SearchResults />
{/if}

<style>
	.navbar {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 1rem;
		font-family: Arial, sans-serif;
		background-color: white;
	}

	.title {
		font-size: 21px;
		font-weight: bold;
		color: olive;
		text-align: center;
		text-decoration: none;
	}

	.nav-container {
		display: flex;
		gap: 15px;
		align-items: center;
	}

	/* ===================================================
     MEDIA QUERY BECAUSE NOT ALL PETERSON'S USE  PRODUCTS 
	 =================================================== */
	@media (max-width: 600px) {
		.title {
			font-size: 18px;
		}

		.nav-links a {
			font-size: 14px;
		}
	}

	.nav-links a {
		text-decoration: none;
		color: #333;
		font-weight: normal;
		transition: all 0.2s ease-in-out;
	}

	.nav-links a.active {
		text-decoration: underline;
		color: #666;
		text-underline-offset: 3px;
		text-decoration-thickness: 2px;
	}

	.image-container {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.image-container img {
		width: 100%;
		max-width: 450px;
		height: auto;
		border-radius: 15px;
	}

	@media (max-width: 768px) {
		.image-container img {
			width: 90%;
		}
	}
</style>
