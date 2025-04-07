<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { sidebarOpen } from '$lib/stores/sidebar';
  import { goto } from '$app/navigation';

  // État pour gérer l'ouverture/fermeture des sous-menus
  let guidesOpen = true;
  let frameworkOpen = true;
  let vaultsOpen = true;
  let securityOpen = true;
  let faqOpen = true;

  function toggleGuides() {
    guidesOpen = !guidesOpen;
  }

  function toggleFramework() {
    frameworkOpen = !frameworkOpen;
  }

  function toggleVaults() {
    vaultsOpen = !vaultsOpen;
  }

  function toggleSecurity() {
    securityOpen = !securityOpen;
  }

  function toggleFaq() {
    faqOpen = !faqOpen;
  }

  const sections = [
    {
      title: "Overview",
      href: "/",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>`
    },
    {
      title: "Framework",
      href: "/framework",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>`,
      subItems: [
        {
          title: "Features",
          href: "/framework#features",
        },
        {
          title: "Protocol Architecture",
          href: "/framework#architecture",
        },
        {
          title: "Terminology",
          href: "/framework#terminology",
        }
      ]
    },
    {
      title: "Guides",
      href: "/guides",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>`,
      subItems: [
        {
          title: "How to Deposit",
          href: "/guides#deposit",
        },
        {
          title: "How to Withdraw",
          href: "/guides#withdraw",
        }
      ]
    },
    {
      title: "Security",
      href: "/security",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
      subItems: [
        {
          title: "DeFi Exposure",
          href: "/security#defi-exposure",
        },
        {
          title: "Infrastructure",
          href: "/security#infrastructure",
        },
        {
          title: "Oracle Design",
          href: "/security#oracle-design",
        },
        {
          title: "Audits",
          href: "/security#audit",
        }
      ]
    },
    {
      title: "Vaults",
      href: "/vaults",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 13v8"/>
        <path d="M8 21h8"/>
      </svg>`,
      subItems: [
        {
          title: "DeTrade Core USDC",
          href: "/vaults/detrade-core-usdc",
        }
      ]
    },
    {
      title: "FAQ",
      href: "/faq",
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>`,
      subItems: [
        {
          title: "Deposits & Withdrawals",
          href: "/faq#deposits-withdrawals",
        },
        {
          title: "Performance & Metrics",
          href: "/faq#performance-metrics",
        },
        {
          title: "Oracle",
          href: "/faq#oracle",
        }
      ]
    }
  ];

  // Fonction pour vérifier la largeur d'écran et ajuster la sidebar
  function checkWidth() {
    if (window.innerWidth <= 1024) {
      sidebarOpen.set(false);
    }
  }

  // Fonction pour fermer la sidebar
  function closeSidebar() {
    if (window.innerWidth <= 1024) {
      sidebarOpen.set(false);
    }
  }

  // Modification des gestionnaires de clic
  async function handleMainLinkClick(section) {
    // Ouvrir le menu déroulant d'abord
    switch(section.title) {
      case "Guides":
        guidesOpen = true;
        break;
      case "Framework":
        frameworkOpen = true;
        break;
      case "Vaults":
        vaultsOpen = true;
        break;
      case "Security":
        securityOpen = true;
        break;
      case "FAQ":
        faqOpen = true;
        break;
    }
    // Naviguer vers la page et fermer la sidebar
    await goto(section.href);
    closeSidebar();
  }

  onMount(() => {
    // Vérification initiale
    checkWidth();
    
    // Ajouter un listener pour le redimensionnement
    window.addEventListener('resize', checkWidth);
    
    // Cleanup du listener
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  });
</script>

<nav class="sidebar" class:open={$sidebarOpen}>
  <div class="back-to-app">
    <a 
      href="https://app.detrade.fund" 
      class="nav-link"
      on:click={() => closeSidebar()}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      </svg>
      Back to App
      <svg 
        class="arrow-icon" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M18 6L6 18" />
        <path d="M8 6h10v10" />
      </svg>
    </a>
  </div>

  <div class="sidebar-header"></div>
  
  <nav class="nav-sections">
    {#each sections as section}
      {#if section.subItems}
        <div class="nav-group">
          <div class="nav-link-container" class:active={$page.url.pathname === section.href}>
            <a 
              href={section.href} 
              class="nav-link main-link"
              on:click|preventDefault={() => handleMainLinkClick(section)}
            >
              {@html section.icon}
              {section.title}
            </a>
            <button 
              class="toggle-button"
              on:click|stopPropagation={() => {
                switch(section.title) {
                  case "Guides":
                    toggleGuides();
                    break;
                  case "Framework":
                    toggleFramework();
                    break;
                  case "Vaults":
                    toggleVaults();
                    break;
                  case "Security":
                    toggleSecurity();
                    break;
                  case "FAQ":
                    toggleFaq();
                    break;
                }
              }}
            >
              <svg 
                class="chevron" 
                class:open={
                  section.title === "Guides" ? guidesOpen :
                  section.title === "Framework" ? frameworkOpen :
                  section.title === "Vaults" ? vaultsOpen :
                  section.title === "Security" ? securityOpen :
                  section.title === "FAQ" ? faqOpen : false
                }
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <path d="M18 9l-6 6l-6 -6" />
              </svg>
            </button>
          </div>

          <div class="submenu" 
            class:open={
              section.title === "Guides" ? guidesOpen :
              section.title === "Framework" ? frameworkOpen :
              section.title === "Vaults" ? vaultsOpen :
              section.title === "Security" ? securityOpen :
              section.title === "FAQ" ? faqOpen : false
            }
          >
            {#each section.subItems as subItem}
              <a 
                href={subItem.href} 
                class="nav-link sub-nav-link"
                class:active={$page.url.pathname + $page.url.hash === subItem.href}
                on:click={() => closeSidebar()}
              >
                {subItem.title}
              </a>
            {/each}
          </div>
        </div>
      {:else}
        <a 
          href={section.href} 
          class="nav-link"
          class:active={$page.url.pathname === section.href}
          on:click|preventDefault={async () => {
            await goto(section.href);
            closeSidebar();
          }}
        >
          {@html section.icon}
          {section.title}
        </a>
      {/if}
    {/each}
  </nav>
</nav>

<style>
  .sidebar {
    width: 300px;
    height: calc(100vh - 60px);
    position: fixed;
    left: 0;
    top: 60px;
    background-color: var(--sidebar-background);
    backdrop-filter: blur(10px);
    border-right: 1px solid var(--border-color);
    padding: 1.5rem;
    overflow-y: auto;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    z-index: 90;
    color: var(--sidebar-text);
  }

  .back-to-app {
    margin-bottom: 0.5rem;
  }

  .sidebar-header {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 0.75rem;
  }

  .nav-sections {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    color: var(--sidebar-text);
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    padding: 0.65rem 0.75rem;
    border-radius: 0.375rem;
    transition: all 0.2s;
    gap: 0.75rem;
  }

  .nav-link.active {
    background-color: var(--sidebar-active);
  }

  .nav-link:hover {
    background-color: var(--sidebar-hover);
  }

  .nav-link svg {
    min-width: 18px;
    width: 18px;
    height: 18px;
  }

  .nav-link::after {
    content: none;
  }

  .arrow-icon {
    margin-left: auto;
    transition: transform 0.2s ease;
  }

  .nav-link:hover .arrow-icon {
    transform: translate(1px, -1px);
  }

  @media (max-width: 1024px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    .sidebar.open {
      transform: translateX(0);
    }
  }

  .nav-group {
    display: flex;
    flex-direction: column;
  }

  .nav-link-container {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 0.375rem;
    transition: all 0.2s;
  }

  .nav-link-container:hover {
    background-color: var(--sidebar-hover);
  }

  .nav-link-container.active {
    background-color: var(--sidebar-active);
  }

  .main-link {
    flex: 1;
    padding-right: 0;
    background: none;
  }

  .main-link:hover {
    background: none;
  }

  .toggle-button {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: all 0.2s ease;
  }

  .toggle-button:hover {
    opacity: 1;
  }

  .chevron {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    width: 16px;
    height: 16px;
  }

  .chevron.open {
    transform: rotate(-180deg);
  }

  .nav-link.main-link.active {
    background: none;
  }

  .nav-link.main-link:hover {
    background: none;
  }

  .submenu {
    display: none;
    padding-left: 0.75rem;
    margin-top: 0.2rem;
  }

  .submenu.open {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .sub-nav-link {
    padding-left: 2.5rem;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .sub-nav-link:hover {
    opacity: 1;
  }

  .sub-nav-link.active {
    background-color: var(--sidebar-active);
    color: var(--text-color);
    opacity: 1;
  }

  .submenu-item {
    padding: 0.5rem 1rem 0.5rem 3rem;
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.7;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .submenu-item:hover {
    opacity: 1;
    background: var(--sidebar-hover);
  }

  .submenu-item.active {
    color: var(--text-color);
    opacity: 1;
    background: var(--sidebar-active);
    font-weight: 500;
  }
</style> 