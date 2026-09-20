(()=>{
// v0.31.7: guarantee tournament rewards accumulate and immediately refresh the wallet.
const SAVE293='star-athletes-save-v200';
let battleBase293=null;
function snap293(){
  battleBase293={
    coins:Number(S?.coins)||0,
    fame:Number(S?.fame)||0,
    hist:Array.isArray(S?.seasonHistory)?S.seasonHistory.length:0
  };
}
function persist293(){
  try{localStorage.setItem(SAVE293,JSON.stringify({savedAt:Date.now(),S}))}catch(e){console.warn('save293',e)}
}
function refreshWallet293(){
  try{
    const wallet=document.querySelector('.nestWallet201');
    if(wallet)wallet.innerHTML=`<span>🪙 ${Number(S?.coins)||0}</span><span>⭐ ${Number(S?.fame)||0}</span><span>🏅 ${S?.emblems?.length||0}</span>`;
    const shop=document.querySelector('#shop122 .shopHead122>b');
    if(shop)shop.textContent=`${Number(S?.coins)||0} coin`;
  }catch(_){}
}
function settle293(){
  if(!battleBase293)return;
  const hist=Array.isArray(S?.seasonHistory)?S.seasonHistory:[];
  if(hist.length<=battleBase293.hist)return;
  const h=hist[hist.length-1];
  const rewardCoins=Math.max(0,Number(h?.coins)||0);
  const rewardFame=Math.max(0,Number(h?.fame)||0);
  // During a battle there is no legitimate spending path, so base + result is authoritative.
  S.coins=battleBase293.coins+rewardCoins;
  S.fame=battleBase293.fame+rewardFame;
  persist293();
  refreshWallet293();
  battleBase293=null;
}
const run=document.getElementById('run');
if(run&&!run.dataset.reward293){
  run.dataset.reward293='1';
  run.addEventListener('click',()=>snap293(),true);
}
const result=document.getElementById('result');
if(result){
  const mo=new MutationObserver(()=>{
    [0,30,120].forEach(ms=>setTimeout(()=>{settle293();refreshWallet293()},ms));
  });
  mo.observe(result,{childList:true,subtree:true,characterData:true});
}
try{
  const prev=render;
  render=function(){
    const out=prev();
    setTimeout(refreshWallet293,0);
    return out;
  };
}catch(e){console.warn('render293',e)}
[0,80,250].forEach(ms=>setTimeout(refreshWallet293,ms));
window.STAR_REWARD293={sync:refreshWallet293};
})();