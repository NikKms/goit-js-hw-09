!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){t[e]=n},n.parcelRequired7c6=o);var u=o("8nrFW"),i=o("6JpON");({form:document.querySelector("form")}).form.addEventListener("submit",(function(n){n.preventDefault();var r=n.target.elements,t=r.delay,o=r.step,a=r.amount,l=f(Number(t.value),Number(o.value),Number(a.value));e(u)(l).forEach((function(n,r){n.then((function(){e(i).Notify.success("✅ Fulfilled promise ".concat(r+1," in ").concat(n.delay,"ms"))})).catch((function(){e(i).Notify.failure("❌ Rejected promise ".concat(r+1," in ").concat(n.delay,"ms"))}))}))}));var a=function(e){return new Promise((function(n,r){var t=Math.random()>.3;setTimeout((function(){return t?n({delay:e}):r({delay:e})}),e)}))},f=function(e,n,r){for(var t=[],o=0;o<r;o+=1){var u=e+o*n;t.push(a(u))}return t}}();
//# sourceMappingURL=03-promises.2cfbeb79.js.map
