import{s as J,n as W,c as U,o as Y,r as ke,a as se,v as we,w as be,x as ye,y as Ee}from"../chunks/DipVNbI1.js";import{S as K,i as R,d as _,D as fe,B as V,a as C,b as d,l as S,k as o,c as E,e as I,n as Z,g as $,h as A,j as T,u as ne,E as ve,F as Ae,G as me,f as x,H as ae,I as ge,t as ee,J as ie,w as z,o as L,p as O,y as G,z as N,x as Q,m as je}from"../chunks/gL8agGWl.js";import{w as Ie,g as oe}from"../chunks/CSVw10yg.js";import{p as pe}from"../chunks/DEKXeUHg.js";function P(e){return e?.length!==void 0?e:Array.from(e)}const q=Ie(!0);function ue(e,t,r){const s=e.slice();return s[21]=t[r],s}function ce(e,t,r){const s=e.slice();return s[24]=t[r],s}function De(e){let t,r,s=e[21].icon+"",c,u=e[21].title+"",l,a,h,b;function k(){return e[19](e[21])}return{c(){t=A("a"),r=new ge(!1),c=T(),l=ee(u),a=T(),this.h()},l(i){t=E(i,"A",{href:!0,class:!0});var n=I(t);r=me(n,!1),c=$(n),l=x(n,u),a=$(n),n.forEach(_),this.h()},h(){r.a=c,o(t,"href",e[21].href),o(t,"class","nav-link svelte-oy6vuu"),V(t,"active",e[6].url.pathname===e[21].href)},m(i,n){C(i,t,n),r.m(s,t),d(t,c),d(t,l),d(t,a),h||(b=S(t,"click",ve(k)),h=!0)},p(i,n){e=i,n&4160&&V(t,"active",e[6].url.pathname===e[21].href)},d(i){i&&_(t),h=!1,b()}}}function Me(e){let t,r,s,c,u=e[21].icon+"",l,a=e[21].title+"",h,b,k,i,n,m,g,f,y,p;function v(){return e[16](e[21])}function M(){return e[17](e[21])}let F=P(e[21].subItems),j=[];for(let D=0;D<F.length;D+=1)j[D]=he(ce(e,F,D));return{c(){t=A("div"),r=A("div"),s=A("a"),c=new ge(!1),l=T(),h=ee(a),b=T(),k=A("button"),i=ie("svg"),n=ie("path"),m=T(),g=A("div");for(let D=0;D<j.length;D+=1)j[D].c();f=T(),this.h()},l(D){t=E(D,"DIV",{class:!0});var H=I(t);r=E(H,"DIV",{class:!0});var w=I(r);s=E(w,"A",{href:!0,class:!0});var B=I(s);c=me(B,!1),l=$(B),h=x(B,a),B.forEach(_),b=$(w),k=E(w,"BUTTON",{class:!0});var te=I(k);i=ae(te,"svg",{class:!0,width:!0,height:!0,viewBox:!0,fill:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,"stroke-linejoin":!0});var re=I(i);n=ae(re,"path",{d:!0}),I(n).forEach(_),re.forEach(_),te.forEach(_),w.forEach(_),m=$(H),g=E(H,"DIV",{class:!0});var le=I(g);for(let X=0;X<j.length;X+=1)j[X].l(le);le.forEach(_),f=$(H),H.forEach(_),this.h()},h(){c.a=l,o(s,"href",e[21].href),o(s,"class","nav-link main-link svelte-oy6vuu"),o(n,"d","M18 9l-6 6l-6 -6"),o(i,"class","chevron svelte-oy6vuu"),o(i,"width","16"),o(i,"height","16"),o(i,"viewBox","0 0 24 24"),o(i,"fill","none"),o(i,"stroke","currentColor"),o(i,"stroke-width","2.5"),o(i,"stroke-linecap","round"),o(i,"stroke-linejoin","round"),V(i,"open",e[21].title==="Guides"?e[0]:e[21].title==="Framework"?e[1]:e[21].title==="Vaults"?e[2]:e[21].title==="Security"?e[3]:e[21].title==="FAQ"?e[4]:!1),o(k,"class","toggle-button svelte-oy6vuu"),o(r,"class","nav-link-container svelte-oy6vuu"),V(r,"active",e[6].url.pathname===e[21].href),o(g,"class","submenu svelte-oy6vuu"),V(g,"open",e[21].title==="Guides"?e[0]:e[21].title==="Framework"?e[1]:e[21].title==="Vaults"?e[2]:e[21].title==="Security"?e[3]:e[21].title==="FAQ"?e[4]:!1),o(t,"class","nav-group svelte-oy6vuu")},m(D,H){C(D,t,H),d(t,r),d(r,s),c.m(u,s),d(s,l),d(s,h),d(r,b),d(r,k),d(k,i),d(i,n),d(t,m),d(t,g);for(let w=0;w<j.length;w+=1)j[w]&&j[w].m(g,null);d(t,f),y||(p=[S(s,"click",ve(v)),S(k,"click",Ae(M))],y=!0)},p(D,H){if(e=D,H&4127&&V(i,"open",e[21].title==="Guides"?e[0]:e[21].title==="Framework"?e[1]:e[21].title==="Vaults"?e[2]:e[21].title==="Security"?e[3]:e[21].title==="FAQ"?e[4]:!1),H&4160&&V(r,"active",e[6].url.pathname===e[21].href),H&12352){F=P(e[21].subItems);let w;for(w=0;w<F.length;w+=1){const B=ce(e,F,w);j[w]?j[w].p(B,H):(j[w]=he(B),j[w].c(),j[w].m(g,null))}for(;w<j.length;w+=1)j[w].d(1);j.length=F.length}H&4127&&V(g,"open",e[21].title==="Guides"?e[0]:e[21].title==="Framework"?e[1]:e[21].title==="Vaults"?e[2]:e[21].title==="Security"?e[3]:e[21].title==="FAQ"?e[4]:!1)},d(D){D&&_(t),fe(j,D),y=!1,ke(p)}}}function he(e){let t,r=e[24].title+"",s,c,u,l;return{c(){t=A("a"),s=ee(r),c=T(),this.h()},l(a){t=E(a,"A",{href:!0,class:!0});var h=I(t);s=x(h,r),c=$(h),h.forEach(_),this.h()},h(){o(t,"href",e[24].href),o(t,"class","nav-link sub-nav-link svelte-oy6vuu"),V(t,"active",e[6].url.pathname+e[6].url.hash===e[24].href)},m(a,h){C(a,t,h),d(t,s),d(t,c),u||(l=S(t,"click",e[18]),u=!0)},p(a,h){h&4160&&V(t,"active",a[6].url.pathname+a[6].url.hash===a[24].href)},d(a){a&&_(t),u=!1,l()}}}function de(e){let t;function r(u,l){return u[21].subItems?Me:De}let c=r(e)(e);return{c(){c.c(),t=ne()},l(u){c.l(u),t=ne()},m(u,l){c.m(u,l),C(u,t,l)},p(u,l){c.p(u,l)},d(u){u&&_(t),c.d(u)}}}function Ve(e){let t,r,s,c=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svelte-oy6vuu"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
      Back to App
      <svg class="arrow-icon svelte-oy6vuu" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M8 6h10v10"></path></svg>`,u,l,a,h,b,k,i=P(e[12]),n=[];for(let m=0;m<i.length;m+=1)n[m]=de(ue(e,i,m));return{c(){t=A("nav"),r=A("div"),s=A("a"),s.innerHTML=c,u=T(),l=A("div"),a=T(),h=A("nav");for(let m=0;m<n.length;m+=1)n[m].c();this.h()},l(m){t=E(m,"NAV",{class:!0});var g=I(t);r=E(g,"DIV",{class:!0});var f=I(r);s=E(f,"A",{href:!0,class:!0,"data-svelte-h":!0}),Z(s)!=="svelte-m6um6v"&&(s.innerHTML=c),f.forEach(_),u=$(g),l=E(g,"DIV",{class:!0}),I(l).forEach(_),a=$(g),h=E(g,"NAV",{class:!0});var y=I(h);for(let p=0;p<n.length;p+=1)n[p].l(y);y.forEach(_),g.forEach(_),this.h()},h(){o(s,"href","https://app.detrade.fund"),o(s,"class","nav-link svelte-oy6vuu"),o(r,"class","back-to-app svelte-oy6vuu"),o(l,"class","sidebar-header svelte-oy6vuu"),o(h,"class","nav-sections svelte-oy6vuu"),o(t,"class","sidebar svelte-oy6vuu"),V(t,"open",e[5])},m(m,g){C(m,t,g),d(t,r),d(r,s),d(t,u),d(t,l),d(t,a),d(t,h);for(let f=0;f<n.length;f+=1)n[f]&&n[f].m(h,null);b||(k=S(s,"click",e[15]),b=!0)},p(m,[g]){if(g&32735){i=P(m[12]);let f;for(f=0;f<i.length;f+=1){const y=ue(m,i,f);n[f]?n[f].p(y,g):(n[f]=de(y),n[f].c(),n[f].m(h,null))}for(;f<n.length;f+=1)n[f].d(1);n.length=i.length}g&32&&V(t,"open",m[5])},i:W,o:W,d(m){m&&_(t),fe(n,m),b=!1,k()}}}function $e(e,t,r){let s,c;U(e,q,w=>r(5,s=w)),U(e,pe,w=>r(6,c=w));let u=!0,l=!0,a=!0,h=!0,b=!0;function k(){r(0,u=!u)}function i(){r(1,l=!l)}function n(){r(2,a=!a)}function m(){r(3,h=!h)}function g(){r(4,b=!b)}const f=[{title:"Overview",href:"/",icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>`},{title:"Framework",href:"/framework",icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>`,subItems:[{title:"Features",href:"/framework#features"},{title:"Protocol Architecture",href:"/framework#architecture"},{title:"Terminology",href:"/framework#terminology"}]},{title:"Guides",href:"/guides",icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>`,subItems:[{title:"How to Deposit",href:"/guides#deposit"},{title:"How to Withdraw",href:"/guides#withdraw"}]},{title:"Security",href:"/security",icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,subItems:[{title:"DeFi Exposure",href:"/security#defi-exposure"},{title:"Infrastructure",href:"/security#infrastructure"},{title:"Oracle Design",href:"/security#oracle-design"},{title:"Audits",href:"/security#audit"}]},{title:"Vaults",href:"/vaults",icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 13v8"/>
        <path d="M8 21h8"/>
      </svg>`,subItems:[{title:"DeTrade Core USDC",href:"/vaults/detrade-core-usdc"}]},{title:"FAQ",href:"/faq",icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>`,subItems:[{title:"Deposits & Withdrawals",href:"/faq#deposits-withdrawals"},{title:"Performance & Metrics",href:"/faq#performance-metrics"},{title:"Oracle",href:"/faq#oracle"}]}];function y(){window.innerWidth<=1024&&q.set(!1)}function p(){window.innerWidth<=1024&&q.set(!1)}async function v(w){switch(w.title){case"Guides":r(0,u=!0);break;case"Framework":r(1,l=!0);break;case"Vaults":r(2,a=!0);break;case"Security":r(3,h=!0);break;case"FAQ":r(4,b=!0);break}await oe(w.href),p()}return Y(()=>(y(),window.addEventListener("resize",y),()=>{window.removeEventListener("resize",y)})),[u,l,a,h,b,s,c,k,i,n,m,g,f,p,v,()=>p(),w=>v(w),w=>{switch(w.title){case"Guides":k();break;case"Framework":i();break;case"Vaults":n();break;case"Security":m();break;case"FAQ":g();break}},()=>p(),async w=>{await oe(w.href),p()}]}class Te extends K{constructor(t){super(),R(this,t,$e,Ve,J,{})}}function Fe(e){let t,r,s,c='<span class="icon svelte-1jtj33"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span> <span class="icon svelte-1jtj33"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>',u,l,a,h,b;return{c(){t=A("div"),r=A("button"),s=A("div"),s.innerHTML=c,u=T(),l=A("div"),this.h()},l(k){t=E(k,"DIV",{class:!0});var i=I(t);r=E(i,"BUTTON",{class:!0,"aria-label":!0});var n=I(r);s=E(n,"DIV",{class:!0,"data-svelte-h":!0}),Z(s)!=="svelte-h109t2"&&(s.innerHTML=c),u=$(n),l=E(n,"DIV",{class:!0}),I(l).forEach(_),n.forEach(_),i.forEach(_),this.h()},h(){o(s,"class","icons svelte-1jtj33"),o(l,"class","slider svelte-1jtj33"),V(l,"dark",e[0]),o(r,"class","theme-toggle svelte-1jtj33"),o(r,"aria-label",a=e[0]?"Activer le mode jour":"Activer le mode nuit"),o(t,"class","theme-switch svelte-1jtj33")},m(k,i){C(k,t,i),d(t,r),d(r,s),d(r,u),d(r,l),h||(b=S(r,"click",e[1]),h=!0)},p(k,[i]){i&1&&V(l,"dark",k[0]),i&1&&a!==(a=k[0]?"Activer le mode jour":"Activer le mode nuit")&&o(r,"aria-label",a)},i:W,o:W,d(k){k&&_(t),h=!1,b()}}}function He(e,t,r){let s=!1;Y(()=>{const l=localStorage.getItem("theme");r(0,s=l==="dark"),l||localStorage.setItem("theme","light")});function c(){r(0,s=!s),localStorage.setItem("theme",s?"dark":"light"),u()}function u(){s?document.documentElement.classList.remove("dark-mode"):document.documentElement.classList.add("dark-mode")}return[s,c]}class _e extends K{constructor(t){super(),R(this,t,He,Fe,J,{})}}function Ce(e){let t,r,s='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',c,u,l,a,h,b,k,i,n,m,g,f;return n=new _e({}),{c(){t=A("header"),r=A("button"),r.innerHTML=s,c=T(),u=A("div"),l=A("div"),a=A("a"),h=A("img"),k=T(),i=A("div"),Q(n.$$.fragment),this.h()},l(y){t=E(y,"HEADER",{class:!0});var p=I(t);r=E(p,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(r)!=="svelte-l5qie4"&&(r.innerHTML=s),c=$(p),u=E(p,"DIV",{class:!0});var v=I(u);l=E(v,"DIV",{class:!0});var M=I(l);a=E(M,"A",{href:!0,class:!0});var F=I(a);h=E(F,"IMG",{src:!0,alt:!0,class:!0}),F.forEach(_),M.forEach(_),v.forEach(_),k=$(p),i=E(p,"DIV",{class:!0});var j=I(i);N(n.$$.fragment,j),j.forEach(_),p.forEach(_),this.h()},h(){o(r,"class","menu-button svelte-1et49rg"),se(h.src,b=e[0]?"/detrade-logo-text.png":"/detrade-logo-text-black.webp")||o(h,"src",b),o(h,"alt","DeTrade"),o(h,"class","logo-image svelte-1et49rg"),o(a,"href","https://docs.detrade.fund"),o(a,"class","logo-link no-arrow"),o(l,"class","logo svelte-1et49rg"),o(u,"class","left"),o(i,"class","right svelte-1et49rg"),o(t,"class","header svelte-1et49rg")},m(y,p){C(y,t,p),d(t,r),d(t,c),d(t,u),d(u,l),d(l,a),d(a,h),d(t,k),d(t,i),G(n,i,null),m=!0,g||(f=S(r,"click",e[1]),g=!0)},p(y,[p]){(!m||p&1&&!se(h.src,b=y[0]?"/detrade-logo-text.png":"/detrade-logo-text-black.webp"))&&o(h,"src",b)},i(y){m||(O(n.$$.fragment,y),m=!0)},o(y){L(n.$$.fragment,y),m=!1},d(y){y&&_(t),z(n),g=!1,f()}}}function Be(e,t,r){let s=!1;function c(){r(0,s=!document.documentElement.classList.contains("dark-mode"))}Y(()=>{c();const l=new MutationObserver(c);return l.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>l.disconnect()});function u(){q.update(l=>!l)}return[s,u]}class Se extends K{constructor(t){super(),R(this,t,Be,Ce,J,{})}}function Le(e){let t,r,s,c,u,l,a,h,b,k,i,n,m,g,f;document.title=t=e[0].data.title||"Documentation",a=new Te({}),k=new Se({});const y=e[3].default,p=we(y,e,e[2],null);return g=new _e({}),{c(){r=A("meta"),c=A("link"),u=T(),l=A("div"),Q(a.$$.fragment),h=T(),b=A("div"),Q(k.$$.fragment),i=T(),n=A("main"),p&&p.c(),m=T(),Q(g.$$.fragment),this.h()},l(v){const M=je("svelte-ldj652",document.head);r=E(M,"META",{name:!0,content:!0}),c=E(M,"LINK",{rel:!0,type:!0,href:!0}),M.forEach(_),u=$(v),l=E(v,"DIV",{class:!0});var F=I(l);N(a.$$.fragment,F),h=$(F),b=E(F,"DIV",{class:!0});var j=I(b);N(k.$$.fragment,j),i=$(j),n=E(j,"MAIN",{class:!0});var D=I(n);p&&p.l(D),D.forEach(_),j.forEach(_),F.forEach(_),m=$(v),N(g.$$.fragment,v),this.h()},h(){o(r,"name","description"),o(r,"content",s=e[0].data.description||"Documentation"),o(c,"rel","icon"),o(c,"type","image/png"),o(c,"href","/logo-detrade.png"),o(n,"class","content svelte-1uz0q3v"),o(b,"class","main-container svelte-1uz0q3v"),o(l,"class","layout svelte-1uz0q3v"),V(l,"sidebar-closed",!e[1])},m(v,M){d(document.head,r),d(document.head,c),C(v,u,M),C(v,l,M),G(a,l,null),d(l,h),d(l,b),G(k,b,null),d(b,i),d(b,n),p&&p.m(n,null),C(v,m,M),G(g,v,M),f=!0},p(v,[M]){(!f||M&1)&&t!==(t=v[0].data.title||"Documentation")&&(document.title=t),(!f||M&1&&s!==(s=v[0].data.description||"Documentation"))&&o(r,"content",s),p&&p.p&&(!f||M&4)&&be(p,y,v,v[2],f?Ee(y,v[2],M,null):ye(v[2]),null),(!f||M&2)&&V(l,"sidebar-closed",!v[1])},i(v){f||(O(a.$$.fragment,v),O(k.$$.fragment,v),O(p,v),O(g.$$.fragment,v),f=!0)},o(v){L(a.$$.fragment,v),L(k.$$.fragment,v),L(p,v),L(g.$$.fragment,v),f=!1},d(v){v&&(_(u),_(l),_(m)),_(r),_(c),z(a),z(k),p&&p.d(v),z(g,v)}}}function Oe(e,t,r){let s,c;U(e,pe,a=>r(0,s=a)),U(e,q,a=>r(1,c=a));let{$$slots:u={},$$scope:l}=t;return e.$$set=a=>{"$$scope"in a&&r(2,l=a.$$scope)},[s,c,l,u]}class Qe extends K{constructor(t){super(),R(this,t,Oe,Le,J,{})}}export{Qe as component};
