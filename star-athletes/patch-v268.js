(()=>{
// v0.28.0: M3.1 memorable nemesis bloodlines. Stable per league, visible strengths/skills/weakness.
const SAVE268='star-athletes-save-v200';
const KEYS268=['power','speed','stamina','agility','tech','guts'];
const LABEL268={power:'ちから',speed:'スピード',stamina:'スタミナ',agility:'すばやさ',tech:'テクニック',guts:'こんじょう'};
const NEM268=[
 {name:'疾風のルーチェ',blood:'シルフィード血統',strong:'speed',weak:'power',skill:'風切り',note:'速さと軽業で先行する。力勝負が弱点。'},
 {name:'鉄壁のガルド',blood:'タイタン血統',strong:'power',weak:'agility',skill:'不動',note:'力と持久で押し切る。細かな切り返しが苦手。'},
 {name:'慧眼のノクス',blood:'アストラ血統',strong:'tech',weak:'stamina',skill:'先読み',note:'技術種目に強い。長期戦へ持ち込むと崩しやすい。'},
 {name:'烈火のミーティア',blood:'フェニクス血統',strong:'guts',weak:'tech',skill:'逆境',note:'終盤の勝負強さが武器。精密競技が弱点。'},
 {name:'蒼穹のセナ',blood:'アルタイル血統',strong:'agility',weak:'stamina',skill:'瞬転',note:'障害物と切り返しに強い。消耗戦には弱い。'},
 {name:'星海のクロウ',blood:'オリオン血統',strong:'stamina',weak:'agility',skill:'星巡り',note:'銀河級の長期戦型。瞬発的な機動戦が突破口。'}
];
function save268(){try{localStorage.setItem(SAVE268,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function rank268(){return Math.max(0,Math.min(NEM268.length-1,Number(S.leagueRank)||0))}
function state268(){
 if(!S.nemesis268||typeof S.nemesis268!=='object')S.nemesis268={defeated:{},seen:{}};
 if(!S.nemesis268.defeated)S.nemesis268.defeated={};if(!S.nemesis268.seen)S.nemesis268.seen={};return S.nemesis268;
}
function nem268(rank=rank268()){const n=NEM268[rank]||NEM268[0];return {...n,rank}}
function base268(rank){const base=([112,132,154,180,210,246][rank]||112);const diff=S.meetChoice225==='safe'?-18:S.meetChoice225==='challenge'?20:0;return base+diff}
function stats268(rank,n){
 const b=base268(rank),s={};KEYS268.forEach((k,i)=>s[k]=Math.round(b+((rank+1)*(i+3)%9)-4));
 s[n.strong]+=24+rank*3;s[n.weak]=Math.max(70,s[n.weak]-15-rank*2);return s;
}
function inject268(){
 if(!Array.isArray(S.rivals225)||!S.rivals225.length)return;
 const rank=Math.max(0,Math.min(NEM268.length-1,Number(S.leagueRank)||0)),n=nem268(rank),stats=stats268(rank,n);
 const r=S.rivals225[0]||{};
 r.id='nemesis268-'+rank;r.name=n.name;r.stats=stats;r.strong=n.strong;r.nemesis268=true;r.bloodline268=n.blood;r.skill268=n.skill;r.weak268=n.weak;
 state268().seen[rank]=true;save268();
}
function render268(){
 const host=document.getElementById('rival');if(!host)return;
 inject268();
 const rank=rank268(),n=nem268(rank),st=state268(),def=!!st.defeated[rank];
 let card=document.getElementById('nemesisCard268');if(!card){card=document.createElement('div');card.id='nemesisCard268';host.prepend(card)}
 card.innerHTML=`<div class="nem268 ${def?'def268':''}"><div class="nemHead268"><div><small>RIVAL BLOODLINE</small><b>⚔️ ${n.name}</b><em>${n.blood}</em></div><span>${def?'撃破済':'宿敵血統'}</span></div><div class="nemGrid268"><p><small>得意</small><b>${LABEL268[n.strong]}</b></p><p><small>SKILL</small><b>${n.skill}</b></p><p><small>弱点</small><b>${LABEL268[n.weak]}</b></p></div><div class="nemNote268">${n.note}</div><small class="nemHint268">この宿敵血統は同じリーグで再登場。得意・弱点を見て、次世代の配合と育成で対策しよう。</small></div>`;
}
function mark268(){
 const result=document.getElementById('result');if(!result)return;
 const txt=result.textContent||'';
 if(!txt.includes('総合1位')&&!txt.includes('昇格成功'))return;
 const rank=rank268(),st=state268();if(st.defeated[rank])return;
 st.defeated[rank]={season:Number(S.season)||1,at:Date.now()};save268();render268();
}
window.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab[data-v="meet"],#toMeet'))setTimeout(()=>{inject268();render268()},60);
 if(e.target?.closest?.('#run')){setTimeout(mark268,900);setTimeout(mark268,1800);setTimeout(mark268,3200)}
},true);
function late268(){if(!document.getElementById('meet')?.classList.contains('hide')){inject268();render268()}[100,300].forEach(ms=>setTimeout(()=>{if(!document.getElementById('meet')?.classList.contains('hide'))render268()},ms))}
try{const prev268=render;render=function(){const out=prev268();late268();return out}}catch(e){console.warn('render268',e)}
const css=document.createElement('style');css.textContent=`.nem268{margin:0 0 9px;padding:9px;border:2px solid #9b3e48;border-radius:12px;background:linear-gradient(145deg,#fff5f5,#fff)}.nem268.def268{border-color:#71967c;background:#f5fff7}.nemHead268{display:flex;justify-content:space-between;align-items:center;gap:8px}.nemHead268 small{display:block;font-size:6px;color:#9b3e48;font-weight:1000}.nemHead268 b{display:block;font-size:11px}.nemHead268 em{font-size:7px;font-style:normal;color:#72565a}.nemHead268>span{font-size:7px;font-weight:1000;border:1px solid #9b3e48;border-radius:999px;padding:3px 7px}.nemGrid268{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:7px 0}.nemGrid268 p{margin:0;padding:5px;border:1px solid #d8c2c5;border-radius:8px;background:#fff}.nemGrid268 small{display:block;font-size:6px;color:#806b6e}.nemGrid268 b{font-size:8px}.nemNote268{font-size:8px;font-weight:900}.nemHint268{display:block;margin-top:4px;font-size:6px;color:#76676a}`;document.head.appendChild(css);late268();
})();