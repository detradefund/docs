<script lang="ts">
  import { browser } from '$app/environment';
  import { sidebarOpen } from '$lib/stores/sidebar';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import '../app.css';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.data.title || 'Documentation'}</title>
  <meta name="description" content={$page.data.description || 'Documentation'} />
  <link rel="icon" type="image/png" href="/logo-detrade.png" />
</svelte:head>

<div class="layout" class:sidebar-closed={!$sidebarOpen}>
  <Sidebar />
  <div class="main-container">
    <Header />
    <main class="content">
      <slot />
    </main>
  </div>
</div>

<ThemeToggle />

<style>
  :global(body) {
    background-color: var(--background-color);
    color: var(--text-color);
    margin: 0;
    padding: 0;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .layout {
    display: flex;
    min-height: 100vh;
  }

  .main-container {
    flex: 1;
    margin-left: 300px;
    transition: margin-left 0.3s ease;
  }

  .content {
    margin-top: 60px;
    min-height: calc(100vh - 60px);
    max-width: 1200px;
    margin: 60px auto 0;
    padding: 3rem;
  }

  main {
    flex: 1;
    transition: margin-left 0.3s ease;
  }

  .sidebar-closed main {
    margin-left: 0;
  }

  @media (max-width: 1024px) {
    .main-container {
      margin-left: 0;
    }
  }

  @media (max-width: 768px) {
    .content {
      padding: 1.5rem;
    }
  }

  :global(.card) {
    background-color: var(--card-background);
    border: 1px solid var(--card-border);
  }

  :global(a) {
    color: var(--link-color);
  }

  :global(a:hover) {
    color: var(--link-hover);
  }

  :global(pre), :global(code) {
    background-color: var(--code-background);
    color: var(--code-text);
  }

  :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
    color: var(--text-color);
  }

  :global(p), :global(span), :global(div) {
    color: var(--text-color);
  }
</style> 