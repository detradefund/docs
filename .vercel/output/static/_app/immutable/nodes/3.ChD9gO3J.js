import{s as Bt,r as Ut,o as Wt,e as le}from"../chunks/DipVNbI1.js";import{S as zt,i as Ot,d as h,o as g,p as v,k as n,B as _,r as se,b as l,a as z,l as ae,m as Rt,c as i,g as q,e as E,n as w,h as o,j as m,C as T,q as re}from"../chunks/6iab5EmN.js";import{g as Qt}from"../chunks/D0QH3NT1.js";import"../chunks/C1OJwcYb.js";function xt(r){const t=r-1;return t*t*t+1}function b(r,{delay:t=0,duration:d=400,easing:s=xt,axis:a="y"}={}){const e=getComputedStyle(r),f=+e.opacity,qe=a==="y"?"height":"width",ne=parseFloat(e[qe]),N=a==="y"?["top","bottom"]:["left","right"],P=N.map(p=>`${p[0].toUpperCase()}${p.slice(1)}`),O=parseFloat(e[`padding${P[0]}`]),De=parseFloat(e[`padding${P[1]}`]),Te=parseFloat(e[`margin${P[0]}`]),F=parseFloat(e[`margin${P[1]}`]),$=parseFloat(e[`border${P[0]}Width`]),R=parseFloat(e[`border${P[1]}Width`]);return{delay:t,duration:d,easing:s,css:p=>`overflow: hidden;opacity: ${Math.min(p*20,1)*f};${qe}: ${p*ne}px;padding-${N[0]}: ${p*O}px;padding-${N[1]}: ${p*De}px;margin-${N[0]}: ${p*Te}px;margin-${N[1]}: ${p*F}px;border-${N[0]}-width: ${p*$}px;border-${N[1]}-width: ${p*R}px;`}}const{document:we}=Qt;function Mt(r){let t,d='<p class="svelte-2qqjnr">When you deposit funds, DeTrade needs a short delay (max 24h but usually less) to effectively manage and allocate your assets to the best opportunities across DeFi. This cooldown allows to:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">Enhance security by manually processing all incoming funds</li> <li class="svelte-2qqjnr">Determine where new funds are going into the current strategy</li> <li class="svelte-2qqjnr">Calculate the Net Asset Value (NAV) to set the new price per share</li> <li class="svelte-2qqjnr">Proceed to the settlement to process deposits at the new share price and NAV</li></ul>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-gn1k79"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function Ct(r){let t,d='<p class="svelte-2qqjnr">When you request a withdrawal, DeTrade need a brief delay (max 24h but usually less) to unwind positions and match withdrawal requests. This cooldown is necessary to:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">Ensure security by manually processing all outgoing funds, allowing us to monitor and prevent any suspicious activity.</li> <li class="svelte-2qqjnr">Exit positions strategically to maximize returns.</li> <li class="svelte-2qqjnr">Calculate the Net Asset Value (NAV) thanks to DeTrade Oracle to set the new price per share.</li> <li class="svelte-2qqjnr">Proceed to the settlement to process withdrawals at the new share price and NAV.</li></ul>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-17qpo8n"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function At(r){let t,d=`<p class="svelte-2qqjnr">Drawdowns in the vault are typically temporary and very limited in %. They can occur for a couple of reasons:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr"><strong>Price Variations</strong><br/>
                Assets with maturity yields (PT tokens from Pendle/Spectra) may experience price fluctuations before maturity. However, these variations are temporary since we secure a fixed yield that will be realized over maturity. We avoid selling these assets before maturity unless necessary due to significant withdrawals.</li> <li class="svelte-2qqjnr"><strong>Assets Depeg</strong><br/>
                DeTrade invest in many pegged assets (stablecoins, staked tokens, LSTs, LRTs…) that may temporarily lose their peg, causing a short-term drawdown.</li></ul> <div class="note svelte-2qqjnr">💡 DeTrade recommends maintaining a medium to long-term investment horizon to benefit fully from these strategies and minimize the impact of temporary drawdowns.</div>`,s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-4xqgsa"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function Ht(r){let t,d='<p class="svelte-2qqjnr">The Net Asset Value (NAV) represents the total value of assets in the vault minus any debts. It is used to determine the price per share for users depositing or withdrawing from the vault. Essentially, NAV helps calculate the value of your investment within the vault.</p>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-ww43bg"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function Lt(r){let t,d='<p class="svelte-2qqjnr">The Projected APR represents the net return currently being generated by the strategy on the underlying (ex USDC for DeTrade Core USDC). This yield is determined by the allocation of funds across various DeFi protocols and may fluctuate based on market conditions and strategy adjustments.</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">The Projected APR reflects the actual rate at which your capital earns returns after performance fees have been applied.</li> <li class="svelte-2qqjnr">The Projected APR may not always be fully reflected during valuation and settlement events, as some returns are only realized once rewards are paid out and fixed-rate yield derivatives mature.</li></ul>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-1uvc8a4"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function Vt(r){let t,d='<p class="svelte-2qqjnr">The 30D Realized APR represents the average net return generated by the strategy on the underlying (ex USDC for DeTrade Core USDC) over the past 30 days. This metric provides a more stable view of the vault&#39;s performance by smoothing out short-term fluctuations.</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">The 30D Realized APR is calculated based on the evolution of the share price, which is derived from the Net Asset Value (NAV) of the vault.</li> <li class="svelte-2qqjnr">As a result, it may differ from the vault&#39;s Projected APR.</li> <li class="svelte-2qqjnr">The calculation reflects actual realized returns after performance fees have been applied.</li></ul> <p class="note svelte-2qqjnr">💡 The 30D Realized APR may not reflect underlying returns due to factors such as reward distribution schedules or the maturity of fixed-rate yield derivatives.</p>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-1fvm61x"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function Pt(r){let t,d='<p class="svelte-2qqjnr">The price per share is the value of one share in the vault, calculated by dividing the Net Asset Value (NAV) by the total number of outstanding shares. It represents the value of your investment on a per-share basis. (for instance, in DeTrade Core USDC vault, a share is 1 DTUSDC)</p>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-c7kevh"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function It(r){let t,d='<p class="svelte-2qqjnr">The oracle retrieves on-chain information about token balances, including both spot balances in the wallet and receipt tokens representing positions. Depending on the position type, pricing varies:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">For yield-bearing tokens, we directly fetch their value in the underlying token before converting it to the vault&#39;s underlying token.</li> <li class="svelte-2qqjnr">For more complex cases, we rely on specific APIs (e.g., Pendle&#39;s API).</li> <li class="svelte-2qqjnr">To calculate asset values while accounting for slippage, we simulate sell transactions via CowSwap and use their API to price assets.</li></ul>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-g2jxoa"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function Et(r){let t,d='<p class="svelte-2qqjnr">Yes, the oracle is accurate as it relies on on-chain data, but errors may occur if a centralized API (e.g., Pendle or CowSwap) is undergoing maintenance.</p> <div class="note svelte-2qqjnr">💡 This doesn&#39;t pose significant issues, as final settlement values pushed to the blockchain are computed manually and undergo human verification to ensure consistency.</div>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-15ghao4"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function $t(r){let t,d='<p class="svelte-2qqjnr">We provide a dedicated page at <a href="https://oracle.detrade.fund" target="_blank" rel="noopener noreferrer">oracle.detrade.fund</a> that displays real-time oracle data, including:</p> <ul class="svelte-2qqjnr"><li class="svelte-2qqjnr">Calculated values and the methods used</li> <li class="svelte-2qqjnr">Total value and position breakdowns</li> <li class="svelte-2qqjnr">Conversion rates and data sources</li></ul> <div class="note svelte-2qqjnr">💡 In the future, the code will be made open-source on GitHub, enabling full visibility and verification of our approach.</div>',s,a;return{c(){t=o("div"),t.innerHTML=d,this.h()},l(e){t=i(e,"DIV",{class:!0,"data-svelte-h":!0}),w(t)!=="svelte-1tmttcs"&&(t.innerHTML=d),this.h()},h(){n(t,"class","toggle-content svelte-2qqjnr")},m(e,f){z(e,t,f),a=!0},i(e){a||(e&&le(()=>{a&&(s||(s=T(t,b,{},!0)),s.run(1))}),a=!0)},o(e){e&&(s||(s=T(t,b,{},!1)),s.run(0)),a=!1},d(e){e&&h(t),e&&s&&s.end()}}}function Gt(r){let t,d,s,a,e,f,qe,ne,N,P,O,De=`<h1 class="svelte-2qqjnr"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-2qqjnr"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      Frequently Asked Questions</h1> <p class="overview-description svelte-2qqjnr">Find answers to common questions about DeTrade&#39;s protocol, vaults, and services</p>`,Te,F,$,R,p="Deposits & Withdrawals",Q,U,S,Me='<span>Why is there a cooldown when depositing?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',be,je=r[0].has("cooldown-deposit"),Se,ie,x,pt='<span>Why is there a cooldown when withdrawing?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',Be,Ue=r[0].has("cooldown-withdrawal"),We,I,ge,qt="Performance & Metrics",ze,oe,G,mt='<span>Why vaults can experience drawdowns over time?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',Oe,Re=r[0].has("drawdowns"),Qe,ce,Y,wt='<span>What is the Net Asset Value (NAV)?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',xe,Ge=r[0].has("nav"),Ye,de,J,gt='<span>What is the Projected APR?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',Je,Ke=r[0].has("projected-apr"),Xe,ue,K,_t='<span>What is the 30d Realized APR?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',Ze,et=r[0].has("realized-apr"),tt,he,X,Tt='<span>What is the price per share?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',st,at=r[0].has("price-per-share"),rt,B,_e,bt="Oracle",lt,fe,Z,jt='<span>How does the oracle work?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',nt,it=r[0].has("oracle-work"),ot,ve,ee,kt='<span>Is the oracle accurate, and can errors occur?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',ct,dt=r[0].has("oracle-accuracy"),ut,pe,te,yt='<span>How can data be tracked, and what about transparency?</span> <svg class="arrow svelte-2qqjnr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"></path></svg>',ht,ft=r[0].has("oracle-tracking"),vt,Dt;we.title=t=r[1]==="deposits-withdrawals"?"Deposits & Withdrawals – DeTrade":r[1]==="performance-metrics"?"Performance & Metrics – DeTrade":r[1]?`${r[1].split("-").map(Nt).join(" ")} – DeTrade`:"FAQ – DeTrade";let j=je&&Mt(),k=Ue&&Ct(),y=Re&&At(),D=Ge&&Ht(),M=Ke&&Lt(),C=et&&Vt(),A=at&&Pt(),H=it&&It(),L=dt&&Et(),V=ft&&$t();return{c(){d=o("meta"),s=o("meta"),e=o("meta"),f=o("meta"),ne=o("meta"),N=m(),P=o("div"),O=o("div"),O.innerHTML=De,Te=m(),F=o("div"),$=o("section"),R=o("h2"),R.textContent=p,Q=m(),U=o("div"),S=o("button"),S.innerHTML=Me,be=m(),j&&j.c(),Se=m(),ie=o("div"),x=o("button"),x.innerHTML=pt,Be=m(),k&&k.c(),We=m(),I=o("section"),ge=o("h2"),ge.textContent=qt,ze=m(),oe=o("div"),G=o("button"),G.innerHTML=mt,Oe=m(),y&&y.c(),Qe=m(),ce=o("div"),Y=o("button"),Y.innerHTML=wt,xe=m(),D&&D.c(),Ye=m(),de=o("div"),J=o("button"),J.innerHTML=gt,Je=m(),M&&M.c(),Xe=m(),ue=o("div"),K=o("button"),K.innerHTML=_t,Ze=m(),C&&C.c(),tt=m(),he=o("div"),X=o("button"),X.innerHTML=Tt,st=m(),A&&A.c(),rt=m(),B=o("section"),_e=o("h2"),_e.textContent=bt,lt=m(),fe=o("div"),Z=o("button"),Z.innerHTML=jt,nt=m(),H&&H.c(),ot=m(),ve=o("div"),ee=o("button"),ee.innerHTML=kt,ct=m(),L&&L.c(),ut=m(),pe=o("div"),te=o("button"),te.innerHTML=yt,ht=m(),V&&V.c(),this.h()},l(u){const c=Rt("svelte-1od12hx",we.head);d=i(c,"META",{name:!0,content:!0}),s=i(c,"META",{property:!0,content:!0}),e=i(c,"META",{property:!0,content:!0}),f=i(c,"META",{name:!0,content:!0}),ne=i(c,"META",{name:!0,content:!0}),c.forEach(h),N=q(u),P=i(u,"DIV",{class:!0});var Ce=E(P);O=i(Ce,"DIV",{class:!0,"data-svelte-h":!0}),w(O)!=="svelte-17i9g3w"&&(O.innerHTML=De),Te=q(Ce),F=i(Ce,"DIV",{class:!0});var ke=E(F);$=i(ke,"SECTION",{class:!0,id:!0});var ye=E($);R=i(ye,"H2",{class:!0,"data-svelte-h":!0}),w(R)!=="svelte-1aah55b"&&(R.textContent=p),Q=q(ye),U=i(ye,"DIV",{class:!0});var Ae=E(U);S=i(Ae,"BUTTON",{class:!0,"data-svelte-h":!0}),w(S)!=="svelte-1f8o36u"&&(S.innerHTML=Me),be=q(Ae),j&&j.l(Ae),Ae.forEach(h),Se=q(ye),ie=i(ye,"DIV",{class:!0});var He=E(ie);x=i(He,"BUTTON",{class:!0,"data-svelte-h":!0}),w(x)!=="svelte-1ceezsy"&&(x.innerHTML=pt),Be=q(He),k&&k.l(He),He.forEach(h),ye.forEach(h),We=q(ke),I=i(ke,"SECTION",{class:!0,id:!0});var W=E(I);ge=i(W,"H2",{class:!0,"data-svelte-h":!0}),w(ge)!=="svelte-ocydrp"&&(ge.textContent=qt),ze=q(W),oe=i(W,"DIV",{class:!0});var Le=E(oe);G=i(Le,"BUTTON",{class:!0,"data-svelte-h":!0}),w(G)!=="svelte-j2cgcj"&&(G.innerHTML=mt),Oe=q(Le),y&&y.l(Le),Le.forEach(h),Qe=q(W),ce=i(W,"DIV",{class:!0});var Ve=E(ce);Y=i(Ve,"BUTTON",{class:!0,"data-svelte-h":!0}),w(Y)!=="svelte-y4zrov"&&(Y.innerHTML=wt),xe=q(Ve),D&&D.l(Ve),Ve.forEach(h),Ye=q(W),de=i(W,"DIV",{class:!0});var Pe=E(de);J=i(Pe,"BUTTON",{class:!0,"data-svelte-h":!0}),w(J)!=="svelte-cmpupc"&&(J.innerHTML=gt),Je=q(Pe),M&&M.l(Pe),Pe.forEach(h),Xe=q(W),ue=i(W,"DIV",{class:!0});var Ie=E(ue);K=i(Ie,"BUTTON",{class:!0,"data-svelte-h":!0}),w(K)!=="svelte-3ae3ft"&&(K.innerHTML=_t),Ze=q(Ie),C&&C.l(Ie),Ie.forEach(h),tt=q(W),he=i(W,"DIV",{class:!0});var Ee=E(he);X=i(Ee,"BUTTON",{class:!0,"data-svelte-h":!0}),w(X)!=="svelte-11kv3w8"&&(X.innerHTML=Tt),st=q(Ee),A&&A.l(Ee),Ee.forEach(h),W.forEach(h),rt=q(ke),B=i(ke,"SECTION",{class:!0,id:!0});var me=E(B);_e=i(me,"H2",{class:!0,"data-svelte-h":!0}),w(_e)!=="svelte-1fkzhd4"&&(_e.textContent=bt),lt=q(me),fe=i(me,"DIV",{class:!0});var $e=E(fe);Z=i($e,"BUTTON",{class:!0,"data-svelte-h":!0}),w(Z)!=="svelte-1p0e6fh"&&(Z.innerHTML=jt),nt=q($e),H&&H.l($e),$e.forEach(h),ot=q(me),ve=i(me,"DIV",{class:!0});var Ne=E(ve);ee=i(Ne,"BUTTON",{class:!0,"data-svelte-h":!0}),w(ee)!=="svelte-b1rqjb"&&(ee.innerHTML=kt),ct=q(Ne),L&&L.l(Ne),Ne.forEach(h),ut=q(me),pe=i(me,"DIV",{class:!0});var Fe=E(pe);te=i(Fe,"BUTTON",{class:!0,"data-svelte-h":!0}),w(te)!=="svelte-12y2gm9"&&(te.innerHTML=yt),ht=q(Fe),V&&V.l(Fe),Fe.forEach(h),me.forEach(h),ke.forEach(h),Ce.forEach(h),this.h()},h(){n(d,"name","description"),n(d,"content","Find answers to frequently asked questions about DeTrade's protocol, vaults, and services."),n(s,"property","og:title"),n(s,"content",a=r[1]==="deposits-withdrawals"?"Deposits & Withdrawals – DeTrade":r[1]==="performance-metrics"?"Performance & Metrics – DeTrade":r[1]?`${r[1].split("-").map(Ft).join(" ")} – DeTrade`:"FAQ – DeTrade"),n(e,"property","og:description"),n(e,"content","Find answers to frequently asked questions about DeTrade's protocol, vaults, and services."),n(f,"name","twitter:title"),n(f,"content",qe=r[1]==="deposits-withdrawals"?"Deposits & Withdrawals – DeTrade":r[1]==="performance-metrics"?"Performance & Metrics – DeTrade":r[1]?`${r[1].split("-").map(St).join(" ")} – DeTrade`:"FAQ – DeTrade"),n(ne,"name","twitter:description"),n(ne,"content","Find answers to frequently asked questions about DeTrade's protocol, vaults, and services."),n(O,"class","title-container svelte-2qqjnr"),n(R,"class","svelte-2qqjnr"),n(S,"class","toggle-button svelte-2qqjnr"),_(S,"active",r[0].has("cooldown-deposit")),n(U,"class","faq-toggle svelte-2qqjnr"),n(x,"class","toggle-button svelte-2qqjnr"),_(x,"active",r[0].has("cooldown-withdrawal")),n(ie,"class","faq-toggle svelte-2qqjnr"),n($,"class","faq-section svelte-2qqjnr"),n($,"id","deposits-withdrawals"),n(ge,"class","svelte-2qqjnr"),n(G,"class","toggle-button svelte-2qqjnr"),_(G,"active",r[0].has("drawdowns")),n(oe,"class","faq-toggle svelte-2qqjnr"),n(Y,"class","toggle-button svelte-2qqjnr"),_(Y,"active",r[0].has("nav")),n(ce,"class","faq-toggle svelte-2qqjnr"),n(J,"class","toggle-button svelte-2qqjnr"),_(J,"active",r[0].has("projected-apr")),n(de,"class","faq-toggle svelte-2qqjnr"),n(K,"class","toggle-button svelte-2qqjnr"),_(K,"active",r[0].has("realized-apr")),n(ue,"class","faq-toggle svelte-2qqjnr"),n(X,"class","toggle-button svelte-2qqjnr"),_(X,"active",r[0].has("price-per-share")),n(he,"class","faq-toggle svelte-2qqjnr"),n(I,"class","faq-section svelte-2qqjnr"),n(I,"id","performance-metrics"),n(_e,"class","svelte-2qqjnr"),n(Z,"class","toggle-button svelte-2qqjnr"),_(Z,"active",r[0].has("oracle-work")),n(fe,"class","faq-toggle svelte-2qqjnr"),n(ee,"class","toggle-button svelte-2qqjnr"),_(ee,"active",r[0].has("oracle-accuracy")),n(ve,"class","faq-toggle svelte-2qqjnr"),n(te,"class","toggle-button svelte-2qqjnr"),_(te,"active",r[0].has("oracle-tracking")),n(pe,"class","faq-toggle svelte-2qqjnr"),n(B,"class","faq-section svelte-2qqjnr"),n(B,"id","oracle"),n(F,"class","faq-sections"),n(P,"class","content svelte-2qqjnr")},m(u,c){l(we.head,d),l(we.head,s),l(we.head,e),l(we.head,f),l(we.head,ne),z(u,N,c),z(u,P,c),l(P,O),l(P,Te),l(P,F),l(F,$),l($,R),l($,Q),l($,U),l(U,S),l(U,be),j&&j.m(U,null),l($,Se),l($,ie),l(ie,x),l(ie,Be),k&&k.m(ie,null),l(F,We),l(F,I),l(I,ge),l(I,ze),l(I,oe),l(oe,G),l(oe,Oe),y&&y.m(oe,null),l(I,Qe),l(I,ce),l(ce,Y),l(ce,xe),D&&D.m(ce,null),l(I,Ye),l(I,de),l(de,J),l(de,Je),M&&M.m(de,null),l(I,Xe),l(I,ue),l(ue,K),l(ue,Ze),C&&C.m(ue,null),l(I,tt),l(I,he),l(he,X),l(he,st),A&&A.m(he,null),l(F,rt),l(F,B),l(B,_e),l(B,lt),l(B,fe),l(fe,Z),l(fe,nt),H&&H.m(fe,null),l(B,ot),l(B,ve),l(ve,ee),l(ve,ct),L&&L.m(ve,null),l(B,ut),l(B,pe),l(pe,te),l(pe,ht),V&&V.m(pe,null),vt||(Dt=[ae(S,"click",r[3]),ae(x,"click",r[4]),ae(G,"click",r[5]),ae(Y,"click",r[6]),ae(J,"click",r[7]),ae(K,"click",r[8]),ae(X,"click",r[9]),ae(Z,"click",r[10]),ae(ee,"click",r[11]),ae(te,"click",r[12])],vt=!0)},p(u,[c]){c&2&&t!==(t=u[1]==="deposits-withdrawals"?"Deposits & Withdrawals – DeTrade":u[1]==="performance-metrics"?"Performance & Metrics – DeTrade":u[1]?`${u[1].split("-").map(Nt).join(" ")} – DeTrade`:"FAQ – DeTrade")&&(we.title=t),c&2&&a!==(a=u[1]==="deposits-withdrawals"?"Deposits & Withdrawals – DeTrade":u[1]==="performance-metrics"?"Performance & Metrics – DeTrade":u[1]?`${u[1].split("-").map(Ft).join(" ")} – DeTrade`:"FAQ – DeTrade")&&n(s,"content",a),c&2&&qe!==(qe=u[1]==="deposits-withdrawals"?"Deposits & Withdrawals – DeTrade":u[1]==="performance-metrics"?"Performance & Metrics – DeTrade":u[1]?`${u[1].split("-").map(St).join(" ")} – DeTrade`:"FAQ – DeTrade")&&n(f,"content",qe),c&1&&_(S,"active",u[0].has("cooldown-deposit")),c&1&&(je=u[0].has("cooldown-deposit")),je?j?c&1&&v(j,1):(j=Mt(),j.c(),v(j,1),j.m(U,null)):j&&(re(),g(j,1,1,()=>{j=null}),se()),c&1&&_(x,"active",u[0].has("cooldown-withdrawal")),c&1&&(Ue=u[0].has("cooldown-withdrawal")),Ue?k?c&1&&v(k,1):(k=Ct(),k.c(),v(k,1),k.m(ie,null)):k&&(re(),g(k,1,1,()=>{k=null}),se()),c&1&&_(G,"active",u[0].has("drawdowns")),c&1&&(Re=u[0].has("drawdowns")),Re?y?c&1&&v(y,1):(y=At(),y.c(),v(y,1),y.m(oe,null)):y&&(re(),g(y,1,1,()=>{y=null}),se()),c&1&&_(Y,"active",u[0].has("nav")),c&1&&(Ge=u[0].has("nav")),Ge?D?c&1&&v(D,1):(D=Ht(),D.c(),v(D,1),D.m(ce,null)):D&&(re(),g(D,1,1,()=>{D=null}),se()),c&1&&_(J,"active",u[0].has("projected-apr")),c&1&&(Ke=u[0].has("projected-apr")),Ke?M?c&1&&v(M,1):(M=Lt(),M.c(),v(M,1),M.m(de,null)):M&&(re(),g(M,1,1,()=>{M=null}),se()),c&1&&_(K,"active",u[0].has("realized-apr")),c&1&&(et=u[0].has("realized-apr")),et?C?c&1&&v(C,1):(C=Vt(),C.c(),v(C,1),C.m(ue,null)):C&&(re(),g(C,1,1,()=>{C=null}),se()),c&1&&_(X,"active",u[0].has("price-per-share")),c&1&&(at=u[0].has("price-per-share")),at?A?c&1&&v(A,1):(A=Pt(),A.c(),v(A,1),A.m(he,null)):A&&(re(),g(A,1,1,()=>{A=null}),se()),c&1&&_(Z,"active",u[0].has("oracle-work")),c&1&&(it=u[0].has("oracle-work")),it?H?c&1&&v(H,1):(H=It(),H.c(),v(H,1),H.m(fe,null)):H&&(re(),g(H,1,1,()=>{H=null}),se()),c&1&&_(ee,"active",u[0].has("oracle-accuracy")),c&1&&(dt=u[0].has("oracle-accuracy")),dt?L?c&1&&v(L,1):(L=Et(),L.c(),v(L,1),L.m(ve,null)):L&&(re(),g(L,1,1,()=>{L=null}),se()),c&1&&_(te,"active",u[0].has("oracle-tracking")),c&1&&(ft=u[0].has("oracle-tracking")),ft?V?c&1&&v(V,1):(V=$t(),V.c(),v(V,1),V.m(pe,null)):V&&(re(),g(V,1,1,()=>{V=null}),se())},i(u){v(j),v(k),v(y),v(D),v(M),v(C),v(A),v(H),v(L),v(V)},o(u){g(j),g(k),g(y),g(D),g(M),g(C),g(A),g(H),g(L),g(V)},d(u){u&&(h(N),h(P)),h(d),h(s),h(e),h(f),h(ne),j&&j.d(),k&&k.d(),y&&y.d(),D&&D.d(),M&&M.d(),C&&C.d(),A&&A.d(),H&&H.d(),L&&L.d(),V&&V.d(),vt=!1,Ut(Dt)}}}const Nt=r=>r.charAt(0).toUpperCase()+r.slice(1),Ft=r=>r.charAt(0).toUpperCase()+r.slice(1),St=r=>r.charAt(0).toUpperCase()+r.slice(1);function Yt(r,t,d){let s=new Set,a="";Wt(()=>(d(1,a=window.location.hash.slice(1)),window.addEventListener("hashchange",()=>{d(1,a=window.location.hash.slice(1)),f()}),()=>{window.removeEventListener("hashchange",()=>{})}));function e(p){s.has(p)?s.delete(p):s.add(p),d(0,s)}function f(){let p="FAQ – DeTrade",Q="Find answers to frequently asked questions about DeTrade's protocol, vaults, and services.";switch(a){case"deposits-withdrawals":p="Deposits & Withdrawals – DeTrade",Q="Learn about DeTrade's deposit and withdrawal processes, cooldown periods, and settlement.";break;case"performance-metrics":p="Performance & Metrics – DeTrade",Q="Understand DeTrade's performance metrics, APR calculations, and vault valuations.";break;case"oracle":p="Oracle – DeTrade",Q="Learn about DeTrade's oracle system, price feeds, and valuation mechanisms.";break}document.title=p;const U=document.querySelector('meta[name="description"]'),S=document.querySelector('meta[property="og:title"]'),Me=document.querySelector('meta[property="og:description"]'),be=document.querySelector('meta[name="twitter:title"]'),je=document.querySelector('meta[name="twitter:description"]');U&&U.setAttribute("content",Q),S&&S.setAttribute("content",p),Me&&Me.setAttribute("content",Q),be&&be.setAttribute("content",p),je&&je.setAttribute("content",Q)}return[s,a,e,()=>e("cooldown-deposit"),()=>e("cooldown-withdrawal"),()=>e("drawdowns"),()=>e("nav"),()=>e("projected-apr"),()=>e("realized-apr"),()=>e("price-per-share"),()=>e("oracle-work"),()=>e("oracle-accuracy"),()=>e("oracle-tracking")]}class es extends zt{constructor(t){super(),Ot(this,t,Yt,Gt,Bt,{})}}export{es as component};
