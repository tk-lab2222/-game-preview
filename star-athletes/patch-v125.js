(()=>{
// Legacy tournament-card compatibility styles only.
// Selection, state, and rendering are owned exclusively by patch-v290.
const css=document.createElement('style');css.textContent=`
.meetChoice119{display:grid!important;gap:8px!important}
.tier125{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px}
.tier125 b{font-size:8px!important}.tier125 strong{font-size:7px;color:#6a7480}
.meetChoiceCard125{display:grid!important;gap:4px!important;text-align:left!important;border:2px solid #26364e!important;border-radius:14px!important;background:linear-gradient(145deg,#fff,#edf5ff)!important;padding:10px!important;box-shadow:0 4px 0 #0001!important}
.meetChoiceCard125 b{font-size:12px}.meetChoiceCard125 span{font-size:9px;color:#445}.meetChoiceCard125 small{font-size:8px;color:#667}.meetChoiceCard125 em{font-style:normal;font-size:8px;font-weight:1000;color:#0870a8}.meetChoiceCard125.sel{background:linear-gradient(145deg,#e6f8ff,#fff7d4)!important;outline:3px solid #58cfff!important}
`;document.head.appendChild(css);
window.STAR_MEETS125={legacy:true,renderOwner:'STAR_MEET290'};
})();