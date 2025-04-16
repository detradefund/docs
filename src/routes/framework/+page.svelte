<script lang="ts">
  import { onMount } from 'svelte';
  import { highlightStore } from '$lib/stores/highlight';
  import { page } from '$app/stores';

  let sections: { [key: string]: HTMLElement } = {};
  let currentHash = '';

  onMount(() => {
    // Gestion du hash dans l'URL
    currentHash = window.location.hash.slice(1);
    
    // Écoute les changements de hash
    window.addEventListener('hashchange', () => {
      currentHash = window.location.hash.slice(1);
      updateMetaTags();
    });

    // Écoute les changements du store
    const unsubscribe = highlightStore.subscribe(({ term, sectionId, active }) => {
      if (active && sectionId && sections[sectionId]) {
        const section = sections[sectionId];
        
        // Trouve et met en surbrillance le texte
        const text = section.innerHTML;
        const regex = new RegExp(`(${term})`, 'gi');
        section.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');

        // Retire la surbrillance après un délai
        setTimeout(() => {
          section.innerHTML = text;
          highlightStore.set({ term: '', sectionId: '', active: false });
        }, 2000);
      }
    });

    return () => {
      window.removeEventListener('hashchange', () => {});
      unsubscribe();
    };
  });

  // Fonction pour mettre à jour les meta tags en fonction de la section
  function updateMetaTags() {
    let title = "Framework – DeTrade";
    let description = "Understand DeTrade's framework, architecture, and how our protocol works.";

    switch(currentHash) {
      case 'terminology':
        title = "Terminology – DeTrade";
        description = "Learn about key DeTrade terminology, including ERC-7540, multisig wallets, price oracles, and vault mechanics.";
        break;
      case 'architecture':
        title = "Protocol Architecture – DeTrade";
        description = "Explore DeTrade's protocol architecture, built on Lagoon and Safe infrastructure.";
        break;
      case 'features':
        title = "Features – DeTrade";
        description = "Discover DeTrade's key features and infrastructure powered by Lagoon and Safe technology.";
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
  <title>{currentHash ? `${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} – DeTrade` : 'Framework – DeTrade'}</title>
  <meta name="description" content="Understand DeTrade's framework, architecture, and how our protocol works." />
  <meta property="og:title" content={currentHash ? `${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} – DeTrade` : 'Framework – DeTrade'} />
  <meta property="og:description" content="Understand DeTrade's framework, architecture, and how our protocol works." />
  <meta name="twitter:title" content={currentHash ? `${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} – DeTrade` : 'Framework – DeTrade'} />
  <meta name="twitter:description" content="Understand DeTrade's framework, architecture, and how our protocol works." />
</svelte:head>

<div class="content">
  <div class="overview-content">
    <div class="title-container">
      <h1>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        Framework
      </h1>
      <p class="overview-description">Tap into Cutting-Edge Vaults for Smarter DeFi</p>
    </div>

    <section id="features" class="feature-card">
      <h2>
        <img src="/symbol_lagoon_white.svg" alt="Lagoon logo" class="framework-logo" />
        Powered by Lagoon
      </h2>
      <div class="feature-content">
        <p>
          Our vaults are powered by <a href="https://lagoon.finance" target="_blank" rel="noopener noreferrer" class="inline-link">Lagoon</a> technology, an advanced and rapidly evolving vault infrastructure tailored for on-chain asset managers. Lagoon is dedicated to consistently improving and refining its vault technology, delivering state-of-the-art solutions and ongoing updates to empower asset managers with the latest innovations. As Lagoon continues to push the boundaries of vault technology, DeTrade will harness their expertise to ensure you receive an optimized and cutting-edge investment experience.
        </p>
      </div>
    </section>

    <section class="feature-card">
      <h2>
        <img src="/safe_white.svg" alt="Safe logo" class="framework-logo" />
        Built on Safe
      </h2>
      <div class="feature-content">
        <p>
          Lagoon is built on <a href="https://safe.global" target="_blank" rel="noopener noreferrer" class="inline-link">Safe</a>, the most trusted smart contract account system in DeFi. Safe currently secures $100B+ in assets and provides seamless access to the entire DeFi ecosystem. <a href="https://eips.ethereum.org/EIPS/eip-7540" target="_blank" rel="noopener noreferrer" class="inline-link">ERC-7540</a> support allows each vault (tokenized Safe) to maintain transparent and auditable accounting. <a href="https://docs.roles.gnosisguild.org" target="_blank" rel="noopener noreferrer" class="inline-link">Zodiac modules</a> define and enforce on-chain permissions for vault managers (Curators), ensuring clear mandates and non-custodial integrity.
        </p>
      </div>
    </section>

    <section class="feature-card">
      <h2>
        <img src="/evm.svg" alt="EVM logo" class="framework-logo" />
        EVM Compatibility
      </h2>
      <div class="feature-content">
        <p>
          Thanks to the underlying Lagoon + Safe architecture, DeTrade vaults are fully EVM-compatible, enabling seamless interaction with protocols across all major EVM chains.
          This universal compatibility ensures access to the best yields and DeFi opportunities, regardless of where they originate, while maintaining a user experience that is interoperable, permissionless, and transparent. DeTrade strategies can interact with a wide range of protocols while remaining anchored in a secure, modular Safe-based vault structure.
        </p>
      </div>
    </section>

    <div class="divider"></div>

    <section id="architecture" class="feature-card">
      <h2>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        Protocol Architecture
      </h2>
      <div class="feature-content">
        <img src="/framework.png" alt="DeTrade Protocol Architecture" class="architecture-diagram" />
        <p class="image-caption">
          For a comprehensive overview of the framework used by DeTrade, visit the <a href="https://docs.lagoon.finance" target="_blank" rel="noopener noreferrer" class="inline-link">Lagoon documentation</a>.
        </p>
      </div>
    </section>

    <div class="divider"></div>

    <section id="terminology" class="feature-card">
      <h2>Terminology</h2>
      <div class="feature-content">
        <div class="terminology-grid">
          <div class="term-box">
            <h3>ERC-7540</h3>
            <p>This is the smart contract standard utilized by DeTrade vaults. ERC-7540 enables asynchronous deposits and withdrawals, meaning transactions can be queued and processed at a later time instead of requiring immediate execution. It supports share tokenization and builds upon the foundation of its predecessor, ERC-4626, enhancing its functionality.</p>
          </div>

          <div class="term-box">
            <h3>Multisig Wallet</h3>
            <p>Unlike an 'Externally Owned Account' (EOA), which is managed by a single private key, a multisig wallet operates through a smart contract and requires multiple EOAs to act as signers for each transaction.</p>
            <p>This setup enhances security and programmability, making it ideal for scenarios where multiple parties collaborate toward a shared objective or manage significant asset pools. In this space, Safe stands out as the leading and most reliable multisig wallet provider.</p>
          </div>

          <div class="term-box">
            <h3>Price Oracle</h3>
            <p>The price oracle calculates data and updates the vault's net value when requested by the operator. It does this by subtracting debts from the total asset balance.</p>
            <p>The price per share is then determined by dividing the vault's net value by the number of outstanding shares.</p>
          </div>

          <div class="term-box">
            <h3>Shares</h3>
            <p>Shares represent a user's claim on the assets deposited in a DeTrade vault.</p>
            <p>They are issued in exchange for an underlying token at a price set by the oracle during a settlement period. The price per share reflects the vault's performance over time, measured in the underlying token. Essentially, shares entitle users to a portion of the fees generated by the operator (after any applicable commissions).</p>
          </div>

          <div class="term-box">
            <h3>Underlying Token</h3>
            <p>The underlying token is the asset in which the vault manager's profits and losses are denominated.</p>
            <p>It is the token users deposit into the vault and receive when withdrawing, serving as the core asset of the investment.</p>
          </div>

          <div class="term-box">
            <h3>Vault Settlement</h3>
            <p>Settlement refers to the process where a vault operator confirms deposit and/or withdrawal requests. Once settled, users can exchange all or part of their shares for the underlying token, proportional to their ownership in the vault.</p>
          </div>

          <div class="term-box">
            <h3>Vaults</h3>
            <p>DeTrade vaults are investment structures that leverage assets, protocols, and financial tools to implement diverse strategies. The allocation of assets, their changes over time, and other variables are determined by the operator's decisions.</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <nav class="page-navigation">
    <div class="nav-links-container">
      <a href="/" class="nav-link prev">
        <div class="nav-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <div class="nav-text">
            <span class="nav-label">Previous</span>
            <span class="nav-title">Overview</span>
          </div>
        </div>
      </a>
      <a href="/guides" class="nav-link next">
        <div class="nav-content">
          <div class="nav-text">
            <span class="nav-label">Next</span>
            <span class="nav-title">Guides</span>
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

  .overview-content {
    max-width: 1200px;
    margin: 0 auto;
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
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  h1 svg,
  h2 svg {
    color: var(--text-color);
    stroke: currentColor;
    transition: color 0.3s ease, stroke 0.3s ease;
  }

  .feature-card {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: transform 0.2s, background-color 0.2s;
    margin-bottom: 1.5rem;
    width: 100%;
    scroll-margin-top: 80px;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    background: var(--secondary-background);
  }

  /* Annuler l'effet de survol sur les sections Terminology et Architecture */
  #terminology:hover,
  #architecture:hover {
    transform: none;
    background: var(--card-background);
  }

  .feature-content {
    width: 100%;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    color: var(--text-color);
    opacity: 0.8;
  }

  .overview-description {
    font-size: 1.1rem;
    color: var(--text-color);
    opacity: 0.7;
    margin: 0.5rem 0 1.5rem 0;
    line-height: 1.5;
  }

  .framework-logo,
  img[src*="safe_white"],
  img[src*="lagoon"] {
    width: 32px;
    height: 32px;
    object-fit: contain;
    padding: 2px;
    filter: var(--svg-filter);
    transition: filter 0.3s ease;
  }

  img[src*="safe_white"] {
    transform: scale(1.25);
  }

  img[src*="lagoon"] {
    transform: scale(1);
  }

  img[src*="evm"] {
    width: 32px;
    height: 32px;
    object-fit: contain;
    padding: 2px;
    transform: scale(0.9);
    filter: var(--svg-filter-inverse);
    transition: filter 0.3s ease;
  }

  .architecture-diagram {
    width: 100%;
    height: auto;
    object-fit: contain;
    margin: 1rem 0;
    border-radius: 8px;
  }

  .terms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .term-card {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.25rem;
    transition: transform 0.2s;
  }

  .term-card:hover {
    transform: translateY(-2px);
    background: var(--secondary-background);
  }

  .term-card h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .term-card p {
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    color: var(--text-color);
    opacity: 0.8;
  }

  .inline-link {
    color: #3b82f6; /* Bleu */
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s;
  }

  .inline-link:hover {
    color: #2563eb; /* Bleu plus foncé */
  }

  /* Modifier le sélecteur pour ne cibler que les liens dans le contenu */
  .feature-content .inline-link::after {
    content: "↗";
    display: inline-block;
    font-size: 0.9em;
    margin-left: 0.2rem;
    transition: transform 0.2s;
  }

  .feature-content .inline-link:hover::after {
    transform: translate(2px, -2px);
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
      font-size: 1.5rem;
      margin-bottom: 1.75rem;
      justify-content: center;
    }

    .overview-description {
      font-size: 1rem;
      text-align: center;
    }

    .feature-card {
      padding: 1.25rem;
      text-align: center;
    }

    .feature-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .feature-content p {
      text-align: center;
    }

    .terminology-grid {
      grid-template-columns: 1fr;
    }

    .term-box {
      padding: 1.25rem;
      text-align: center;
    }

    .term-box h3 {
      font-size: 1.2rem;
      text-align: center;
    }

    .term-box p {
      text-align: center;
    }

    .image-caption {
      text-align: center;
    }

    .architecture-diagram {
      margin: 1rem auto;
    }

    .nav-content {
      display: flex;
      justify-content: center !important;
      align-items: center;
      width: 100%;
    }

    .nav-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center !important;
    }

    /* Ajuster la position des flèches */
    .prev svg {
      margin-right: auto;
    }

    .next svg {
      margin-left: auto;
    }

    /* Ajuster la taille et l'espacement des textes */
    .nav-label {
      font-size: 0.8rem;
    }

    .nav-title {
      font-size: 1rem;
    }

    /* Réduire le padding sur mobile */
    .nav-link {
      padding: 1rem;
      position: relative;
    }
  }

  .image-caption {
    text-align: left;
    color: var(--text-color);
    opacity: 0.8;
    margin-top: 0.5rem;
  }

  .image-caption svg {
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin: 3rem 0;
  }

  :global(.search-highlight) {
    background-color: rgba(255, 217, 0, 0.3);
    transition: background-color 0.5s ease-out;
    padding: 2px;
    border-radius: 2px;
  }

  section {
    transition: background-color 0.5s ease-out;
  }

  :root {
    --svg-filter: none;
    --svg-filter-inverse: invert(1);
  }

  :global(.dark-mode) {
    --svg-filter: invert(1);
    --svg-filter-inverse: none;
  }

  .terminology-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .term-box {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.2s ease;
  }

  .term-box:hover {
    transform: translateY(-2px);
    background: var(--secondary-background);
  }

  .term-box h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .term-box p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 1rem;
  }

  .term-box p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .terminology-grid {
      grid-template-columns: 1fr;
    }
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
    .nav-links-container {
      grid-template-columns: 1fr;
    }

    .nav-content {
      justify-content: center !important;
    }

    .nav-text {
      text-align: center !important;
    }

    /* Garder la flèche sur le côté même sur mobile */
    .prev .nav-content,
    .next .nav-content {
      flex-direction: row;
      align-items: center;
      gap: 0.75rem;
    }

    /* Ajuster la taille et l'espacement des textes */
    .nav-label {
      font-size: 0.8rem;
    }

    .nav-title {
      font-size: 1rem;
    }

    /* Réduire le padding sur mobile */
    .nav-link {
      padding: 1rem;
    }
  }

  .nav-content svg {
    color: currentColor;
    stroke: currentColor;
    transition: none;
  }
</style> 