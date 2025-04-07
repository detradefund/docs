<div class="content">
  <div class="title-container">
    <h1>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      Security and Risk
    </h1>
    <p class="overview-description">Understanding the Risks: Security, Infrastructure & Valuation Integrity</p>
  </div>

  <div class="sections-grid">
    <section id="defi-exposure" class="risk-section">
      <h2>DeFi Exposure</h2>
      <p>While DeTrade prioritizes capital preservation through careful protocol selection, investing in DeFi protocols comes with inherent risks that users must fully understand.</p>
      
      <div class="risk-cards-grid">
        <div class="risk-card">
          <h3>Smart Contract Risk</h3>
          <p>All vault operations rely on smart contracts, especially those built by Lagoon and other DeFi protocols. Even if contracts have been audited, the risk of bugs, exploits, or vulnerabilities remains. A single flaw can lead to partial or total loss of funds.</p>
        </div>

        <div class="risk-card">
          <h3>Depeg Risk</h3>
          <p>Many vaults hold assets like stablecoins, staked ETH, or Liquid Staking Tokens (LSTs). These assets are designed to track a reference value (e.g., $1 or ETH), but may lose their peg due to market stress, poor collateral management, or systemic failures. A depeg event can significantly impact vault value, either temporarily or permanently.</p>
        </div>
      </div>

      <p class="note">
        💡 DeTrade takes these risks very seriously. Every opportunity is analyzed in depth, and funds are only deployed when the potential returns clearly outweigh the associated risks — and when those risks are sufficiently mitigated by the protocol's design and security practices. If our assessment reveals unacceptable exposure, we do not invest, regardless of how attractive the returns may seem.
      </p>
    </section>

    <div class="divider"></div>

    <section id="infrastructure" class="risk-section">
      <h2>Infrastructure</h2>
      <p>DeTrade operates on top of Lagoon infrastructure, leveraging audited smart contracts and additional safety mechanisms to protect users' capital. However, even with robust engineering and multiple security layers, risks remain.</p>

      <div class="risk-cards-grid">
        <div class="risk-card">
          <h3>Lagoon Smart Contracts</h3>
          <p>All vault logic — including deposits, withdrawals, and yield strategies — runs on Lagoon contracts audited by Nethermind, a reputable firm in the Ethereum ecosystem. While audits drastically reduce risk, they do not eliminate the possibility of vulnerabilities or edge-case failures.</p>
        </div>

        <div class="risk-card">
          <h3>Multisig Governance</h3>
          <p>Vault management is secured by a multisignature wallet (multisig), ensuring no single party can control or move funds unilaterally. This setup greatly enhances security but still carries a non-zero risk as the multisig itself is a smart contract potentially subject to bugs or mismanagement.</p>
        </div>

        <div class="risk-card">
          <h3>Cooldown Mechanisms</h3>
          <p>Deposits and withdrawals are subject to cooldown periods to prevent abuse or timing-based attacks. These mechanisms improve security and protocol stability, though they introduce a short delay in liquidity access and are not a universal safeguard against all threat vectors.</p>
        </div>
      </div>

      <p class="note">
        💡 Our infrastructure has been thoroughly audited by Nethermind, with multiple security reviews available in the Audits section below, covering both core protocol mechanisms and specific implementations.
      </p>
    </section>

    <div class="divider"></div>

    <section id="oracle-design" class="risk-section">
      <h2>Oracle Design</h2>
      <p>Unlike many DeFi systems that rely on automated price feeds, DeTrade has adopted a manual oracle system for computing and updating the Net Asset Value (NAV) of each vault — a key choice for security.</p>

      <div class="risk-cards-grid">
        <div class="risk-card">
          <h3>Off-Chain Valuation</h3>
          <p>Vault values are calculated off-chain by the DeTrade team using real yield data from the underlying strategies. This valuation is not driven by on-chain oracles, which are often vulnerable to manipulation.</p>
        </div>

        <div class="risk-card">
          <h3>Human Verification</h3>
          <p>Every NAV update and subsequent minting or burning of shares undergoes manual validation before being submitted on-chain. This ensures no automated process can be exploited to manipulate the share price or create arbitrage opportunities.</p>
        </div>

        <div class="risk-card">
          <h3>Exploit Mitigation</h3>
          <p>By removing real-time on-chain price feeds from the critical path, DeTrade eliminates common oracle manipulation vectors (e.g., flash loan-based price distortion), making it far more difficult for attackers to game the system during deposits or withdrawals.</p>
        </div>
      </div>

      <p class="note">
        💡 This manual, human-in-the-loop system strengthens DeTrade's resistance to one of DeFi's most common attack surfaces — price oracle exploits — while maintaining transparency and operational control.
      </p>
    </section>

    <div class="divider"></div>

    <section id="audit" class="risk-section">
      <h2>
        Audits
      </h2>
      <p>DeTrade's security is built on Lagoon's thoroughly audited infrastructure. These comprehensive audits, conducted by Nethermind, one of the most respected security firms in the Ethereum ecosystem, validate both Lagoon's core infrastructure and the specific implementations used by DeTrade.</p>

      <div class="risk-cards-grid">
        <div class="risk-card audit-card">
          <img src="/nethermind_security.avif" alt="Nethermind Security" class="audit-image" />
          <h3>Scope - Beta release (v0.2.0)</h3>
          <p>30-01-2025</p>
          <a href="/NM_0432_Lagoon.pdf" target="_blank" class="audit-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            View Audit Report
          </a>
        </div>

        <div class="risk-card audit-card">
          <img src="/nethermind_security.avif" alt="Nethermind Security" class="audit-image" />
          <h3>Scope - Beta release (v0.1.0)</h3>
          <p>07-11-2024</p>
          <a href="/NM_0304_HopperLabs.pdf" target="_blank" class="audit-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            View Audit Report
          </a>
        </div>

        <div class="risk-card audit-card">
          <img src="/lagoon-review.avif" alt="Lagoon Security Review" class="audit-image" />
          <h3>Scope Beta release (v0.1.0)</h3>
          <p>27-09-2024</p>
          <a href="/lagoon-review.pdf" target="_blank" class="audit-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            View Audit Report
          </a>
        </div>
      </div>

      <p class="note">
        💡 While these audits significantly strengthen our security posture, we maintain ongoing vigilance and continuous security monitoring as part of our commitment to protecting user funds.
      </p>
    </section>
  </div>
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
    pointer-events: none;
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

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.8;
    margin: 0.75rem 0;
  }

  .overview-description {
    font-size: 1.1rem;
    color: var(--text-color);
    opacity: 0.7;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .intro-text {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-top: 1.5rem;
    color: var(--text-color);
    opacity: 0.8;
  }

  .sections-grid {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .risk-section {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    scroll-margin-top: 80px;
  }

  .risk-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .risk-card {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.25rem;
    margin: 0;
    transition: all 0.2s ease;
  }

  .risk-card:hover {
    transform: translateY(-2px);
    background: var(--secondary-background);
  }

  .note {
    font-style: italic;
    background: rgba(96, 165, 250, 0.1);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 1.5rem;
    transition: all 0.2s ease;
    color: var(--text-color);
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
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

    .risk-section {
      text-align: center;
    }

    .risk-section p {
      text-align: center;
    }

    .risk-card {
      text-align: center;
    }

    .risk-card h3 {
      text-align: center;
    }

    .risk-card p {
      text-align: center;
    }

    .note {
      text-align: center;
    }

    .audit-card {
      text-align: center;
    }

    .risk-cards-grid {
      grid-template-columns: 1fr;
    }

    .risk-card {
      padding: 1rem;
    }
  }

  .faq-card {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: all 0.2s ease;
  }

  .faq-card:hover {
    transform: translateY(-2px);
    background: var(--secondary-background);
  }

  :global(a) {
    color: #3b82f6;
    text-decoration: underline;
  }

  :global(a:not(.no-arrow):first-of-type::after) {
    content: "↗";
    display: inline-block;
    font-size: 0.9em;
    margin-left: 0.2rem;
    transition: transform 0.2s;
  }

  :global(a:first-of-type:hover::after) {
    transform: translate(2px, -2px);
  }

  :global(a:hover) {
    color: #2563eb;
  }

  .audit-image {
    width: 100%;
    height: 160px;
    border-radius: 8px;
    margin-bottom: 1rem;
    object-fit: cover;
    object-position: center;
  }

  .audit-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .audit-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.1);
    transition: all 0.2s ease;
    text-decoration: none !important;
  }

  .audit-link:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
  }

  .audit-link svg {
    width: 20px;
    height: 20px;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: var(--text-color);
    margin: 2rem 0;
    opacity: 0.1;
  }
