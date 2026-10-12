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
function inject268(){
 const n=nem268(),r=(S.rivals225||[]).find(x=>x.nemesis268&&x.name===n.name);
 if(!r||S.promotion233||S.planetRepresentative233)return;
 state268().seen[rank268()]=true;save268();
}
function record268({rank,season,generation,won,tier,rivals}){
 const n=nem268(rank);if(!won||tier==='safe'||!rivals.some(r=>r.nemesis268&&r.name===n.name))return false;
 const st=state268();if(st.defeated[rank])return false;
 st.defeated[rank]={season,generation,at:Date.now()};save268();window.STAR_NEMESIS302?.sync?.();return true;
}
window.STAR_NEMESIS268={catalog:NEM268,profile:nem268,record:record268};
window.addEventListener('click',e=>{if(e.target?.closest?.('.tab[data-v="meet"],#toMeet'))setTimeout(inject268,60)},true);
try{const prev268=render;render=function(){const out=prev268();if(!document.getElementById('meet')?.classList.contains('hide'))inject268();return out}}catch(e){console.warn('render268',e)}
inject268();
})();
