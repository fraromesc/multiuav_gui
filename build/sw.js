if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let t={};const o=e=>i(e,d),l={module:{uri:d},exports:t,require:o};s[d]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-80d46556.css",revision:null},{url:"assets/index-d6bba0b0.js",revision:null},{url:"index.html",revision:"b4de24a4089970503313f9d3bda4d4cb"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"styles.css",revision:"2098e9dd5d82df81c2ba75d9dd46eb78"},{url:"manifest.webmanifest",revision:"da369ec811d49be1d22a4415b8ce650a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
