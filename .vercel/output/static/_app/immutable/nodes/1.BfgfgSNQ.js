import{s as S,n as _,b as x}from"../chunks/B2QSKqcC.js";import{S as j,i as k,d as l,k as f,c as m,b as d,f as g,l as h,m as v,g as q,j as $,n as E,s as y}from"../chunks/CUn3bLZ1.js";import{s as C}from"../chunks/C6Ffq9u1.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",n,o,i,c=((b=s[0].error)==null?void 0:b.message)+"",u;return{c(){t=$("h1"),n=E(r),o=y(),i=$("p"),u=E(c)},l(e){t=g(e,"H1",{});var a=h(t);n=v(a,r),a.forEach(l),o=q(e),i=g(e,"P",{});var p=h(i);u=v(p,c),p.forEach(l)},m(e,a){m(e,t,a),d(t,n),m(e,o,a),m(e,i,a),d(i,u)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&f(n,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&f(u,c)},i:_,o:_,d(e){e&&(l(t),l(o),l(i))}}}function z(s,t,r){let n;return x(s,P,o=>r(0,n=o)),[n]}let F=class extends j{constructor(t){super(),k(this,t,z,w,S,{})}};export{F as component};
