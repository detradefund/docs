<script>
  import Hero from '$lib/components/Hero.svelte';
</script>

<main>
  <Hero />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #0d111c;
  }

  :global(*) {
    box-sizing: border-box;
  }

  main {
    width: 100%;
    min-height: 100vh;
  }
</style> 