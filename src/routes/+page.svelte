<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let currentHash = '';

  onMount(() => {
    currentHash = window.location.hash.slice(1);
    
    const handleHashChange = () => {
      currentHash = window.location.hash.slice(1);
      updateMetaTags();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });

  function updateMetaTags() {
    let title = '';
    let description = '';

    switch(currentHash) {
      case 'simplify':
        title = "Simplify Your DeFi Journey – DeTrade";
        description = "Learn how DeTrade simplifies your DeFi experience with optimized yield strategies.";
        break;
      case 'expertise':
        title = "Expertise You Can Trust – DeTrade";
        description = "Discover DeTrade's experienced team of DeFi analysts and investors.";
        break;
      case 'vision':
        title = "Our Vision – DeTrade";
        description = "Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies.";
        break;
      default:
        title = $page.data.title;
        description = $page.data.description;
    }

    document.title = title;

    const metaTags = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
      'meta[property="og:image"]': 'https://docs.detrade.fund/banner.webp',
      'meta[property="og:image:type"]': 'image/webp',
      'meta[property="og:image:width"]': '1200',
      'meta[property="og:image:height"]': '630',
      'meta[name="twitter:card"]': 'summary_large_image',
      'meta[name="twitter:image"]': 'https://docs.detrade.fund/banner.webp',
      'meta[name="theme-color"]': '#0d111c',
      'meta[property="og:site_name"]': 'DeTrade Documentation',
      'meta[property="og:type"]': 'website',
      'meta[property="og:url"]': 'https://docs.detrade.fund/'
    };

    Object.entries(metaTags).forEach(([selector, content]) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute('content', content);
    });
  }
</script>

<svelte:head>
  <title>{currentHash === 'simplify' ? 'Simplify Your DeFi Journey – DeTrade' : 
          currentHash === 'expertise' ? 'Expertise You Can Trust – DeTrade' :
          currentHash === 'vision' ? 'Our Vision – DeTrade' : 
          $page.data.title}</title>
  
  <meta name="description" content={currentHash === 'simplify' ? 
    "Learn how DeTrade simplifies your DeFi experience with optimized yield strategies." :
    currentHash === 'expertise' ? 
    "Discover DeTrade's experienced team of DeFi analysts and investors." :
    currentHash === 'vision' ? 
    "Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies." :
    $page.data.description} />
  
  <meta property="og:image" content="https://docs.detrade.fund/banner.webp" />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://docs.detrade.fund/banner.webp" />
  
  <meta name="theme-color" content="#0d111c" />
  <meta property="og:site_name" content="DeTrade – Documentation" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://docs.detrade.fund/" />
  
  <meta property="og:title" content={currentHash === 'simplify' ? 'Simplify Your DeFi Journey – DeTrade' : 
          currentHash === 'expertise' ? 'Expertise You Can Trust – DeTrade' :
          currentHash === 'vision' ? 'Our Vision – DeTrade' : 
          $page.data.title} />
  
  <meta property="og:description" content={currentHash === 'simplify' ? 
    "Learn how DeTrade simplifies your DeFi experience with optimized yield strategies." :
    currentHash === 'expertise' ? 
    "Discover DeTrade's experienced team of DeFi analysts and investors." :
    currentHash === 'vision' ? 
    "Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies." :
    $page.data.description} />
  
  <meta name="twitter:title" content={currentHash === 'simplify' ? 'Simplify Your DeFi Journey – DeTrade' : 
          currentHash === 'expertise' ? 'Expertise You Can Trust – DeTrade' :
          currentHash === 'vision' ? 'Our Vision – DeTrade' : 
          $page.data.title} />
  
  <meta name="twitter:description" content={currentHash === 'simplify' ? 
    "Learn how DeTrade simplifies your DeFi experience with optimized yield strategies." :
    currentHash === 'expertise' ? 
    "Discover DeTrade's experienced team of DeFi analysts and investors." :
    currentHash === 'vision' ? 
    "Understand DeTrade's vision for delivering optimized returns through diversified DeFi strategies." :
    $page.data.description} />
</svelte:head>

<div class="overview-content">
  <div class="banner-container">
    <img src="/banner.webp" alt="DeTrade Banner" class="banner-image" />
  </div>

  <div class="title-container">
    <h1>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
      Overview
    </h1>
    <p class="overview-description">Maximize your yields with DeTrade's secure, transparent, and decentralized vaults</p>
  </div>
  
  <div class="features-grid">
    <section class="feature-card">
      <h2>Simplify Your DeFi Journey</h2>
      <div class="feature-content">
        <p>
          In the fast-paced and ever-evolving world of decentralized finance (DeFi), opportunities abound. 
          However, navigating the countless projects and strategies can be complex and time-consuming. 
          Staying informed, analyzing options, and making optimal decisions to maximize risk-adjusted yields 
          for your assets requires both time and expertise. That's where DeTrade steps in, offering a 
          solution designed to simplify your DeFi experience and make it effortless.
        </p>
      </div>
    </section>

    <section class="feature-card">
      <h2>Expertise You Can Trust</h2>
      <div class="feature-content">
        <p>
          The DeTrade team is composed of highly experienced DeFi analysts, investors, and builders who 
          are passionate about leveraging their knowledge to your advantage. With their deep understanding 
          of the DeFi landscape, they've crafted a seamless way for you to benefit from their in-depth 
          research and strategic insights. Through DeTrade's on-chain vaults, you can tap into their 
          expertise and enjoy superior risk-adjusted yields without lifting a finger.
        </p>
      </div>
    </section>

    <section class="feature-card">
      <h2>A Vision for Optimized Returns</h2>
      <div class="feature-content">
        <p>
          DeTrade's vision is clear: diversify funds across a variety of DeFi protocols and yield 
          strategies to deliver the best possible risk-adjusted returns for users. By carefully selecting 
          and managing opportunities within the ecosystem, the team ensures that your investments are 
          positioned for success. This approach balances potential rewards with calculated risk, giving 
          you peace of mind as you grow your assets.
        </p>
      </div>
    </section>
  </div>
</div>

<style>
  .overview-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--text-color);
  }

  .banner-container {
    width: 100%;
    margin-bottom: 2rem;
    overflow: hidden;
    border-radius: 16px;
  }

  .banner-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
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
    margin-bottom: 1.25rem;
    color: var(--text-color);
  }

  .features-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  .feature-card {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: transform 0.2s, background-color 0.2s;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    background: var(--secondary-background);
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
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .overview-content {
      padding: 1rem;
    }

    .banner-container {
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 2rem;
      justify-content: center;
    }

    .title-container {
      text-align: center;
      margin-top: 3rem;
      margin-bottom: 3rem;
    }

    .overview-description {
      font-size: 1rem;
      text-align: center;
    }

    .feature-card {
      text-align: center;
    }

    .feature-card h2 {
      text-align: center;
    }

    p {
      font-size: 1rem;
      text-align: center;
    }
  }

  /* Ajout des transitions spécifiques pour les SVG de la page */
  :global(svg) {
    transition: all 0.3s ease;
    stroke: var(--text-color);
  }

  :global(svg path),
  :global(svg line),
  :global(svg circle),
  :global(svg polyline),
  :global(svg rect) {
    transition: all 0.3s ease;
    stroke: var(--text-color);
  }

  /* Assurons-nous que les icônes utilisent la couleur du texte */
  h1 svg,
  .feature-card svg {
    color: var(--text-color);
    stroke: currentColor;
    transition: all 0.3s ease;
  }
</style> 