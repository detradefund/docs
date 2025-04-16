<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';  // Ajout de l'import pour l'animation
  // Pour gérer l'état des toggles
  let openSections = new Set();

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

  function toggleSection(id) {
    if (openSections.has(id)) {
      openSections.delete(id);
    } else {
      openSections.add(id);
    }
    openSections = openSections; // Pour déclencher la réactivité
  }

  // Fonction pour mettre à jour les meta tags en fonction de la section
  function updateMetaTags() {
    let title = "FAQ – DeTrade";
    let description = "Find answers to frequently asked questions about DeTrade's protocol, vaults, and services.";

    switch(currentHash) {
      case 'deposits-withdrawals':
        title = "Deposits & Withdrawals – DeTrade";
        description = "Learn about DeTrade's deposit and withdrawal processes, cooldown periods, and settlement.";
        break;
      case 'performance-metrics':
        title = "Performance & Metrics – DeTrade";
        description = "Understand DeTrade's performance metrics, APR calculations, and vault valuations.";
        break;
      case 'oracle':
        title = "Oracle – DeTrade";
        description = "Learn about DeTrade's oracle system, price feeds, and valuation mechanisms.";
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
  <title>{currentHash === 'deposits-withdrawals' ? 'Deposits & Withdrawals – DeTrade' : 
          currentHash === 'performance-metrics' ? 'Performance & Metrics – DeTrade' :
          currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 
          'FAQ – DeTrade'}</title>
  <meta name="description" content="Find answers to frequently asked questions about DeTrade's protocol, vaults, and services." />
  <meta property="og:title" content={currentHash === 'deposits-withdrawals' ? 'Deposits & Withdrawals – DeTrade' : 
                                   currentHash === 'performance-metrics' ? 'Performance & Metrics – DeTrade' :
                                   currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 
                                   'FAQ – DeTrade'} />
  <meta property="og:description" content="Find answers to frequently asked questions about DeTrade's protocol, vaults, and services." />
  <meta name="twitter:title" content={currentHash === 'deposits-withdrawals' ? 'Deposits & Withdrawals – DeTrade' : 
                                    currentHash === 'performance-metrics' ? 'Performance & Metrics – DeTrade' :
                                    currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 
                                    'FAQ – DeTrade'} />
  <meta name="twitter:description" content="Find answers to frequently asked questions about DeTrade's protocol, vaults, and services." />
</svelte:head>

<div class="content">
  <div class="title-container">
    <h1>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      Frequently Asked Questions
    </h1>
    <p class="overview-description">Find answers to common questions about DeTrade's protocol, vaults, and services</p>
  </div>

  <div class="faq-sections">
    <section class="faq-section" id="deposits-withdrawals">
      <h2>Deposits & Withdrawals</h2>
      
      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('cooldown-deposit')}
          on:click={() => toggleSection('cooldown-deposit')}
        >
          <span>Why is there a cooldown when depositing?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('cooldown-deposit')}
          <div class="toggle-content" transition:slide>
            <p>When you deposit funds, DeTrade needs a short delay (max 24h but usually less) to effectively manage and allocate your assets to the best opportunities across DeFi. This cooldown allows to:</p>
            <ul>
              <li>Enhance security by manually processing all incoming funds</li>
              <li>Determine where new funds are going into the current strategy</li>
              <li>Calculate the Net Asset Value (NAV) to set the new price per share</li>
              <li>Proceed to the settlement to process deposits at the new share price and NAV</li>
            </ul>
          </div>
        {/if}
      </div>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('cooldown-withdrawal')}
          on:click={() => toggleSection('cooldown-withdrawal')}
        >
          <span>Why is there a cooldown when withdrawing?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('cooldown-withdrawal')}
          <div class="toggle-content" transition:slide>
            <p>When you request a withdrawal, DeTrade need a brief delay (max 24h but usually less) to unwind positions and match withdrawal requests. This cooldown is necessary to:</p>
            <ul>
              <li>Ensure security by manually processing all outgoing funds, allowing us to monitor and prevent any suspicious activity.</li>
              <li>Exit positions strategically to maximize returns.</li>
              <li>Calculate the Net Asset Value (NAV) thanks to DeTrade Oracle to set the new price per share.</li>
              <li>Proceed to the settlement to process withdrawals at the new share price and NAV.</li>
            </ul>
          </div>
        {/if}
      </div>
    </section>

    <section class="faq-section" id="performance-metrics">
      <h2>Performance & Metrics</h2>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('drawdowns')}
          on:click={() => toggleSection('drawdowns')}
        >
          <span>Why vaults can experience drawdowns over time?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('drawdowns')}
          <div class="toggle-content" transition:slide>
            <p>Drawdowns in the vault are typically temporary and very limited in %. They can occur for a couple of reasons:</p>
            
            <ul>
              <li>
                <strong>Price Variations</strong><br>
                Assets with maturity yields (PT tokens from Pendle/Spectra) may experience price fluctuations before maturity. However, these variations are temporary since we secure a fixed yield that will be realized over maturity. We avoid selling these assets before maturity unless necessary due to significant withdrawals.
              </li>
              
              <li>
                <strong>Assets Depeg</strong><br>
                DeTrade invest in many pegged assets (stablecoins, staked tokens, LSTs, LRTs…) that may temporarily lose their peg, causing a short-term drawdown.
              </li>
            </ul>
            
            <div class="note">
              💡 DeTrade recommends maintaining a medium to long-term investment horizon to benefit fully from these strategies and minimize the impact of temporary drawdowns.
            </div>
          </div>
        {/if}
      </div>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('nav')}
          on:click={() => toggleSection('nav')}
        >
          <span>What is the Net Asset Value (NAV)?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('nav')}
          <div class="toggle-content" transition:slide>
            <p>The Net Asset Value (NAV) represents the total value of assets in the vault minus any debts. It is used to determine the price per share for users depositing or withdrawing from the vault. Essentially, NAV helps calculate the value of your investment within the vault.</p>
          </div>
        {/if}
      </div>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('projected-apr')}
          on:click={() => toggleSection('projected-apr')}
        >
          <span>What is the Projected APR?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('projected-apr')}
          <div class="toggle-content" transition:slide>
            <p>The Projected APR represents the net return currently being generated by the strategy on the underlying (ex USDC for DeTrade Core USDC). This yield is determined by the allocation of funds across various DeFi protocols and may fluctuate based on market conditions and strategy adjustments.</p>
            <ul>
              <li>The Projected APR reflects the actual rate at which your capital earns returns after performance fees have been applied.</li>
              <li>The Projected APR may not always be fully reflected during valuation and settlement events, as some returns are only realized once rewards are paid out and fixed-rate yield derivatives mature.</li>
            </ul>
          </div>
        {/if}
      </div>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('realized-apr')}
          on:click={() => toggleSection('realized-apr')}
        >
          <span>What is the 30d Realized APR?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('realized-apr')}
          <div class="toggle-content" transition:slide>
            <p>The 30D Realized APR represents the average net return generated by the strategy on the underlying (ex USDC for DeTrade Core USDC) over the past 30 days. This metric provides a more stable view of the vault's performance by smoothing out short-term fluctuations.</p>
            <ul>
              <li>The 30D Realized APR is calculated based on the evolution of the share price, which is derived from the Net Asset Value (NAV) of the vault.</li>
              <li>As a result, it may differ from the vault's Projected APR.</li>
              <li>The calculation reflects actual realized returns after performance fees have been applied.</li>
            </ul>
            <p class="note">💡 The 30D Realized APR may not reflect underlying returns due to factors such as reward distribution schedules or the maturity of fixed-rate yield derivatives.</p>
          </div>
        {/if}
      </div>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('price-per-share')}
          on:click={() => toggleSection('price-per-share')}
        >
          <span>What is the price per share?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('price-per-share')}
          <div class="toggle-content" transition:slide>
            <p>The price per share is the value of one share in the vault, calculated by dividing the Net Asset Value (NAV) by the total number of outstanding shares. It represents the value of your investment on a per-share basis. (for instance, in DeTrade Core USDC vault, a share is 1 DTUSDC)</p>
          </div>
        {/if}
      </div>
    </section>

    <section class="faq-section" id="oracle">
      <h2>Oracle</h2>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('oracle-work')}
          on:click={() => toggleSection('oracle-work')}
        >
          <span>How does the oracle work?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('oracle-work')}
          <div class="toggle-content" transition:slide>
            <p>The oracle retrieves on-chain information about token balances, including both spot balances in the wallet and receipt tokens representing positions. Depending on the position type, pricing varies:</p>
            <ul>
              <li>For yield-bearing tokens, we directly fetch their value in the underlying token before converting it to the vault's underlying token.</li>
              <li>For more complex cases, we rely on specific APIs (e.g., Pendle's API).</li>
              <li>To calculate asset values while accounting for slippage, we simulate sell transactions via CowSwap and use their API to price assets.</li>
            </ul>
          </div>
        {/if}
      </div>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('oracle-accuracy')}
          on:click={() => toggleSection('oracle-accuracy')}
        >
          <span>Is the oracle accurate, and can errors occur?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('oracle-accuracy')}
          <div class="toggle-content" transition:slide>
            <p>Yes, the oracle is accurate as it relies on on-chain data, but errors may occur if a centralized API (e.g., Pendle or CowSwap) is undergoing maintenance.</p>
            <div class="note">
              💡 This doesn't pose significant issues, as final settlement values pushed to the blockchain are computed manually and undergo human verification to ensure consistency.
            </div>
          </div>
        {/if}
      </div>

      <div class="faq-toggle">
        <button 
          class="toggle-button" 
          class:active={openSections.has('oracle-tracking')}
          on:click={() => toggleSection('oracle-tracking')}
        >
          <span>How can data be tracked, and what about transparency?</span>
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        
        {#if openSections.has('oracle-tracking')}
          <div class="toggle-content" transition:slide>
            <p>We provide a dedicated page at <a href="https://oracle.detrade.fund" target="_blank" rel="noopener noreferrer">oracle.detrade.fund</a> that displays real-time oracle data, including:</p>
            <ul>
              <li>Calculated values and the methods used</li>
              <li>Total value and position breakdowns</li>
              <li>Conversion rates and data sources</li>
            </ul>
            <div class="note">
              💡 In the future, the code will be made open-source on GitHub, enabling full visibility and verification of our approach.
            </div>
          </div>
        {/if}
      </div>
    </section>
  </div>

  <nav class="page-navigation">
    <div class="nav-links-container single">
      <a href="/vaults" class="nav-link prev no-arrow">
        <div class="nav-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <div class="nav-text">
            <span class="nav-label">Previous</span>
            <span class="nav-title">Vaults</span>
          </div>
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
  }

  h1 svg {
    color: var(--text-color);
    stroke: currentColor;
    transition: color 0.3s ease, stroke 0.3s ease;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: var(--text-color);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .faq-section {
    margin-bottom: 3rem;
    scroll-margin-top: 100px;
  }

  .highlight-box {
    background: rgba(96, 165, 250, 0.1);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 1.25rem;
    margin: 1rem 0;
  }

  .highlight-box:hover {
    background: rgba(96, 165, 250, 0.15);
  }

  ul {
    list-style: none;
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  li {
    position: relative;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: var(--text-color);
    opacity: 0.8;
    transition: color 0.3s ease;
  }

  li::before {
    content: "•";
    position: absolute;
    left: -1rem;
    color: var(--text-color);
    opacity: 0.8;
    transition: color 0.3s ease;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: var(--text-color);
    opacity: 0.8;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }

  .note {
    font-style: italic;
    background: rgba(96, 165, 250, 0.1);
    border-radius: 8px;
    padding: 1rem;
    margin: 1.5rem 0;
    color: var(--text-color);
    opacity: 0.9;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }

  .note:hover {
    background: rgba(96, 165, 250, 0.15);
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

    .toggle-button {
      text-align: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
    }

    .toggle-button span {
      text-align: center;
      width: 100%;
    }

    .toggle-content {
      text-align: center;
    }

    .toggle-content p {
      text-align: center;
    }

    .toggle-content ul {
      text-align: left; /* Garder la liste alignée à gauche pour la lisibilité */
      padding-left: 2rem;
    }

    .note {
      text-align: center;
      flex-direction: column;
      align-items: center;
    }

    .faq-section {
      text-align: center;
    }
  }

  .faq-toggle {
    margin-bottom: 1rem;
  }

  .toggle-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 1.05rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-button:hover {
    background: var(--secondary-background);
  }

  .toggle-button.active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: var(--secondary-background);
  }

  .toggle-button .arrow {
    transition: transform 0.2s ease;
  }

  .toggle-button.active .arrow {
    transform: rotate(180deg);
  }

  .toggle-content {
    padding: 1rem;
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  .overview-description {
    font-size: 1.1rem;
    color: var(--text-color);
    opacity: 0.7;
    margin: 0.5rem 0;
    line-height: 1.5;
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

  .nav-links-container.single {
    grid-template-columns: 1fr;
    max-width: 50%;
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

  @media (max-width: 768px) {
    .nav-links-container.single {
      max-width: 100%;
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

    .nav-link {
      padding: 1rem;
      position: relative;
    }

    .prev .nav-content {
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