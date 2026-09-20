(()=>{
// v0.28.1: M3.2 bloodline missions — one rotating generation goal + persistent long-term lineage goals.
const SAVE269='star-athletes-save-v200';
const STAT269=['power','speed','stamina','agility','tech','guts'];
const LAB269={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const RANK269=['E','D','C','B','A','S'];
const SHORT269=[
 {id:'inherit-power',title:'豪腕を継承',desc:'ネストに「豪腕」持ちを1体残す',ok:()=>all269().some(m=>(m.skills233||[]).includes('power'))},
 {id:'speed-300',title:'疾風の芽',desc:'スピード300以上を1体育てる',ok:()=>all269().some(m=>num269(m.stats?.speed)>=300)},
 {id:'rare-ssr',title:'輝く新星',desc:'SSR以上を1体ネストに残す',ok:()=>all269().some(m=>rarity269(m)>=3)},
 {id:'heredity-a',title:'血を繋ぐ者',desc:'遺伝力A以上を1体残す',ok:()=>all269().some(m=>num269(m.hidden233?.heredity)>=4)},
 {id:'tech-280',title:'技巧派の系譜',desc:'テクニック280以上を1体育てる',ok:()=>all269().some(m=>num269(m.stats?.tech)>=280)},
 {id:'two-skills',title:'二つの才能',desc:'SKILLを2つ持つ個体を1体残す',ok:()=>all269().some(m=>(m.skills233||[]).length>=2)}
];
const LONG269=[
 {id:'gen5',title:'五代の系譜',desc:'第5世代へ到達',ok:()=>generation269()>=5},
 {id:'all300',title:'万能血統',desc:'1体の全能力を300以上にする',ok:()=>all269().some(m=>STAT269.every(k=>num269(m.stats?.[k])>=300))},
 {id:'skill3',title:'才能の集積',desc:'SKILLを3つ持つ個体を残す',ok:()=>all269().some(m=>(m.skills233||[]).length>=3)},
 {id:'hidden-s',title:'極上の素質',desc:'隠れ素質Sを2項目以上持つ個体を残す',ok:()=>all269().some(m=>['growth','heredity','clutch','stability','mutation','luck'].filter(k=>num269(m.hidden233?.[k])>=5).length>=2)}
];
function num269(v){return Number(v)||0}
function generation269(){return Math.max(1,num269(S.generation233)||num269(S.generation232)||num269(S.generation)||1)}
function all269(){const out=[],seen=new Set();for(const key of ['nest','lineage','starters'])for(const m of(S[key]||[]))if(m?.id&&!seen.has(m.id)){seen.add(m.id);out.push(m)}return out}
function rarity269(m){try{return Math.max(0,R.indexOf(m?.rarity))}catch(_){return 0}}
function state269(){if(!S.missions269||typeof S.missions269!=='object')S.missions269={completed:{},claimed:{}};if(!S.missions269.completed)S.missions269.completed={};if(!S.missions269.claimed)S.missions269.claimed={};return S.missions269}
function save269(){try{localStorage.setItem(SAVE269,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function short269(){const g=generation269();return SHORT269[(g-1)%SHORT269.length]}
function completedCount269(){return Object.keys(state269().completed||{}).length}
function bonus269(){return completedCount269()*5}
function syncBonus269(){
 const target=bonus269();S.missionStatBonus269=target;
 (S.nest||[]).forEach(m=>{
   if(!m||!m.stats)return;
   const applied=num269(m.missionBonusApplied269),delta=Math.max(0,target-applied);
   if(delta>0){STAT269.forEach(k=>m.stats[k]=num269(m.stats[k])+delta);m.missionBonusApplied269=target}
 });
}
function reward269(id,long=false){const st=state269();if(st.claimed[id])return;st.claimed[id]=true;syncBonus269();save269()}
function evaluate269(){const st=state269(),s=short269(),sid='g'+generation269()+':'+s.id;if(!st.completed[sid]&&s.ok()){st.completed[sid]={at:Date.now(),generation:generation269()};reward269(sid,false)}for(const m of LONG269)if(!st.completed[m.id]&&m.ok()){st.completed[m.id]={at:Date.now(),generation:generation269()};reward269(m.id,true)}syncBonus269();save269()}
function progress269(m){if(m.id==='gen5')return Math.min(5,generation269())+'/5 世代';if(m.id==='all300'){const best=all269().reduce((a,x)=>Math.max(a,Math.min(...STAT269.map(k=>num269(x.stats?.[k])))),0);return Math.min(300,best)+'/300';}if(m.id==='skill3')return Math.min(3,all269().reduce((a,x)=>Math.max(a,(x.skills233||[]).length),0))+'/3 SKILL';if(m.id==='hidden-s'){const best=all269().reduce((a,x)=>Math.max(a,['growth','heredity','clutch','stability','mutation','luck'].filter(k=>num269(x.hidden233?.[k])>=5).length),0);return Math.min(2,best)+'/2 S';}return ''}
function render269(){evaluate269();const host=document.getElementById('missionHost203');if(!host)return;const st=state269(),s=short269(),sid='g'+generation269()+':'+s.id,done=!!st.completed[sid];host.innerHTML=`<div class="missionBoard269"><div class="missionTitle269"><div><small>BLOODLINE MISSIONS</small><b>🧬 血統ミッション</b></div><span>第${generation269()}世代</span></div><div class="missionBonus269"><div><small>MISSION BONUS</small><b>ネスト達成ボーナス</b></div><strong>全能力 +${bonus269()}</strong><em>達成 ${completedCount269()}件 × +5 / 現役3体へ常時反映</em></div><div class="shortMission269 ${done?'done269':''}"><small>今世代の目標</small><b>${done?'✓ ':''}${s.title}</b><p>${s.desc}</p><em>${done?'✓ 達成 / 全能力+5 反映済':'報酬：全能力+5 ・ 世代を越える前に狙おう'}</em></div><div class="longTitle269">長期目標 <small>世代をまたいで進行</small></div><div class="longList269">${LONG269.map(m=>{const d=!!st.completed[m.id];return `<div class="${d?'done269':''}"><span>${d?'✓':'◇'}</span><p><b>${m.title}</b><small>${m.desc}</small></p><em>${d?'✓ 達成 / 全能力+5 反映済':`報酬：全能力+5 ・ ${progress269(m)}`}</em></div>`}).join('')}</div><div class="missionNote269">大会で強い個体だけでなく、次世代へ残す価値のある血統を作るための目標です。</div></div>`}
function late269(){render269();[80,220,500].forEach(ms=>setTimeout(render269,ms))}
window.addEventListener('click',e=>{if(e.target?.closest?.('.tab[data-v="mission203"],#adopt,#doTrain263,#run,#next,#next217,#annualNext233')){setTimeout(()=>{syncBonus269();late269()},0);setTimeout(()=>{syncBonus269();late269()},260)}},true);
try{const prev269=render;render=function(){const out=prev269();setTimeout(late269,0);return out}}catch(e){console.warn('render269',e)}
const css=document.createElement('style');css.textContent=`.missionBoard269{padding:10px}.missionTitle269{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:9px}.missionTitle269 small{display:block;font-size:6px;color:#657585;font-weight:1000}.missionTitle269 b{font-size:13px}.missionTitle269>span{font-size:8px;border:1px solid #8192a1;border-radius:999px;padding:4px 7px}.missionBonus269{display:grid;grid-template-columns:1fr auto;gap:4px 8px;align-items:center;margin:0 0 9px;padding:9px;border:2px solid #d0a92d;border-radius:11px;background:linear-gradient(145deg,#fff9df,#fff)}.missionBonus269 small{display:block;font-size:6px;color:#8a711f;font-weight:1000}.missionBonus269 b{font-size:10px}.missionBonus269 strong{font-size:14px;color:#7c5b00}.missionBonus269 em{grid-column:1/-1;font-size:7px;font-style:normal;color:#6e6550}.shortMission269{border:2px solid #8c6fbd;border-radius:12px;padding:9px;background:#fbf8ff}.shortMission269.done269{border-color:#6d9b78;background:#f5fff7}.shortMission269>small{font-size:6px;color:#77638f}.shortMission269>b{display:block;font-size:11px;margin:2px 0}.shortMission269 p{margin:2px 0;font-size:8px}.shortMission269 em{font-size:7px;font-style:normal;font-weight:900}.longTitle269{font-size:9px;font-weight:1000;margin:11px 0 5px}.longTitle269 small{font-size:6px;color:#788693}.longList269{display:grid;gap:5px}.longList269>div{display:grid;grid-template-columns:20px 1fr auto;align-items:center;gap:5px;border:1px solid #cbd4dc;border-radius:9px;padding:7px;background:#fff}.longList269>div.done269{background:#f5fff7;border-color:#91b49a}.longList269 span{font-size:12px;text-align:center}.longList269 p{margin:0}.longList269 b{display:block;font-size:8px}.longList269 small{display:block;font-size:6px;color:#73808b}.longList269 em{font-size:7px;font-style:normal;font-weight:1000}.missionNote269{margin-top:8px;font-size:7px;color:#697783}`;document.head.appendChild(css);setTimeout(late269,0);
})();