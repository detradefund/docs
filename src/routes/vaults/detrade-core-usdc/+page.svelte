<script>
  import { onMount } from 'svelte';
</script>

<svelte:head>
  <title>DeTrade Core USDC – DeTrade</title>
  <meta name="description" content="Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields." />
  <meta property="og:title" content="DeTrade Core USDC – DeTrade" />
  <meta property="og:description" content="Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields." />
  <meta name="twitter:title" content="DeTrade Core USDC – DeTrade" />
  <meta name="twitter:description" content="Deposit and manage your USDC in DeTrade's Core USDC vault for optimized yields." />
</svelte:head>

<div class="content">
  <div class="vault-header">
    <h1>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 13v8"/>
        <path d="M8 21h8"/>
      </svg>
      DeTrade Core USDC
    </h1>
    <div class="vault-badges">
      <span class="badge network">Base</span>
      <span class="badge asset">USDC</span>
    </div>
  </div>

  <div class="vault-objective">
    <h2>Core Strategies</h2>
    <p class="strategy-description">Your capital remains pegged to USD through various yield-bearing stablecoins and stablecoin pairs, while being deployed into carefully selected yield-generating opportunities.</p>

    <div class="strategies-grid">
      <div class="strategy-card">
        <h4>Top-tier DEX Liquidity</h4>
        <p>Provide liquidity on established decentralized exchanges through stable-to-stable pairs, minimizing impermanent loss while earning consistent trading fees.</p>
      </div>

      <div class="strategy-card">
        <h4>Secure Lending Markets</h4>
        <p>Deploy capital across battle-tested lending protocols, earning interest from borrowers while maintaining full withdrawability through yield-bearing tokens.</p>
      </div>

      <div class="strategy-card">
        <h4>Pegged Yield-bearing Assets</h4>
        <p>Utilize dollar-pegged tokens that automatically generate yield through lending markets and protocol revenues, always maintaining 1:1 backing.</p>
      </div>

      <div class="strategy-card">
        <h4>Yield Derivatives</h4>
        <p>Access both fixed and variable rate returns through stablecoin yield derivatives, without taking on any price exposure to volatile assets.</p>
      </div>
    </div>

    <div class="info-box">
      <p>💡 Our strategies are designed to maximize risk-adjusted yield through diversification and real-time monitoring, not through price betting or leverage on volatile assets. All positions maintain strict dollar pegging with no exposure to price fluctuations.</p>
    </div>
  </div>

  <section class="fees-section">
    <h2>Fees</h2>
    <p class="section-description">This fee model is designed to be simple and user-friendly, ensuring investors benefit from a cost-effective and results-based approach.</p>
    
    <div class="fees-container">
      <div class="fees-overview">
        <div class="fee-item">
          <span class="fee-label">Performance Fee</span>
          <span class="fee-value">15%</span>
        </div>
        <div class="fee-item">
          <span class="fee-label">Management Fee</span>
          <span class="fee-value">None</span>
        </div>
        <div class="fee-item">
          <span class="fee-label">Entry/Exit Fee</span>
          <span class="fee-value">None</span>
        </div>
      </div>

      <div class="info-box">
        <p>💡 When performance fees are collected, the vault mints new shares to dilute the fund proportionally. This mechanism ensures fair fee collection without affecting the deposited capital of existing users.</p>
      </div>
    </div>
  </section>

  <section class="contracts-section">
    <h2>Contracts & Key Addresses</h2>
    <p class="section-description">All technical parameters are viewable in the "Parameters" tab on the vault page. Click any address to view on Basescan.</p>
    
    <div class="contracts-list">
      <div class="contract-card">
        <span class="label">Vault Contract</span>
        <div class="address-container">
          <a href="https://basescan.org/address/0x8092cA384D44260ea4feaf7457B629B8DC6f88F0" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="address">
            <code>0x8092cA384D44260ea4feaf7457B629B8DC6f88F0</code>
          </a>
          <a href="https://basescan.org/address/0x8092cA384D44260ea4feaf7457B629B8DC6f88F0" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="icon-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="link-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="contract-card">
        <span class="label">Safe (Multisig)</span>
        <div class="address-container">
          <a href="https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="address">
            <code>0xc6835323372a4393b90bcc227c58e82d45ce4b7d</code>
          </a>
          <a href="https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="icon-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="link-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="contract-card">
        <span class="label">Fee Receiver</span>
        <a href="https://basescan.org/address/0x7489d305F10760d686F8d4BB2e211a7f31c2f787" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="address">
          <code>0x7489d305F10760d686F8d4BB2e211a7f31c2f787</code>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>

      <div class="contract-card">
        <span class="label">Fee Registry</span>
        <a href="https://basescan.org/address/0x6dA4D1859bA1d02D095D2246142CdAd52233e27C" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="address">
          <code>0x6dA4D1859bA1d02D095D2246142CdAd52233e27C</code>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>

      <div class="contract-card">
        <span class="label">Oracle</span>
        <a href="https://basescan.org/address/0xc6835323372a4393b90bcc227c58e82d45ce4b7d" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="address">
          <code>0xc6835323372a4393b90bcc227c58e82d45ce4b7d</code>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>

  <nav class="page-navigation">
    <div class="nav-links-container">
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
  :global(body) {
    overflow-x: hidden;
    width: 100%;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--text-color);
    width: 100%;
    overflow-x: hidden;
  }

  .vault-header {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
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

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  section {
    margin-bottom: 3rem;
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.2s ease;
    background: transparent;
  }

  section:hover {
    transform: translateY(-2px);
    background: transparent;
  }

  .vault-badges {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .badge {
    background: var(--card-background);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid var(--card-border);
  }

  .strategies-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .strategy-card {
    padding: 1.25rem;
    background: transparent;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    transition: all 0.15s ease;
  }

  .strategy-card:hover {
    background: var(--secondary-background);
  }

  .strategy-card h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: var(--text-color);
  }

  .strategy-card p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
  }

  .important-note {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
    transition: all 0.2s ease;
  }

  .important-note:hover {
    background: var(--secondary-background);
  }

  .formula {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
    transition: all 0.2s ease;
  }

  .formula:hover {
    background: var(--secondary-background);
  }

  pre {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    transition: all 0.2s ease;
    color: var(--text-color);
  }

  pre:hover {
    background: var(--secondary-background);
  }

  code {
    font-family: monospace;
    font-size: 0.9rem;
    color: var(--text-color);
  }

  .formula-details {
    list-style: none;
    padding-left: 0;
    margin: 1rem 0;
  }

  .formula-variables {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .variable-item {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .variable-item code {
    color: var(--text-color);
    margin-right: 1rem;
  }

  .variable-item span {
    color: var(--text-color);
    opacity: 0.7;
    font-size: 0.9rem;
  }

  .addresses-grid {
    display: grid;
    gap: 1rem;
  }

  .address-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.25rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .address-item:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .address-item code {
    color: #60A5FA;
    transition: color 0.2s ease;
  }

  .address-item:hover code {
    color: #93C5FD;
  }

  .address-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-family: monospace;
    font-size: 0.9rem;
    background: transparent;
  }

  .address-link code {
    color: #60A5FA;
  }

  .address-link svg {
    stroke: #60A5FA;
  }

  .address-link:hover code {
    opacity: 0.8;
  }

  /* Supprimer la flèche des liens externes */
  .address-link[target="_blank"]::after {
    content: none;
  }

  @media (max-width: 768px) {
    .content {
      padding: 1rem;
      text-align: center;
      width: 100%;
      overflow-x: hidden;
    }

    .vault-header {
      text-align: center;
    }

    h1 {
      font-size: 2rem;
      justify-content: center;
    }

    .vault-badges {
      justify-content: center;
    }

    h2, h3, h4 {
      text-align: center;
      justify-content: center;
    }

    .strategy-description {
      text-align: center;
    }

    .strategy-card {
      text-align: center;
    }

    .info-box p {
      text-align: center;
    }

    .fees-overview {
      text-align: center;
    }

    .fee-item {
      flex-direction: column;
      gap: 0.5rem;
    }

    .contract-card {
      text-align: center;
    }

    .label {
      text-align: center;
    }

    .address-container {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .strategies-grid,
    .contracts-list {
      grid-template-columns: 1fr;
      width: 100%;
    }

    .strategy-card,
    .contract-card {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .address code {
      word-break: break-all;
      max-width: 100%;
    }

    .contracts-section {
      padding: 1rem;
      width: 100%;
      box-sizing: border-box;
    }

    .vault-header,
    .vault-objective,
    .fees-section,
    .info-box {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      padding: 1rem;
    }
  }

  .note {
    font-style: italic;
    color: var(--text-color);
    opacity: 0.7;
    margin-top: 1rem;
  }

  .fees-section {
    margin-bottom: 3rem;
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.2s ease;
  }

  .fees-container {
    display: grid;
    gap: 2rem;
  }

  .fees-overview {
    display: grid;
    gap: 1rem;
  }

  .fee-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--secondary-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .fee-label {
    color: var(--text-color);
    font-weight: 500;
  }

  .fee-value {
    color: var(--text-color);
    font-weight: 600;
  }

  .fee-note {
    color: var(--text-color);
    opacity: 0.8;
    font-size: 0.95rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    .fees-container {
      gap: 1.5rem;
    }
  }

  .overview-description {
    font-size: 1.1rem;
    color: var(--text-color);
    opacity: 0.7;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .vault-objective {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
    transition: all 0.2s ease;
  }

  .info-box {
    background: rgba(96, 165, 250, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
  }

  .info-box p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
    font-style: italic;
  }

  .contracts-section {
    margin-bottom: 3rem;
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 2rem;
  }

  .section-description {
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 2rem;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .contracts-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .contract-card:last-child {
    grid-column: 1 / 2;
    width: 100%;
  }

  .contract-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: transparent;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    transition: all 0.15s ease;
  }

  .contract-card:hover {
    background: var(--secondary-background);
  }

  .label {
    font-weight: 500;
    color: var(--text-color);
    font-size: 0.9rem;
  }

  .address-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .address {
    text-decoration: none;
    background: transparent;
  }

  .address code {
    color: #60A5FA;
    font-family: monospace;
    font-size: 0.85rem;
    background: transparent;
  }

  .icon-link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .link-icon {
    color: #60A5FA;
    stroke: currentColor;
  }

  .address:hover code,
  .icon-link:hover .link-icon {
    opacity: 0.8;
  }

  /* Supprimer la flèche des liens externes */
  .address[target="_blank"]::after,
  .icon-link[target="_blank"]::after {
    content: none;
  }

  @media (max-width: 768px) {
    .contracts-list {
      grid-template-columns: 1fr;
    }

    .contract-card:last-child {
      grid-column: auto;
      width: 100%;
    }
  }

  .fees-section .info-box {
    background: rgba(96, 165, 250, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
  }

  .fees-section .info-box p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
    font-style: italic;
  }

  .strategy-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
    margin-bottom: 1.5rem;
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