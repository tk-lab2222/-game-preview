(()=>{
// v0.23.6: self-contained compatibility score UI. Do not depend on private helpers from patch-v233.
const K236=['power','speed','stamina','agility','tech','guts'];
const PAIR236={draco:{draco:14,unil:22,grimo:20,puru:18},unil:{draco:22,unil:14,grimo:23,puru:19},grimo:{draco:20,unil:23,grimo:14,puru:22},puru:{draco:18,unil:19,grimo:22,puru:15}};
const PERS236={熱血:{熱血:8,冷静:20,負けず嫌い:14,お調子者:12,臆病:10,マイペース:16},冷静:{熱血:20,冷静:13,負けず嫌い:17,お調子者:15,臆病:18,マイペース:16},負けず嫌い:{熱血:14,冷静:17,負けず嫌い:9,お調子者:12,臆病:15,マイペース:18},お調子者:{熱血:12,冷静:15,負けず嫌い:12,お調子者:10,臆病:17,マイペース:16},臆病:{熱血:10,冷静:18,負けず嫌い:15,お調子者:17,臆病:11,マイペース:19},マイペース:{熱血:16,冷静:16,負けず嫌い:18,お調子者:16,臆病:19,マイペース:12}};
function n236(v){return Number(v)||0}
function clamp236(v,a,b){return Math.max(a,Math.min(b,v))}
function all236(){const out=[],seen=new Set();for(const key of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[key]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);out.push(m)}if(S.egg&&!seen.has(S.egg.id))out.push(S.egg);return out}
function top236(m){let k=K236[0];for(const x of K236)if(n236(m?.stats?.[x])>n236(m?.stats?.[k]))k=x;return k}
function hidden236(m){const h=m?.hidden233||{};return{heredity:n236(h.heredity),stability:n236(h.stability)}}
function calc236(a,b){
 const species=PAIR236[a.species]?.[b.species]??17;
 const personality=PERS236[a.personality]?.[b.personality]??14;
 const ta=top236(a),tb=top236(b);let ability=ta!==tb?16:10;
 const weakA=K236.slice().sort((x,y)=>n236(a.stats?.[x])-n236(a.stats?.[y]))[0];
 const weakB=K236.slice().sort((x,y)=>n236(b.stats?.[x])-n236(b.stats?.[y]))[0];
 if(ta===weakB||tb===weakA)ability+=4;
 const blood=Math.max(5,15-Math.max(0,4-Math.abs(n236(a.gen)-n236(b.gen)))*2-(a.origin&&b.origin&&a.origin===b.origin?4:0));
 let visual=4;if(a.visual?.color!==b.visual?.color)visual+=2;if(a.visual?.pattern!==b.visual?.pattern)visual+=2;if(a.visual?.part!==b.visual?.part)visual+=2;
 const ha=hidden236(a),hb=hidden236(b),chemistry=clamp236(Math.round((ha.heredity+hb.heredity+ha.stability+hb.stability)/2),0,10);
 return clamp236(species+personality+ability+blood+visual+chemistry,0,100)
}
function label236(s){return s>=90?'✨ 運命的':s>=75?'★ とても良い':s>=60?'◎ 好相性':s>=40?'○ まずまず':'△ かみ合いにくい'}
function draw236(){
 const parents=document.querySelector('#breed .parents');if(!parents)return;
 let row=document.getElementById('compatScore236');
 if(!row){row=document.createElement('div');row.id='compatScore236';row.className='compatScore236';parents.after(row)}
 const ids=Array.isArray(S.parents)?S.parents:[],pool=all236(),a=pool.find(x=>x.id===ids[0]),b=pool.find(x=>x.id===ids[1]);
 if(!a||!b){row.classList.add('hide');row.innerHTML='';return}
 const s=calc236(a,b);row.classList.remove('hide');row.innerHTML=`<div><span>配合相性</span><strong>${s}<small>/100</small></strong></div><em>${label236(s)}</em>`;
 // Hide older compatibility summaries so the visible source of truth is unambiguous.
 const old=document.getElementById('compat233');if(old)old.style.display='none';
}
function late236(){draw236();setTimeout(draw236,20);setTimeout(draw236,100)}
try{const before=render;render=function(){const out=before();late236();return out}}catch(e){console.warn('render236',e)}
// Capture parent selections before any downstream listener can stop propagation.
window.addEventListener('click',e=>{if(e.target?.closest?.('[data-mode="p"],.tab[data-v="breed"]'))late236()},true);
const css=document.createElement('style');css.textContent=`
.compatScore236{display:flex!important;align-items:center;justify-content:space-between;gap:10px;margin:9px 0 11px;padding:11px 12px;border:2px solid #263e5c;border-radius:13px;background:linear-gradient(135deg,#eef7ff,#fff);color:#172033}.compatScore236.hide{display:none!important}.compatScore236>div{display:flex;align-items:baseline;gap:7px}.compatScore236 span{font-size:9px;font-weight:1000;letter-spacing:.04em}.compatScore236 strong{font-size:28px;line-height:1;font-weight:1000;color:#0877ad}.compatScore236 strong small{font-size:10px;color:#667789;margin-left:2px}.compatScore236 em{font-style:normal;font-size:10px;font-weight:1000;background:#fff0b5;border:1px solid #d5b84b;border-radius:999px;padding:5px 8px;white-space:nowrap}
`;document.head.appendChild(css);late236();
})();