</style>

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
    let title = "Security – DeTrade";
    let description = "Learn about DeTrade's security measures, audits, and risk management practices.";

    switch(currentHash) {
      case 'defi-exposure':
        title = "DeFi Exposure – DeTrade";
        description = "Understand DeTrade's approach to DeFi exposure and risk management in vault operations.";
        break;
      case 'infrastructure':
        title = "Infrastructure – DeTrade";
        description = "Explore DeTrade's secure infrastructure built on Lagoon and protected by multiple security layers.";
        break;
      case 'oracle-design':
        title = "Oracle Design – DeTrade";
        description = "Learn about DeTrade's oracle system design and how it ensures accurate value computation.";
        break;
      case 'audit':
        title = "Audits – DeTrade";
        description = "Review DeTrade's security audits conducted by Nethermind and other leading firms.";
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
  <title>{currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 'Security – DeTrade'}</title>
  <meta name="description" content="Learn about DeTrade's security measures, audits, and risk management practices." />
  <meta property="og:title" content={currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 'Security – DeTrade'} />
  <meta property="og:description" content="Learn about DeTrade's security measures, audits, and risk management practices." />
  <meta name="twitter:title" content={currentHash ? `${currentHash.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} – DeTrade` : 'Security – DeTrade'} />
  <meta name="twitter:description" content="Learn about DeTrade's security measures, audits, and risk management practices." />
</svelte:head> 