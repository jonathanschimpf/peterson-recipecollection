<script context="module">
	export const prerender = true;
</script>

<a href="/home" class="welcome-link">
	<h1 class="welcome-title">Peterson</h1>
	<h1 class="welcome-subtitle">Recipe Collection</h1>
	<p class="welcome-enter">Enter</p>
</a>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: white;
		font-family: Arial, sans-serif;
	}

	.welcome-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: 100vh;
		text-decoration: none;
		color: olive;
	}

	.welcome-title {
		font-size: 3rem;
		margin: 0;
	}

	.welcome-subtitle {
		font-size: 2.5rem;
		margin: 0;
	}

	.welcome-enter {
		margin-top: 1.5rem;
		font-size: 1.2rem;
		color: black;
		transition: color 0.2s ease;
	}

	.welcome-link:hover .welcome-enter,
	.welcome-link:active .welcome-enter {
		color: gray;
	}
</style>
