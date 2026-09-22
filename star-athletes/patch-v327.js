(()=>{
'use strict';
// v0.31.83: make MY STAR registration discoverable from the hall itself.
if(window.STAR_MY_STAR_PICKER327)return;
function all327(){
 const out=[],seen=new Set(),groups=[['nest','現役ネスト'],['lineage','血統アーカイブ'],['starters','祖先'],['foster','過去候補']];
 for(const [key,group] of groups)for(const m of(S?.[key]||[]))if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push({m,group})}
 return out;
}
function score327(m){
 const stats=Object.values(m?.stats||{}).map(Number).filter(Number.isFinite);
 const max=stats.length?Math.max(...stats):0,avg=stats.length?stats.reduce((a,b)=>a+b,0)/stats.length:0;
 return max*2+avg+(m?.skills233?.length||0)*45+(m?.rareTitles323?.length||0)*180+(m?.completedLineage271?120:0);
}
function slots327(){try{return window.STAR_MY_STAR323?.slots?.()||[]}catch(_){return []}}
function render327(){
 const hall=document.getElementById('hall323');if(!hall||hall.classList.contains('hide'))return;
 let box=document.getElementById('myStarPicker327');
 if(!box){box=document.createElement('div');box.id='myStarPicker327';box.className='myStarPicker327';hall.appendChild(box)}
 const saved=new Set(slots327().map(x=>x?.sourceId).filter(Boolean));
 const list=all327().sort((a,b)=>score327(b.m)-score327(a.m)).slice(0,12);
 box.innerHTML='<div class="pickerHead327"><div><small>REGISTER</small><b>⭐ MY STAR 登録候補</b></div><span>'+slots327().length+'/3 登録済み</span></div>'+
   '<p>ここから直接、渾身の1体を殿堂入りできます。現役ネストと血統アーカイブを優先表示しています。</p>'+
   (list.length?'<div class="pickerGrid327">'+list.map(({m,group})=>{
     const stats=Object.values(m.stats||{}).map(Number).filter(Number.isFinite),max=stats.length?Math.max(...stats):0;
     const rare=(m.rareTitles323||[])[0];
     return '<article class="pickerCard327 '+(saved.has(m.id)?'saved327':'')+'">'+
       '<div class="pickerAvatar327">'+(typeof avatar==='function'?avatar(m):'')+'</div>'+
       '<div class="pickerMeta327"><small>'+group+' / G'+(Number(m.gen||m.generation)||0)+'</small><b>'+m.name+'</b><span>'+(m.rarity||'C')+' ・ 最高能力 '+max+' ・ SKILL '+(m.skills233?.length||0)+'/6</span>'+
       (rare?'<em>'+((rare.icon)||'🏅')+' '+rare.name+'</em>':'')+'</div>'+
       '<button type="button" data-my-star323="'+m.id+'">'+(saved.has(m.id)?'★ 登録済み':'☆ MY STARへ')+'</button></article>';
   }).join('')+'</div>':'<div class="pickerEmpty327">登録できる個体がまだいません。</div>');
 try{window.paintSpecies&&window.paintSpecies()}catch(_){}
}
window.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab[data-v="hall323"],[data-my-star323],[data-replace-slot325]'))setTimeout(render327,30);
},true);
try{
 const prev=window.render;
 if(typeof prev==='function')window.render=function(){const out=prev.apply(this,arguments);setTimeout(render327,40);return out};
}catch(e){console.warn('my star picker327',e)}
const css=document.createElement('style');css.textContent=`
.myStarPicker327{margin-top:12px;padding:11px;border:1px solid #c9b7df;border-radius:15px;background:linear-gradient(180deg,#fbf8ff,#f5f1fb)}.pickerHead327{display:flex;justify-content:space-between;gap:8px;align-items:center}.pickerHead327 small{display:block;font-size:6px;letter-spacing:.14em;color:#7d5ea6;font-weight:1000}.pickerHead327 b{font-size:12px}.pickerHead327 span{font-size:7px;font-weight:1000;padding:4px 7px;border-radius:999px;background:#312146;color:#ffe477}.myStarPicker327>p{margin:5px 0 8px;font-size:7px;line-height:1.5;color:#687488}.pickerGrid327{display:grid;gap:6px}.pickerCard327{display:grid;grid-template-columns:58px minmax(0,1fr) auto;gap:8px;align-items:center;padding:7px;border:1px solid #d8cde5;border-radius:11px;background:#fff}.pickerCard327.saved327{background:#f4ecff;border-color:#9e82bf}.pickerAvatar327 .avatar{height:56px!important;border:0!important;border-radius:9px!important}.pickerMeta327{min-width:0}.pickerMeta327 small,.pickerMeta327 b,.pickerMeta327 span,.pickerMeta327 em{display:block}.pickerMeta327 small{font-size:6px;color:#7b7187}.pickerMeta327 b{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pickerMeta327 span{font-size:6px;color:#657183}.pickerMeta327 em{margin-top:2px;font-size:6px;font-style:normal;color:#72488d;font-weight:900}.pickerCard327 button{min-width:78px;border:0;border-radius:8px;background:#302044;color:#ffe477;padding:7px 6px;font-size:7px;font-weight:1000}.pickerCard327.saved327 button{background:#70558e;color:#fff}.pickerEmpty327{padding:12px;text-align:center;font-size:8px;color:#7a7182}@media(max-width:430px){.pickerCard327{grid-template-columns:52px minmax(0,1fr)}.pickerCard327 button{grid-column:1/3;width:100%}}
`;document.head.appendChild(css);
window.STAR_MY_STAR_PICKER327={sync:render327};
setTimeout(render327,120);
})();