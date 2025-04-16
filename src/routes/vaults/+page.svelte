<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let currentHash = '';

  onMount(() => {
    // Gestion du hash dans l'URL
    currentHash = window.location.hash.slice(1);
    
    // Écoute les changements de hash
    window.addEventListener('hashchange', () => {
      currentHash = window.location.hash.slice(1);
      updateMetaTags();
    });

    return () => {
      window.removeEventListener('hashchange', () => {});
    };
  });

  // Fonction pour mettre à jour les meta tags en fonction de la section
  function updateMetaTags() {
    let title = "Vaults – DeTrade";
    let description = "Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation.";

    switch(currentHash) {
      case 'core-usdc':
        title = "Core USDC Vault – DeTrade";
        description = "Learn about DeTrade's Core USDC vault strategy for optimized stablecoin yields.";
        break;
      case 'strategies':
        title = "Vault Strategies – DeTrade";
        description = "Discover DeTrade's yield-generating strategies across DeFi protocols.";
        break;
    }

    // Update document title
    document.title = title;

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    if (metaDescription) metaDescription.setAttribute('content', description);
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterDescription) twitterDescription.setAttribute('content', description);
  }
</script>

<svelte:head>
  <title>{currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 'Vaults – DeTrade'}</title>
  <meta name="description" content="Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation." />
  <meta property="og:title" content={currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 'Vaults – DeTrade'} />
  <meta property="og:description" content="Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation." />
  <meta name="twitter:title" content={currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 'Vaults – DeTrade'} />
  <meta name="twitter:description" content="Explore DeTrade's smart contract-based investment vaults designed for optimized yields without speculation." />
</svelte:head>

<div class="content">
  <div class="title-container">
    <h1>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 13v8"/>
        <path d="M8 21h8"/>
      </svg>
      Vaults
    </h1>
    <p class="overview-description">DeTrade Vaults are smart contract-based investment strategies designed to grow your crypto assets without speculation.</p>
  </div>

  <div class="intro-section">
    <div class="info-box">
      <h2>No speculation, just yield on your assets</h2>
      
      <p>Your capital remains pegged to the underlying asset through various yield-bearing tokens (e.g., for USDC: other stablecoins or yield tokens, for ETH/BTC: wrapped tokens or LSTs) and is deployed into yield-generating opportunities such as:</p>
      <ul>
        <li>Liquidity provisioning on top-tier DEXs</li>
        <li>Lending on secure lending markets</li>
        <li>Pegged yield-bearing assets</li>
        <li>Yield derivatives offering fixed or variable returns</li>
      </ul>
      
      <p>Our strategies are designed to maximize risk-adjusted yield through diversification and real-time monitoring, not through price betting or leverage on volatile assets.</p>
    </div>
  </div>

  <div class="available-vaults">
    <h2>Available Vaults</h2>
    <div class="vaults-grid">
      <a href="/vaults/detrade-core-usdc" class="vault-card">
        <div class="vault-header">
          <h2>DeTrade Core USDC</h2>
          <span class="network-badge">Base</span>
        </div>
        <p>Optimized yield strategies for USDC with active risk management</p>
        <div class="vault-footer">
          <span class="asset-type">Stablecoin</span>
          <span class="performance-fee">15% Performance Fee</span>
        </div>
      </a>
      
      <!-- D'autres vaults peuvent être ajoutés ici dans le futur -->
    </div>
  </div>

  <nav class="page-navigation">
    <div class="nav-links-container">
      <a href="/security" class="nav-link prev no-arrow">
        <div class="nav-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <div class="nav-text">
            <span class="nav-label">Previous</span>
            <span class="nav-title">Security</span>
          </div>
        </div>
      </a>
      <a href="/faq" class="nav-link next">
        <div class="nav-content">
          <div class="nav-text">
            <span class="nav-label">Next</span>
            <span class="nav-title">FAQ</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </a>
    </div>
  </nav>
</div>

