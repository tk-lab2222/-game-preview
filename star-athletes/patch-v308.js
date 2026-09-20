(()=>{
// v0.31.20: explain rare births with minimal visual context.
const MAP308={
 godspeed:'疾風＋軽業',
 titan:'豪腕＋鉄肺',
 aberrant:'変異S × 変異S',
 pureblood:'同種族を5代継続',
 hybrid:'異種交配を3代継続'
};
function all308(){return [...(S?.cands||[]),...(S?.nest||[]),...(S?.lineage||[]),...(S?.starters||[])]}
function current308(){
 const modal=document.getElementById('miracle277');if(!modal)return null;
 const name=modal.querySelector('.name277 b')?.textContent?.trim();
 return all308().find(m=>m?.name===name&& (m?.specialLineage273||m?.ultraRare274))||null;
}
function pct308(m){
 const c=Number(m?.ultraRare274?.chance??m?.specialLineage273?.chance);
 return Number.isFinite(c)&&c>0?c:null;
}
function oneIn308(c){
 if(!c)return null;
 const n=Math.max(1,Math.round(1/c));
 return n>=10000?`約${Math.round(n/1000)*1000}体に1体`:`約${n}体に1体`;
}
function reasons308(m){
 const out=[];
 if(m?.specialLineage273?.id&&MAP308[m.specialLineage273.id])out.push('🧬 '+MAP308[m.specialLineage273.id]);
 if(m?.ultraRare274?.reasons?.length)out.push('✨ '+String(m.ultraRare274.reasons[0]).replace(/×[\d.]+$/,''));
 if(['UR','EX'].includes(m?.rarity))out.push('💎 '+m.rarity+'個体');
 return [...new Set(out)].slice(0,2);
}
function sync308(){
 const modal=document.getElementById('miracle277'),m=current308();if(!modal||!m)return;
 const odds=modal.querySelector('.odds277');if(!odds)return;
 let box=modal.querySelector('.rareWhy308');
 if(!box){box=document.createElement('div');box.className='rareWhy308';odds.after(box)}
 const one=oneIn308(pct308(m)),rs=reasons308(m);
 box.innerHTML=`${one?`<b>🎯 ${one}</b>`:''}${rs.length?`<div>${rs.map(x=>`<span>${x}</span>`).join('')}</div>`:''}`;
}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#batchGo260,#hatch'))[450,900,1400,1900].forEach(ms=>setTimeout(sync308,ms));
},true);
try{const prev=render;render=function(){const out=prev();[0,100,300].forEach(ms=>setTimeout(sync308,ms));return out}}catch(e){console.warn('render308',e)}
const css=document.createElement('style');css.id='rareWhy308Style';css.textContent=`
.rareWhy308{margin:-3px 0 8px;text-align:center}
.rareWhy308>b{display:inline-block;font-size:8px;color:#6f5400;background:#fff0a8;border:1px solid #dfbf4f;border-radius:999px;padding:4px 8px}
.rareWhy308>div{display:flex;justify-content:center;gap:5px;flex-wrap:wrap;margin-top:5px}
.rareWhy308 span{font-size:7px;font-weight:900;color:#4f4650;background:#fff;border:1px solid #d8d0c5;border-radius:999px;padding:3px 6px}
`;document.head.appendChild(css);
[0,120,400].forEach(ms=>setTimeout(sync308,ms));
})();