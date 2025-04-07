import{s as A,n as b,o as S}from"../chunks/DipVNbI1.js";import{S as L,i as x,d as h,k as r,a as w,b as k,c as m,n as E,g as M,m as V,h as y,j as C}from"../chunks/6iab5EmN.js";import{g as H}from"../chunks/D0QH3NT1.js";import"../chunks/diUgpNK8.js";const{document:u}=H;function N(e){let o,f=`<div class="title-container svelte-lhgo19"><h1 class="svelte-lhgo19"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-lhgo19"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      Security and Risk</h1> <p class="overview-description svelte-lhgo19">Understanding the Risks: Security, Infrastructure &amp; Valuation Integrity</p></div> <div class="sections-grid svelte-lhgo19"><section id="defi-exposure" class="risk-section svelte-lhgo19"><h2 class="svelte-lhgo19">DeFi Exposure</h2> <p class="svelte-lhgo19">While DeTrade prioritizes capital preservation through careful protocol selection, investing in DeFi protocols comes with inherent risks that users must fully understand.</p> <div class="risk-cards-grid svelte-lhgo19"><div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Smart Contract Risk</h3> <p class="svelte-lhgo19">All vault operations rely on smart contracts, especially those built by Lagoon and other DeFi protocols. Even if contracts have been audited, the risk of bugs, exploits, or vulnerabilities remains. A single flaw can lead to partial or total loss of funds.</p></div> <div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Depeg Risk</h3> <p class="svelte-lhgo19">Many vaults hold assets like stablecoins, staked ETH, or Liquid Staking Tokens (LSTs). These assets are designed to track a reference value (e.g., $1 or ETH), but may lose their peg due to market stress, poor collateral management, or systemic failures. A depeg event can significantly impact vault value, either temporarily or permanently.</p></div></div> <p class="note svelte-lhgo19">💡 DeTrade takes these risks very seriously. Every opportunity is analyzed in depth, and funds are only deployed when the potential returns clearly outweigh the associated risks — and when those risks are sufficiently mitigated by the protocol&#39;s design and security practices. If our assessment reveals unacceptable exposure, we do not invest, regardless of how attractive the returns may seem.</p></section> <div class="divider svelte-lhgo19"></div> <section id="infrastructure" class="risk-section svelte-lhgo19"><h2 class="svelte-lhgo19">Infrastructure</h2> <p class="svelte-lhgo19">DeTrade operates on top of Lagoon infrastructure, leveraging audited smart contracts and additional safety mechanisms to protect users&#39; capital. However, even with robust engineering and multiple security layers, risks remain.</p> <div class="risk-cards-grid svelte-lhgo19"><div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Lagoon Smart Contracts</h3> <p class="svelte-lhgo19">All vault logic — including deposits, withdrawals, and yield strategies — runs on Lagoon contracts audited by Nethermind, a reputable firm in the Ethereum ecosystem. While audits drastically reduce risk, they do not eliminate the possibility of vulnerabilities or edge-case failures.</p></div> <div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Multisig Governance</h3> <p class="svelte-lhgo19">Vault management is secured by a multisignature wallet (multisig), ensuring no single party can control or move funds unilaterally. This setup greatly enhances security but still carries a non-zero risk as the multisig itself is a smart contract potentially subject to bugs or mismanagement.</p></div> <div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Cooldown Mechanisms</h3> <p class="svelte-lhgo19">Deposits and withdrawals are subject to cooldown periods to prevent abuse or timing-based attacks. These mechanisms improve security and protocol stability, though they introduce a short delay in liquidity access and are not a universal safeguard against all threat vectors.</p></div></div> <p class="note svelte-lhgo19">💡 Our infrastructure has been thoroughly audited by Nethermind, with multiple security reviews available in the Audits section below, covering both core protocol mechanisms and specific implementations.</p></section> <div class="divider svelte-lhgo19"></div> <section id="oracle-design" class="risk-section svelte-lhgo19"><h2 class="svelte-lhgo19">Oracle Design</h2> <p class="svelte-lhgo19">Unlike many DeFi systems that rely on automated price feeds, DeTrade has adopted a manual oracle system for computing and updating the Net Asset Value (NAV) of each vault — a key choice for security.</p> <div class="risk-cards-grid svelte-lhgo19"><div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Off-Chain Valuation</h3> <p class="svelte-lhgo19">Vault values are calculated off-chain by the DeTrade team using real yield data from the underlying strategies. This valuation is not driven by on-chain oracles, which are often vulnerable to manipulation.</p></div> <div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Human Verification</h3> <p class="svelte-lhgo19">Every NAV update and subsequent minting or burning of shares undergoes manual validation before being submitted on-chain. This ensures no automated process can be exploited to manipulate the share price or create arbitrage opportunities.</p></div> <div class="risk-card svelte-lhgo19"><h3 class="svelte-lhgo19">Exploit Mitigation</h3> <p class="svelte-lhgo19">By removing real-time on-chain price feeds from the critical path, DeTrade eliminates common oracle manipulation vectors (e.g., flash loan-based price distortion), making it far more difficult for attackers to game the system during deposits or withdrawals.</p></div></div> <p class="note svelte-lhgo19">💡 This manual, human-in-the-loop system strengthens DeTrade&#39;s resistance to one of DeFi&#39;s most common attack surfaces — price oracle exploits — while maintaining transparency and operational control.</p></section> <div class="divider svelte-lhgo19"></div> <section id="audit" class="risk-section svelte-lhgo19"><h2 class="svelte-lhgo19">Audits</h2> <p class="svelte-lhgo19">DeTrade&#39;s security is built on Lagoon&#39;s thoroughly audited infrastructure. These comprehensive audits, conducted by Nethermind, one of the most respected security firms in the Ethereum ecosystem, validate both Lagoon&#39;s core infrastructure and the specific implementations used by DeTrade.</p> <div class="risk-cards-grid svelte-lhgo19"><div class="risk-card audit-card svelte-lhgo19"><img src="/nethermind_security.avif" alt="Nethermind Security" class="audit-image svelte-lhgo19"/> <h3 class="svelte-lhgo19">Scope - Beta release (v0.2.0)</h3> <p class="svelte-lhgo19">30-01-2025</p> <a href="/NM_0432_Lagoon.pdf" target="_blank" class="audit-link svelte-lhgo19"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-lhgo19"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            View Audit Report</a></div> <div class="risk-card audit-card svelte-lhgo19"><img src="/nethermind_security.avif" alt="Nethermind Security" class="audit-image svelte-lhgo19"/> <h3 class="svelte-lhgo19">Scope - Beta release (v0.1.0)</h3> <p class="svelte-lhgo19">07-11-2024</p> <a href="/NM_0304_HopperLabs.pdf" target="_blank" class="audit-link svelte-lhgo19"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-lhgo19"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            View Audit Report</a></div> <div class="risk-card audit-card svelte-lhgo19"><img src="/lagoon-review.avif" alt="Lagoon Security Review" class="audit-image svelte-lhgo19"/> <h3 class="svelte-lhgo19">Scope Beta release (v0.1.0)</h3> <p class="svelte-lhgo19">27-09-2024</p> <a href="/lagoon-review.pdf" target="_blank" class="audit-link svelte-lhgo19"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-lhgo19"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            View Audit Report</a></div></div> <p class="note svelte-lhgo19">💡 While these audits significantly strengthen our security posture, we maintain ongoing vigilance and continuous security monitoring as part of our commitment to protecting user funds.</p></section></div>`,n,v,s,t,p,c,l,g,d;return u.title=v=e[0]?`${e[0].split("-").map(T).join(" ")} – DeTrade`:"Security – DeTrade",{c(){o=y("div"),o.innerHTML=f,n=C(),s=y("meta"),t=y("meta"),c=y("meta"),l=y("meta"),d=y("meta"),this.h()},l(a){o=m(a,"DIV",{class:!0,"data-svelte-h":!0}),E(o)!=="svelte-19vnuhk"&&(o.innerHTML=f),n=M(a);const i=V("svelte-11b1hg",u.head);s=m(i,"META",{name:!0,content:!0}),t=m(i,"META",{property:!0,content:!0}),c=m(i,"META",{property:!0,content:!0}),l=m(i,"META",{name:!0,content:!0}),d=m(i,"META",{name:!0,content:!0}),i.forEach(h),this.h()},h(){r(o,"class","content svelte-lhgo19"),r(s,"name","description"),r(s,"content","Learn about DeTrade's security measures, audits, and risk management practices."),r(t,"property","og:title"),r(t,"content",p=e[0]?`${e[0].split("-").map(D).join(" ")} – DeTrade`:"Security – DeTrade"),r(c,"property","og:description"),r(c,"content","Learn about DeTrade's security measures, audits, and risk management practices."),r(l,"name","twitter:title"),r(l,"content",g=e[0]?`${e[0].split("-").map(_).join(" ")} – DeTrade`:"Security – DeTrade"),r(d,"name","twitter:description"),r(d,"content","Learn about DeTrade's security measures, audits, and risk management practices.")},m(a,i){w(a,o,i),w(a,n,i),k(u.head,s),k(u.head,t),k(u.head,c),k(u.head,l),k(u.head,d)},p(a,[i]){i&1&&v!==(v=a[0]?`${a[0].split("-").map(T).join(" ")} – DeTrade`:"Security – DeTrade")&&(u.title=v),i&1&&p!==(p=a[0]?`${a[0].split("-").map(D).join(" ")} – DeTrade`:"Security – DeTrade")&&r(t,"content",p),i&1&&g!==(g=a[0]?`${a[0].split("-").map(_).join(" ")} – DeTrade`:"Security – DeTrade")&&r(l,"content",g)},i:b,o:b,d(a){a&&(h(o),h(n)),h(s),h(t),h(c),h(l),h(d)}}}const T=e=>e.charAt(0).toUpperCase()+e.slice(1),D=e=>e.charAt(0).toUpperCase()+e.slice(1),_=e=>e.charAt(0).toUpperCase()+e.slice(1);function j(e,o,f){let n="";S(()=>(f(0,n=window.location.hash.slice(1)),window.addEventListener("hashchange",()=>{f(0,n=window.location.hash.slice(1)),v()}),()=>{window.removeEventListener("hashchange",()=>{})}));function v(){let s="Security – DeTrade",t="Learn about DeTrade's security measures, audits, and risk management practices.";switch(n){case"defi-exposure":s="DeFi Exposure – DeTrade",t="Understand DeTrade's approach to DeFi exposure and risk management in vault operations.";break;case"infrastructure":s="Infrastructure – DeTrade",t="Explore DeTrade's secure infrastructure built on Lagoon and protected by multiple security layers.";break;case"oracle-design":s="Oracle Design – DeTrade",t="Learn about DeTrade's oracle system design and how it ensures accurate value computation.";break;case"audit":s="Audits – DeTrade",t="Review DeTrade's security audits conducted by Nethermind and other leading firms.";break}document.title=s;const p=document.querySelector('meta[name="description"]'),c=document.querySelector('meta[property="og:title"]'),l=document.querySelector('meta[property="og:description"]'),g=document.querySelector('meta[name="twitter:title"]'),d=document.querySelector('meta[name="twitter:description"]');p&&p.setAttribute("content",t),c&&c.setAttribute("content",s),l&&l.setAttribute("content",t),g&&g.setAttribute("content",s),d&&d.setAttribute("content",t)}return[n]}class z extends L{constructor(o){super(),x(this,o,j,N,A,{})}}export{z as component};
