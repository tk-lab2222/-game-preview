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
 const rank=Math.max(0,Math.min(NEM268.length-1,Number(S.leagueRank)||0)),n=nem268(rank);
 // Nemesis is presentation/progression metadata only.
 // Never mutate fixed tournament rival identity, stats or strong stat after odds are calculated.
 const r=S.rivals225[0]||{};
 r.nemesis268=true;r.bloodline268=n.blood;r.skill268=n.skill;r.weak268=n.weak;
 state268().seen[rank]=true;save268();
}
function mark268(){
 const result=document.getElementById('result');if(!result)return;
 const txt=result.textContent||'';
 if(!txt.includes('総合1位')&&!txt.includes('昇格成功'))return;
 const rank=rank268(),st=state268();if(st.defeated[rank])return;
 st.defeated[rank]={season:Number(S.season)||1,at:Date.now()};save268();try{window.STAR_NEMESIS302?.sync?.()}catch(_){}
}
window.addEventListener('click',e=>{
 if(e.target?.closest?.('.tab[data-v="meet"],#toMeet'))setTimeout(inject268,60);
 if(e.target?.closest?.('#run')){setTimeout(mark268,900);setTimeout(mark268,1800);setTimeout(mark268,3200)}
},true);
try{const prev268=render;render=function(){const out=prev268();if(!document.getElementById('meet')?.classList.contains('hide'))inject268();return out}}catch(e){console.warn('render268',e)}
inject268();
})();