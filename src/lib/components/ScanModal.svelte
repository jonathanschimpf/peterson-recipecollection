<script lang="ts">
	import { fade } from 'svelte/transition';

	export let isOpen = false;
	export let close: () => void = () => {};
	export let imageUrl: string;

	let zoomed = false;
</script>

{#if isOpen}
	<div
		class="modal-backdrop"
		role="presentation"
		aria-hidden="true"
		on:click={close}
		transition:fade|local={{ duration: 25 }}
	>
		<div
			class="modal-content"
			role="dialog"
			aria-modal="true"
			aria-label="Modal content"
			tabindex="0"
			on:click|stopPropagation
			on:keydown={(e) => (e.key === 'Escape' || e.key === 'Enter') && close()}
			transition:fade|local={{ duration: 25 }}
		>
			<button class="close-btn" type="button" aria-label="Close modal" on:click={close}> × </button>

			<!-- 🟢 WRAPPED ZOOMABLE IMAGE IN BUTTON FOR a11y -->
			<button
				type="button"
				class="image-zoom-btn"
				aria-label="Toggle zoom"
				on:click={() => (zoomed = !zoomed)}
			>
				<img src={imageUrl} alt="Full scanned recipe" class="full-scan {zoomed ? 'zoomed' : ''}" />
			</button>

			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background: white;
		padding: 1rem;
		border-radius: 8px;
		max-width: 65vw;
		max-height: 90vh;
		overflow: auto;
		position: relative;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1.5rem;
		background: none;
		border: none;
		font-size: 1.5rem;
		font-weight: bold;
		color: black;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.close-btn:hover,
	.close-btn:active {
		color: lightgrey;
	}

	.image-zoom-btn {
		all: unset;
		cursor: pointer;
		display: block;
		width: 100%;
	}

	.full-scan {
		max-width: 100%;
		height: auto;
		display: block;
		border-radius: 4px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
		cursor: zoom-in;
		user-select: none;
		transition: transform 0.25s ease;
		margin: 0 auto;
	}

	.zoomed {
		cursor: grab;
		transform: scale(2);
	}

	.zoomed:active {
		cursor: grabbing;
	}
</style>
