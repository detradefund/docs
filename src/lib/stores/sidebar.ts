import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Initialiser avec true, ou la valeur stockée dans localStorage
const storedValue = browser ? localStorage.getItem('sidebarOpen') : 'true';
export const sidebarOpen = writable(storedValue === 'false' ? false : true);

// Sauvegarder les changements dans localStorage
if (browser) {
  sidebarOpen.subscribe(value => {
    localStorage.setItem('sidebarOpen', String(value));
  });
} 