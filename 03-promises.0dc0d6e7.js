function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=r.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,r){n[e]=r},r.parcelRequired7c6=o);var u=o("7Y9D8");({form:document.querySelector("form")}).form.addEventListener("submit",(function(r){r.preventDefault();const{delay:t,step:n,amount:o}=r.target.elements;[...i(Number(t.value),Number(n.value),Number(o.value))].forEach(((r,n)=>{r.then((()=>{e(u).Notify.success(`✅ Fulfilled promise ${n+1} in ${Number(t.value)}ms`)})).catch((()=>{e(u).Notify.failure(`❌ Rejected promise ${n+1} in ${Number(t.value)}ms`)}))}))}));const l=e=>new Promise(((r,t)=>{const n=Math.random()>.3;setTimeout((()=>n?r({delay:e}):t({delay:e})),e)})),i=(e,r,t)=>{const n=[];for(let o=0;o<t;o+=1){const t=e+o*r;n.push(l(t))}return n};
//# sourceMappingURL=03-promises.0dc0d6e7.js.map
