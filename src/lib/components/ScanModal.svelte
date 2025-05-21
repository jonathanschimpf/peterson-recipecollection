<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';

	export let isOpen = false;
	export let close: () => void = () => {};
	export let imageUrl: string;

	let zoomed = false;
	let scrollContainer: HTMLDivElement | null = null;
	let modalEl: HTMLDivElement | null = null;

	$: if (!isOpen) zoomed = false;

	$: if (browser) {
		if (isOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}

	onDestroy(() => {
		if (browser) {
			document.body.classList.remove('no-scroll');
			if (modalEl) modalEl.inert = false;
		}
	});

	$: if (browser && modalEl) {
		modalEl.inert = !isOpen;
	}

	async function toggleZoom() {
		zoomed = !zoomed;
		await tick();
		if (scrollContainer && zoomed) {
			const { scrollWidth, scrollHeight, clientWidth, clientHeight } = scrollContainer;
			scrollContainer.scrollTo({
				top: (scrollHeight - clientHeight) / 2,
				left: (scrollWidth - clientWidth) / 2,
				behavior: 'smooth'
			});
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	function handleImageKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleZoom();
		}
	}
</script>

{#if isOpen}
	<div
		class="modal-backdrop"
		bind:this={modalEl}
		role="dialog"
		tabindex="0"
		aria-modal="true"
		aria-label="Scanned recipe modal"
		transition:fade={{ duration: 25 }}
		on:click={close}
		on:keydown={handleKeydown}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="modal-content" on:click|stopPropagation transition:fade={{ duration: 25 }}>
			<button class="close-btn" aria-label="Close modal" type="button" on:click={close}>×</button>

			<div
				class="scroll-container"
				bind:this={scrollContainer}
				aria-label="Zoomable scanned recipe"
			>
				<div
					class="image-wrapper"
					tabindex="0"
					role="button"
					aria-pressed={zoomed}
					aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
					on:click={toggleZoom}
					on:keydown={handleImageKeydown}
				>
					<img
						src={imageUrl}
						alt="Scanned recipe"
						draggable="false"
						class="scan-img {zoomed ? 'zoomed' : ''}"
						loading="eager"
						decoding="async"
					/>
				</div>
			</div>
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
		padding: 2rem;
	}
	.modal-content {
		position: relative;
		background: white;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		max-width: 70vw;
		max-height: 70vh;
		overflow: hidden;
	}
	@media (max-width: 768px) {
		.modal-content {
			max-width: 98vw !important;
			max-height: 98vh !important;
		}
	}
	.scroll-container {
		max-width: 65vw;
		max-height: 65vh;
		overflow: auto;
		cursor: grab;
		border-radius: 4px;
	}
	@media (max-width: 768px) {
		.scroll-container {
			max-width: 98vw !important;
			max-height: 98vh !important;
		}
	}
	.scroll-container:active {
		cursor: grabbing;
	}
	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1.5rem;
		background: none;
		border: none;
		font-size: 1.5rem;
		color: black;
		cursor: pointer;
	}
	.close-btn:hover,
	.close-btn:active {
		color: lightgrey;
	}
	.image-wrapper {
		outline: none;
	}
	.image-wrapper:focus {
		outline: 2px solid #ccc;
		border-radius: 4px;
	}
	.scan-img {
		display: block;
		max-width: 100%;
		height: auto;
		margin: 0 auto;
		border-radius: 4px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s ease;
		user-select: none;
	}
	.zoomed {
		transform: scale(2);
		transform-origin: top left;
	}
</style>
