<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let currentHash = '';
  let depositGifSrc = '/deposit.gif';
  let withdrawGifSrc = '/withdraw.gif';

  // Fonction pour recharger les GIFs
  function reloadDepositGif() {
    depositGifSrc = `/deposit.gif?t=${Date.now()}`;
  }

  function reloadWithdrawGif() {
    withdrawGifSrc = `/withdraw.gif?t=${Date.now()}`;
  }

  onMount(() => {
    // Gestion du hash dans l'URL
    currentHash = window.location.hash.slice(1);
    
    // Écoute les changements de hash
    window.addEventListener('hashchange', () => {
      currentHash = window.location.hash.slice(1);
      updateMetaTags();
    });

    // Recharge les GIFs toutes les 10 secondes
    const depositInterval = setInterval(reloadDepositGif, 10000);
    const withdrawInterval = setInterval(reloadWithdrawGif, 10000);

    return () => {
      window.removeEventListener('hashchange', () => {});
      clearInterval(depositInterval);
      clearInterval(withdrawInterval);
    };
  });

  // Fonction pour mettre à jour les meta tags en fonction de la section
  function updateMetaTags() {
    let title = "Guides – DeTrade";
    let description = "Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more.";

    switch(currentHash) {
      case 'deposit':
        title = "How to Deposit – DeTrade";
        description = "Step-by-step guide on how to deposit assets into DeTrade vaults.";
        break;
      case 'withdraw':
        title = "How to Withdraw – DeTrade";
        description = "Step-by-step guide on how to withdraw assets from DeTrade vaults.";
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
  <title>{currentHash ? `How to ${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} – DeTrade` : 'Guides – DeTrade'}</title>
  <meta name="description" content="Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more." />
  <meta property="og:title" content={currentHash ? `How to ${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} – DeTrade` : 'Guides – DeTrade'} />
  <meta property="og:description" content="Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more." />
  <meta name="twitter:title" content={currentHash ? `How to ${currentHash.charAt(0).toUpperCase() + currentHash.slice(1)} – DeTrade` : 'Guides – DeTrade'} />
  <meta name="twitter:description" content="Learn how to use DeTrade with our detailed guides for deposits, withdrawals and more." />
</svelte:head>

<div class="content">
  <div class="title-container">
    <h1>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
      Guides
    </h1>
    <p class="overview-description">Learn how to use DeTrade with our detailed guides</p>
  </div>

  <section id="deposit" class="content-section featured-guide">
    <h3>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 4v10"/>
        <path d="m8 11 4 4 4-4"/>
        <path d="M4 18h16"/>
      </svg>
      How to Deposit
    </h3>
    <p class="guide-note">This guide uses the DeTrade Core USDC Vault as an example, but the process remains the same for all current and future DeTrade vaults.</p>
    
    <div class="steps-grid">
      <div class="step">
        <h4>1. Connect Your Wallet</h4>
        <p>Start by connecting your wallet on the DeTrade app.</p>
      </div>

      <div class="step">
        <h4>2. Make Sure You Have the Right Asset</h4>
        <p>Ensure you hold the correct asset on the Base network. For example, to deposit into the USDC vault, your wallet must contain USDC on Base.</p>
      </div>

      <div class="step">
        <h4>3. Go to the Vault Page</h4>
        <p>Head over to the vault you wish to deposit into. For example: DeTrade Core USDC.</p>
      </div>

      <div class="step">
        <h4>4. Click "Deposit"</h4>
        <p>On the vault page, find the "My Wallet Balance" card and click "Deposit".</p>
      </div>

      <div class="step">
        <h4>5. Approve Access to Your Asset</h4>
        <p>As is standard in DeFi, you'll first need to approve the vault contract to access your USDC. This is a one-time authorization per asset.</p>
      </div>

      <div class="step">
        <h4>6. Make Your Deposit</h4>
        <p>After the approval goes through, return to the deposit screen. Enter the amount of USDC you'd like to deposit, click "Deposit", and sign the transaction in your wallet.</p>
      </div>
    </div>

    <div class="demo-container">
      <!-- GIF avec rechargement automatique -->
      <img 
        src={depositGifSrc}
        alt="Demonstration of deposit process" 
        class="demo-gif"
        on:error={reloadDepositGif}
      />
    </div>

    <div class="full-width-step">
      <div class="step">
        <h4>7. Wait for Processing</h4>
        <p>Once the transaction is confirmed, you'll see a "Deposit Pending" message on the vault page. Your funds are now being processed by DeTrade. This usually takes less than 24 hours, depending on the timing of the next NAV update.</p>
      </div>

      <div class="demo-container">
        <img 
          src="/pending_deposit.gif" 
          alt="Pending deposit demonstration" 
          class="demo-gif"
        />
      </div>
    </div>

    <div class="steps-grid">
      <div class="step">
        <h4>8. Claim Your Vault Tokens</h4>
        <p>After the next NAV and settlement, you'll be prompted to claim your DTUSDC tokens — these represent your shares in the vault. While not required, claiming these tokens helps you track and manage your position. Simply click and sign the transaction.</p>
      </div>

      <div class="step">
        <h4>9. Check Your Position</h4>
        <p>Once claimed, your full position will appear in the "My Position" card, showing your DTUSDC balance and its value in USDC.</p>
      </div>
    </div>

    <!-- Info box en pleine largeur -->
    <div class="info-box full-width">
      <h4><em>💡 How Your Position Value is Calculated</em></h4>
      <p><em>Your vault value = Number of DTUSDC shares × Price per share (in USDC)</em></p>
      <p><em>The price per share is calculated as: NAV ÷ Total number of shares</em></p>
    </div>
  </section>

  <div class="divider"></div>

  <section id="withdraw" class="content-section featured-guide">
    <h3>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20v-10"/>
        <path d="m8 13 4-4 4 4"/>
        <path d="M4 20h16"/>
      </svg>
      How to Withdraw
    </h3>
    <p class="guide-note">This guide uses the DeTrade Core USDC Vault as an example, but the process remains the same for all current and future DeTrade vaults.</p>
    
    <div class="steps-grid">
      <div class="step">
        <h4>1. Connect Your Wallet</h4>
        <p>Start by connecting your wallet on the DeTrade app.</p>
      </div>

      <div class="step">
        <h4>2. Go to the Vault Page</h4>
        <p>Head over to the vault you wish to withdraw from. For example: DeTrade Core USDC.</p>
      </div>

      <div class="step">
        <h4>3. Check Your Position</h4>
        <p>Verify your available balance in the "My Position" card, showing your DTUSDC balance and its current value in USDC.</p>
      </div>

      <div class="step">
        <h4>4. Click "Withdraw"</h4>
        <p>On the vault page, find the "My Position" card and click "Withdraw".</p>
      </div>

      <div class="step">
        <h4>5. Enter Withdrawal Amount</h4>
        <p>Enter the amount of DTUSDC tokens you'd like to withdraw, click "Withdraw", and sign the transaction in your wallet.</p>
      </div>

      <div class="step">
        <h4>6. Submit Withdrawal</h4>
        <p>Confirm your withdrawal request by signing the transaction. This will queue your withdrawal for the next settlement period.</p>
      </div>
    </div>

    <div class="demo-container">
      <img 
        src={withdrawGifSrc}
        alt="Demonstration of withdrawal process" 
        class="demo-gif"
        on:error={reloadWithdrawGif}
      />
    </div>

    <div class="full-width-step">
      <div class="step">
        <h4>7. Wait for Processing</h4>
        <p>Once the transaction is confirmed, you'll see a "Withdrawal Pending" message. Your withdrawal request will be processed during the next NAV update and settlement period, typically within 24 hours.</p>
        <p class="note">Note: If you have both deposit and withdrawal requests pending at the same time, you'll see both status cards displayed simultaneously, as shown below.</p>
      </div>

      <div class="demo-container">
        <img 
          src="/pending_withdraw.gif" 
          alt="Pending withdrawal demonstration" 
          class="demo-gif"
        />
      </div>
    </div>

    <div class="steps-grid">
      <div class="step">
        <h4>8. Claim Your USDC</h4>
        <p>After the next NAV and settlement, you'll be prompted to claim your USDC. Simply click and sign the transaction to receive your funds.</p>
      </div>

      <div class="step">
        <h4>9. Check Your Wallet</h4>
        <p>Once claimed, the USDC will appear in your wallet balance. Your position in the vault will be reduced accordingly.</p>
      </div>
    </div>

    <div class="info-box full-width">
      <h4><em>💡 Understanding Withdrawal Value</em></h4>
      <p><em>Your withdrawal value = Number of DTUSDC shares withdrawn × Next settlement price per share (in USDC)</em></p>
      <p><em>The price per share will be calculated at the next NAV update as: NAV ÷ Total number of shares</em></p>
      <p class="note"><em>Note: The actual value you receive will be based on the vault's NAV at the next settlement, not the current displayed price.</em></p>
    </div>
  </section>
</div>

<style>
  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--text-color);
  }

  .guides-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
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

  .overview-description {
    font-size: 1.1rem;
    color: var(--text-color);
    opacity: 0.7;
    margin: 0.5rem 0 1.5rem 0;
    line-height: 1.5;
  }

  .content-section {
    margin-bottom: 4rem;
    scroll-margin-top: 80px;
  }

  .featured-guide {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-top: 1.5rem;
  }

  .guide-detailed {
    margin-top: 2rem;
  }

  .step {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: all 0.2s ease;
  }

  .step:hover {
    transform: translateY(-2px);
    background: var(--secondary-background);
  }

  .step h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }

  .step p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--text-color);
    opacity: 0.8;
  }

  .info-box {
    background: rgba(96, 165, 250, 0.1);
    border-radius: 8px;
    padding: 1rem;
    margin: 1.5rem 0;
    transition: all 0.2s ease;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-box:hover {
    background: rgba(96, 165, 250, 0.15);
  }

  .info-box h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  /* Style spécifique pour les titres avec emoji */
  .info-box h4 em {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .info-box p {
    font-size: 0.95rem;
    line-height: 1.4;
    margin-bottom: 0.25rem;
    opacity: 0.85;
  }

  .info-box p em {
    font-style: normal; /* Enlève l'italique pour une meilleure lisibilité */
  }

  .info-box p.note {
    margin-top: 0.5rem;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 1rem 0;
  }

  .demo-container {
    margin: 0 0 2rem 0;
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    overflow: hidden;
  }

  .demo-gif {
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
  }

  .full-width-step {
    margin: 1rem 0;
    width: 100%;
  }

  .full-width-step .step {
    margin-bottom: 2rem;
  }

  .full-width-step .demo-container {
    margin: 0 0 2rem 0;
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

    h2, h3, h4 {
      text-align: center;
      justify-content: center;
    }

    .overview-description {
      text-align: center;
    }

    .guide-note {
      text-align: center;
    }

    .step {
      text-align: center;
    }

    .step h4 {
      justify-content: center;
    }

    .step p {
      text-align: center;
    }

    .info-box {
      text-align: center;
    }

    .info-box h4 {
      justify-content: center;
    }

    .info-box p {
      text-align: center;
    }

    .steps-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .step {
      padding: 1.25rem;
    }

    .demo-container {
      margin: 0 0 2rem 0;
    }

    .full-width-step {
      margin: 1rem 0;
    }
  }

  @media (max-width: 1024px) {
    .demo-container {
      margin: 0 0 2rem 0;
    }
  }

  .info-box.full-width {
    width: 100%;
    margin: 1rem 0;
  }

  .guide-note {
    font-size: 1rem;
    line-height: 1.5;
    margin: 1rem 0 1.5rem;
    font-style: italic;
    color: var(--text-color);
    opacity: 0.7;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin: 3rem 0;
  }

  .note {
    font-style: italic;
    background: rgba(96, 165, 250, 0.1);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 1rem;
    margin: 2rem 0;
    transition: all 0.2s ease;
    color: var(--text-color);
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .note:hover {
    background: rgba(96, 165, 250, 0.15);
  }

  .step .note {
    margin: 2rem 0 0 0;
  }
</style> 