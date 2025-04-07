<script>
  import { onMount } from 'svelte';
  
  let isDarkMode = false;
  
  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    isDarkMode = savedTheme === 'dark';
    if (!savedTheme) {
      localStorage.setItem('theme', 'light');
    }
  });
  
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    applyTheme();
  }
  
  function applyTheme() {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
    }
  }
</script>

<div class="theme-switch">
  <button 
    on:click={toggleTheme}
    class="theme-toggle"
    aria-label={isDarkMode ? "Activer le mode jour" : "Activer le mode nuit"}
  >
    <div class="icons">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </span>
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
    </div>
    <div class="slider" class:dark={isDarkMode}></div>
  </button>
</div>

<style>
  .theme-switch {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .theme-switch:not(:first-of-type) {
      display: none;
    }
  }

  .theme-toggle {
    position: relative;
    width: 64px;
    height: 32px;
    background: transparent;
    border: 2px solid var(--text-color);
    border-radius: 16px;
    cursor: pointer;
    padding: 0;
    overflow: hidden;
  }

  .icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 4px;
    position: relative;
    z-index: 2;
    color: var(--text-color);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background-color: var(--text-color);
    border-radius: 50%;
    transition: transform 0.3s ease;
    z-index: 1;
  }

  .slider.dark {
    transform: translateX(32px);
  }
</style> 