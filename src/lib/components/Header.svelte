<script lang="ts">
  import { browser } from '$app/environment';
  import { sidebarOpen } from '$lib/stores/sidebar';
  import { writable } from 'svelte/store';
  import ThemeToggle from './ThemeToggle.svelte';

  // Créer un store pour suivre l'état du thème
  let isDarkMode = false;

  // Observer les changements de classe sur le document
  function updateLogo() {
    isDarkMode = !document.documentElement.classList.contains('dark-mode');
  }

  // Mettre en place l'observateur au montage du composant
  import { onMount } from 'svelte';
  
  onMount(() => {
    updateLogo();
    
    // Observer les changements de classe sur documentElement
    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  });

  function toggleSidebar() {
    sidebarOpen.update(value => !value);
  }
</script>

<header class="header">
  <button class="menu-button" on:click={toggleSidebar}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
  <div class="left">
    <div class="logo">
      <a href="https://docs.detrade.fund" class="logo-link no-arrow">
        <img 
          src={isDarkMode ? "/detrade-logo-text.png" : "/detrade-logo-text-black.webp"} 
          alt="DeTrade" 
          class="logo-image" 
        />
      </a>
    </div>
  </div>

  <div class="right">
    <ThemeToggle />
  </div>
</header>

<style>
  .header {
    height: 60px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    background-color: var(--header-background);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 200;
    color: var(--header-text);
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 40px;
    width: auto;
  }

  .menu-button {
    display: none;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.5rem;
    margin-right: 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .menu-button:hover {
    background-color: var(--hover-background);
  }

  /* Styles pour mobile */
  @media (max-width: 1024px) {
    .menu-button {
      display: block;
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style> 