<style>
  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--text-color);
  }

  .title-container {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    user-select: none;
    pointer-events: none;
    cursor: default;
  }

  h1 svg {
    color: var(--text-color);
    stroke: currentColor;
    pointer-events: none;
  }

  .overview-description {
    font-size: 1.1rem;
    color: var(--text-color);
    opacity: 0.7;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .vaults-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .vault-card {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, background-color 0.2s;
  }

  .vault-card:hover {
    transform: translateY(-2px);
    background: var(--secondary-background);
  }

  .vault-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
  }

  h2 svg {
    color: var(--text-color);
    stroke: currentColor;
  }

  .network-badge {
    background: var(--card-background);
    color: var(--text-color);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid var(--card-border);
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
    margin: 0 0 1.5rem 0;
  }

  .vault-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.6;
  }

  .intro-section {
    margin: 2rem 0 3rem;
  }

  .info-box {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.75rem;
    margin-bottom: 2rem;
    transition: all 0.2s ease;
  }

  .info-box * {
    transition: color 0.2s, opacity 0.2s;
  }

  .info-box h2 {
    color: var(--text-color);
    margin-bottom: 1.5rem;
    opacity: 1;
  }

  .info-box p {
    color: var(--text-color);
    opacity: 0.8;
    margin: 0.75rem 0;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .info-box ul {
    list-style: none;
    padding-left: 1.5rem;
    margin: 1rem 0;
    color: var(--text-color);
    transition: all 0.2s ease;
  }

  .info-box li {
    position: relative;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    transition: all 0.2s ease;
  }

  .info-box li, 
  .info-box p {
    opacity: 0.8;
  }

  .info-box li::before {
    content: "•";
    position: absolute;
    left: -1rem;
    transition: all 0.2s ease;
    opacity: 0.8;
    color: var(--text-color);
  }

  .section-divider {
    height: 1px;
    background: var(--border-color);
    margin: 3rem 0;
  }

  .available-vaults h2 {
    margin-bottom: 2rem;
  }

  .vault-details {
    margin-top: 3rem;
  }

  .vault-section {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .vault-link {
    font-size: 1.1rem;
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.2s;
  }

  .vault-link:hover {
    color: var(--text-color);
    opacity: 0.8;
  }

  .intro-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
    margin-top: 1.5rem;
  }

  .page-navigation {
    margin-top: 2rem;
    padding: 1rem 0;
  }

  .nav-links-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .nav-link {
    text-decoration: none;
    color: var(--text-color);
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: none;
  }

  .nav-link:hover {
    background: var(--secondary-background);
    transform: translateY(-2px);
    transition: none;
  }

  .nav-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .nav-content svg {
    color: currentColor;
    stroke: currentColor;
    transition: none;
  }

  .nav-text {
    display: flex;
    flex-direction: column;
  }

  .nav-label {
    font-size: 0.875rem;
    opacity: 0.7;
  }

  .nav-title {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .prev .nav-content {
    justify-content: flex-start;
  }

  .next .nav-content {
    justify-content: flex-end;
    flex-direction: row;
  }

  .next .nav-text {
    text-align: right;
  }

  @media (max-width: 768px) {
    .content {
      padding: 1rem;
      text-align: center;
    }

    .title-container {
      margin-bottom: 2rem;
      text-align: center;
    }

    h1 {
      font-size: 2rem;
      justify-content: center;
    }

    h2 {
      text-align: center;
      justify-content: center;
    }

    .overview-description {
      text-align: center;
    }

    .info-box {
      text-align: center;
    }

    .info-box h2 {
      text-align: center;
    }

    .info-box p {
      text-align: center;
    }

    .info-box ul {
      text-align: left;
    }

    .vault-card {
      text-align: center;
    }

    .vault-header {
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
    }

    .vault-footer {
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-links-container {
      grid-template-columns: 1fr;
    }

    .nav-content {
      justify-content: center !important;
    }

    .nav-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center !important;
    }

    .prev svg {
      margin-right: auto;
    }

    .next svg {
      margin-left: auto;
    }

    .nav-link {
      padding: 1rem;
      position: relative;
    }

    .prev .nav-content,
    .next .nav-content {
      flex-direction: row;
      align-items: center;
      gap: 0.75rem;
    }

    .nav-label {
      font-size: 0.8rem;
    }

    .nav-title {
      font-size: 1rem;
    }
  }
</style> 