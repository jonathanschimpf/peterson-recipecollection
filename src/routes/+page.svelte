<script context="module">
	export const prerender = true;
</script>

<div class="welcome-container">
	<a href="/home" class="welcome-link">
		<h1 class="welcome-title">Peterson</h1>
		<h1 class="welcome-subtitle">Recipe Collection</h1>
		<p class="welcome-enter">Enter</p>
	</a>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: white;
		font-family: Arial, sans-serif;
	}

	.welcome-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
	}

	.welcome-link {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: color 0.2s ease;
	}

	.welcome-title,
	.welcome-subtitle {
		margin: 0;
		color: black;
		transition: color 0.2s ease;
	}

	.welcome-enter {
		margin-top: 1.5rem;
		font-size: 1.2rem;
		color: black;
		transition: color 0.2s ease;
	}

	/* HOVER & ACTIVE EFFECT (Desktop & Mobile) */
	.welcome-link:hover .welcome-title,
	.welcome-link:active .welcome-title,
	.welcome-link:hover .welcome-subtitle,
	.welcome-link:active .welcome-subtitle,
	.welcome-link:hover .welcome-enter,
	.welcome-link:active .welcome-enter {
		color: olive;
	}
</style>
