<script>
	import { page } from '$app/stores';
</script>

<!-- EVER-PRESENT NAVIGATION -->
<nav class="navbar">
	<a href="/" class="title"> Peterson Recipe Collection </a>
	<div class="nav-container">
		<input type="text" class="search" placeholder="Search..." />
		<div class="nav-links">
			<a href="/categories" class:active={$page.url.pathname === '/categories'}>Categories</a>
			<a href="/about" class:active={$page.url.pathname === '/about'}>About</a>
		</div>
	</div>
</nav>

<!-- IMAGE ONLY ON HOME PAGE -->
{#if $page.url.pathname === '/'}
	<div class="image-container">
		<img src="/photographs/kitchen-tall.png" alt="Kitchen Setup" />
	</div>
{/if}

<!-- SLOT: THIS WILL RENDER DIFFERENT PAGES -->
<slot />

<!-- STYLES -->
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
		font-size: 22px;
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

	.search {
		padding: 7px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 12px;
		outline: none;
		box-sizing: border-box;
	}

	.search:focus {
		border: 2px solid #999;
		padding: 6px;
	}

	.nav-links {
		display: flex;
		gap: 15px;
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

	/* IMAGE STYLING */
	/* img {
		border-radius: 60px;
	} */
	.image-container {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.image-container img {
		width: 100%;
		max-width: 450px; /* ENSURES PROPER SIZE ON DESKTOP */
		height: auto;
		border-radius: 15px;
	}

	/* MOBILE STYLING */
	@media (max-width: 768px) {
		.image-container img {
			width: 90%;
		}
	}
</style>
