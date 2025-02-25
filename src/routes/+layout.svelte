<script lang="ts">
  import { browser } from '$app/environment';
</script>

<svelte:head>
  <title>DeTrade - Decentralized Asset Management</title>
  <meta name="description" content="Your On-Chain Investment Fund" />
</svelte:head>

<slot />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style> 