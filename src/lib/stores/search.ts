import { writable } from 'svelte/store';

// 🔍 HOLDS CURRENT SEARCH TERM
export const searchTerm = writable('');
