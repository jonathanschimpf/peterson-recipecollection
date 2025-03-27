<script lang="ts">
	export let isOpen = false;
	export let close: () => void;
</script>

{#if isOpen}
	<div class="modal-backdrop" role="presentation" aria-hidden="true" on:click={close}>
		<div
			class="modal-content"
			role="dialog"
			aria-modal="true"
			aria-label="Modal content"
			tabindex="0"
			on:click|stopPropagation
			on:keydown={(e) => (e.key === 'Escape' || e.key === 'Enter') && close()}
		>
			<button class="close-btn" type="button" aria-label="Close modal" on:click={close}> × </button>
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
		max-width: 90%;
		max-height: 90%;
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
</style>
