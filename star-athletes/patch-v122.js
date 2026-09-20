(()=>{
// Legacy shop logic retired. Shop rendering and purchases are owned exclusively by patch-v309.
const css=document.createElement('style');css.textContent=`
.shop122{background:linear-gradient(180deg,#fffdf5,#fff7d9);border:2px solid #e1b94f!important}
.shopHead122{display:flex;align-items:center;justify-content:space-between;gap:10px}.shopHead122 small{font-size:7px;letter-spacing:.15em;color:#9b6a00;font-weight:1000}.shopHead122 h3{margin:1px 0 0}.shopHead122>b{background:#221a06;color:#ffd966;border-radius:999px;padding:6px 10px;font-size:11px;white-space:nowrap}
.shopNote122{font-size:9px;color:#66552a;margin:5px 0 9px}.shopGrid122{display:grid;grid-template-columns:1fr 1fr;gap:7px}.shopItem122{display:grid;grid-template-columns:34px 1fr;gap:4px 7px;align-items:center;border:1px solid #d6ba69;background:#fff;border-radius:12px;padding:7px;box-shadow:0 2px 0 #0001}.shopIcon122{font-size:26px;text-align:center}.shopText122{min-width:0}.shopText122 b{display:block;font-size:10px}.shopText122 small{display:block;font-size:7px;color:#666;line-height:1.35}.shopItem122 select{grid-column:1/3;width:100%;font-size:9px;padding:5px}.shopItem122 button{grid-column:1/3;border:0;border-radius:8px;background:#222;color:#ffd966;font-weight:1000;padding:7px;font-size:9px}.shopItem122 button:disabled{opacity:.35}.shopMsg122{min-height:16px;font-size:9px;font-weight:1000;color:#a04e00;margin-top:7px}
@media(max-width:430px){.shopGrid122{grid-template-columns:1fr}}
`;document.head.appendChild(css);
window.STAR_SHOP122={legacy:true,renderOwner:'STAR_SHOP309'};
})();