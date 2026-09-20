(()=>{
// v0.28.9 / M4.3: Breeding Research Notebook.
// Progressive hints only; exact internal probabilities stay hidden.
const SAVE276='star-athletes-save-v200';
const REC276=[
 {id:'godspeed',name:'神速系',icon:'💨',locked:'高速系のSKILL同士に反応があるようだ',clue:'「疾風」と「軽業」を併せ持つ血統に強い反応',full:'疾風 + 軽業の組合せで神速系が狙える'},
 {id:'titan',name:'巨神系',icon:'🗿',locked:'パワー系の複合SKILLを調べてみよう',clue:'「豪腕」と「鉄肺」の組合せに強い反応',full:'豪腕 + 鉄肺の組合せで巨神系が狙える'},
 {id:'aberrant',name:'異形系',icon:'🧪',locked:'変異因子の高い血統に未知の反応',clue:'変異因子Sを持つ個体が重要らしい',full:'高い変異因子を重ねると異形系が狙える'},
 {id:'pureblood',name:'純血系',icon:'🔗',locked:'同じ種族を長く繋ぐ意味がありそうだ',clue:'同種族を数世代つなぐと反応が強まる',full:'同種族を長期継承すると純血系が狙える'},
 {id:'hybrid',name:'混血系',icon:'🌈',locked:'異なる種族を重ねた血統を観察しよう',clue:'異種交配を連続すると反応が蓄積する',full:'異種交配を複数世代続けると混血系が狙える'}
];
function n276(v){return Number(v)||0}
function all276(){
 const out=[],seen=new Set();
 for(const k of ['starters','nest','lineage','cands','foster'])for(const m of(S[k]||[])){
   if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}
 }
 return out;
}
function h276(m,k){const v=Number(m?.hidden233?.[k]);return Number.isFinite(v)?v:0}
function skills276(m){return Array.isArray(m?.skills233)?m.skills233:[]}
function state276(){
 if(!S.research276||typeof S.research276!=='object')S.research276={levels:{},seen:{}};
 if(!S.research276.levels)S.research276.levels={};
 if(!S.research276.seen)S.research276.seen={};
 return S.research276;
}
function observedLevel276(id,list){
 if(list.some(m=>m?.specialLineage273?.id===id))return 3;
 if(id==='godspeed'){
   if(list.some(m=>skills276(m).includes('speed')&&skills276(m).includes('agility')))return 2;
   if(list.some(m=>skills276(m).includes('speed')||skills276(m).includes('agility')))return 1;
 }
 if(id==='titan'){
   if(list.some(m=>skills276(m).includes('power')&&skills276(m).includes('stamina')))return 2;
   if(list.some(m=>skills276(m).includes('power')||skills276(m).includes('stamina')))return 1;
 }
 if(id==='aberrant'){
   if(list.some(m=>h276(m,'mutation')>=7))return 2;
   if(list.some(m=>h276(m,'mutation')>=6))return 1;
 }
 if(id==='pureblood'){
   const maxGen=list.reduce((a,m)=>Math.max(a,n276(m?.gen)),0);
   if(maxGen>=5)return 2;if(maxGen>=3)return 1;
 }
 if(id==='hybrid'){
   const mx=list.reduce((a,m)=>Math.max(a,n276(m?.mixedLineage273)),0);
   if(mx>=2)return 2;if(mx>=1)return 1;
 }
 return 0;
}
function scan276(){
 const st=state276(),list=all276();
 for(const r of REC276){
   const lv=Math.max(n276(st.levels[r.id]),observedLevel276(r.id,list));
   st.levels[r.id]=Math.min(3,lv);
   if(lv>=3)st.seen[r.id]=true;
 }
 try{localStorage.setItem(SAVE276,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}
}
function tier276(lv){return lv>=3?'発見済':lv===2?'強い反応':lv===1?'手がかり':'未発見'}
function text276(r,lv){return lv>=3?r.full:lv===2?r.clue:lv===1?r.locked:'???? — 配合と育成を進めて手がかりを集めよう'}
function render276(){
 const nest=document.getElementById('nest201');if(!nest)return;
 scan276();
 let host=document.getElementById('research276');
 if(!host){
   host=document.createElement('div');host.id='research276';host.className='box research276';
   const summary=document.getElementById('nestSummary201');
   summary?.after(host);
   if(!host.parentNode)nest.prepend(host);
 }
 const st=state276(),found=REC276.filter(r=>n276(st.levels[r.id])>=3).length;
 const clues=REC276.filter(r=>n276(st.levels[r.id])>0).length;
 const ultra=all276().filter(m=>m?.ultraRare274).length;
 host.innerHTML=`<div class="head276"><div><small>BREEDING RESEARCH</small><b>📓 配合研究ノート</b></div><span>${found}/${REC276.length} 発見</span></div>
 <div class="summary276"><b>研究進行 ${clues}/${REC276.length}</b><span>特殊個体観測 ${ultra}</span></div>
 <div class="list276">${REC276.map(r=>{const lv=n276(st.levels[r.id]);return `<article class="lv${lv}"><header><b>${lv? r.icon:'🔒'} ${lv>=2?r.name:'未解析レシピ'}</b><em>${tier276(lv)}</em></header><p>${text276(r,lv)}</p><div><i></i><i class="${lv>=1?'on':''}"></i><i class="${lv>=2?'on':''}"></i><i class="${lv>=3?'on':''}"></i></div></article>`}).join('')}</div>
 <small class="note276">正確な内部確率は非公開。血統・SKILL・変異を重ねるほど研究ノートの手がかりが増えます。</small>`;
}
function late276(){render276();[80,220,500,900].forEach(ms=>setTimeout(render276,ms))}
try{const prev276=render;render=function(){const out=prev276();setTimeout(late276,0);return out}}catch(e){console.warn('render276',e)}
window.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab[data-v="nest201"],#batchGo260,#hatch,#adopt,#doTrain263,#run,#next225,#annualNext233'))setTimeout(late276,0);
},true);
const css=document.createElement('style');css.textContent=`
.research276{border:2px solid #405875!important;background:linear-gradient(145deg,#f8fbff,#eef4fb)!important}
.head276{display:flex;justify-content:space-between;align-items:center;gap:8px}.head276 small{display:block;font-size:6px;letter-spacing:.13em;color:#63778d;font-weight:1000}.head276 b{font-size:13px}.head276 span{font-size:7px;border:1px solid #9aabba;border-radius:999px;padding:4px 7px;background:#fff;font-weight:1000}
.summary276{display:flex;justify-content:space-between;margin:8px 0 6px;padding:6px 7px;border-radius:8px;background:#1e3046;color:#fff;font-size:7px}.summary276 span{opacity:.8}
.list276{display:grid;gap:6px}.list276 article{padding:7px;border:1px solid #c5d0da;border-radius:9px;background:#fff}.list276 article.lv0{opacity:.58}.list276 article.lv3{border-color:#c39726;background:#fff9df}.list276 header{display:flex;justify-content:space-between;gap:7px;align-items:center}.list276 header b{font-size:9px}.list276 header em{font-style:normal;font-size:6px;font-weight:1000;border-radius:999px;padding:2px 5px;background:#edf2f6}.list276 p{margin:5px 0;font-size:7px;line-height:1.45;color:#586877}.list276 article>div{display:grid;grid-template-columns:repeat(4,1fr);gap:3px}.list276 i{height:4px;border-radius:99px;background:#dce3e9}.list276 i:first-child,.list276 i.on{background:#6e9fc9}.list276 .lv3 i{background:#d0a32e}.note276{display:block;margin-top:7px;font-size:6px;color:#667786}
`;document.head.appendChild(css);setTimeout(late276,0);
})();