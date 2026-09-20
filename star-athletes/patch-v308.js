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
function pctText308(c){
 const p=(Number(c)||0)*100;
 if(p<.001)return p.toFixed(4)+'%';
 if(p<.1)return p.toFixed(3)+'%';
 return p.toFixed(2)+'%';
}
function reasons308(m){
 const out=[];
 if(m?.specialLineage273?.id&&MAP308[m.specialLineage273.id])out.push('🧬 '+MAP308[m.specialLineage273.id]);
 for(const r of (m?.ultraRare274?.reasons||[]))out.push('✨ '+r);
 return [...new Set(out)];
}
function calc308(m){
 const u=m?.ultraRare274;if(!u)return null;
 return{
  name:u.name||'特殊誕生',
  base:Number(u.base)||0,
  mult:Number(u.mult)||1,
  chance:Number(u.chance)||0
 };
}
function sync308(){
 const modal=document.getElementById('miracle277'),m=current308();if(!modal||!m)return;
 const odds=modal.querySelector('.odds277');if(!odds)return;
 let box=modal.querySelector('.rareWhy308');
 if(!box){box=document.createElement('div');box.className='rareWhy308';odds.after(box)}
 const one=oneIn308(pct308(m)),rs=reasons308(m),calc=calc308(m);
 const formula=calc?`<div class="rareCalc308"><small>なぜこの確率？</small><b>${calc.name} 基礎 ${pctText308(calc.base)}</b><i>× 血統補正 ${calc.mult.toFixed(calc.mult%1?2:1)}</i><strong>= ${pctText308(calc.chance)}</strong></div>`:'';
 const reasonHtml=calc&&!rs.length?'<div class="rareNoBoost308">今回の追加補正なし（基礎確率そのまま）</div>':(rs.length?`<div class="rareFactors308">${rs.map(x=>`<span>${x}</span>`).join('')}</div>`:'');
 box.innerHTML=`${one?`<b>🎯 ${one}</b>`:''}${formula}${reasonHtml}`;
}
document.addEventListener('click',e=>{
 if(e.target?.closest?.('#batchGo260,#hatch'))[450,900,1400,1900].forEach(ms=>setTimeout(sync308,ms));
},true);
try{const prev=render;render=function(){const out=prev();[0,100,300].forEach(ms=>setTimeout(sync308,ms));return out}}catch(e){console.warn('render308',e)}
const css=document.createElement('style');css.id='rareWhy308Style';css.textContent=`
.rareWhy308{margin:-3px 0 8px;text-align:center}
.rareWhy308>b{display:inline-block;font-size:8px;color:#6f5400;background:#fff0a8;border:1px solid #dfbf4f;border-radius:999px;padding:4px 8px}
.rareCalc308{display:grid!important;grid-template-columns:1fr auto auto;gap:3px!important;align-items:center;margin-top:6px!important;padding:6px!important;border-radius:8px;background:#fff9dd!important;border:1px solid #e2c768!important}.rareCalc308 small{grid-column:1/-1;font-size:6px;color:#7d6927;font-weight:1000}.rareCalc308 b,.rareCalc308 i,.rareCalc308 strong{font-size:7px;font-style:normal}.rareCalc308 strong{color:#8f6100}.rareFactors308{display:flex!important;justify-content:center;gap:5px;flex-wrap:wrap;margin-top:5px!important}.rareFactors308 span{font-size:7px;font-weight:900;color:#4f4650;background:#fff;border:1px solid #d8d0c5;border-radius:999px;padding:3px 6px}.rareNoBoost308{margin-top:5px!important;font-size:7px;color:#786d58}
`;document.head.appendChild(css);
[0,120,400].forEach(ms=>setTimeout(sync308,ms));
})();