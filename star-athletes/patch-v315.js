(()=>{
// UI-only polish: make the compact rarity guide readable and tappable-looking on phones.
const css=document.createElement('style');
css.textContent=`
#rarityGuide313{align-items:center;row-gap:6px}
#rarityGuide313 span{font-size:9px;line-height:1.25;min-height:28px;display:inline-flex;align-items:center;gap:4px;padding:5px 8px}
#rarityGuide313 small{font-size:8px;line-height:1.45;color:#667482;margin-top:1px}
@media (max-width:430px){
 #rarityGuide313{gap:5px;margin:9px 0 11px}
 #rarityGuide313 span{font-size:9px;min-height:30px;flex:1 1 calc(50% - 5px);justify-content:center;white-space:nowrap}
 #rarityGuide313 small{font-size:8px;text-align:center;margin-left:0}
}
@media (max-width:360px){#rarityGuide313 span{padding-inline:5px}}
`;
document.head.appendChild(css);
})();
