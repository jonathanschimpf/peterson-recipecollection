<script lang="ts">
	import { searchTerm } from '$lib/stores/search';

	$: console.log('🔄 bound searchTerm in input:', $searchTerm);
</script>

<input type="text" class="search" placeholder="Search..." bind:value={$searchTerm} />

<style>
	.search {
		padding: 6px 10px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 4px;
		outline: none;
		transition: border-color 0.2s ease-in-out;
	}

	.search:focus {
		border-color: olive;
	}
</style>
