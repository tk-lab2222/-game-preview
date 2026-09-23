(()=>{
// v0.32.44: retired legacy C/U/R/SR/SSR/UR/EX birth-rarity visuals.
// Ability rank is post-development only; star-grade visuals are handled by v340+.
if(window.STAR_RARITY249)return;
function sync249(){document.querySelectorAll('.rarityFX249').forEach(el=>{el.classList.remove('rarityFX249','rar249-c','rar249-u','rar249-r','rar249-sr','rar249-ssr','rar249-ur','rar249-ex','rarityMega250');el.removeAttribute('data-rarity249')});document.querySelectorAll('.rarityBadge249,.hatchRarityLabel249,.hatchAura249,.burst250').forEach(el=>el.remove());}
window.STAR_RARITY249={sync:sync249};setTimeout(sync249,0);
})();