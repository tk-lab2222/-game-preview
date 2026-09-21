(()=>{
// v0.24.3 Alpha Lab character/genetics layer that works with current finished-art renderer.
const SAVE243='star-athletes-save-v200';
const COLORS243=['赤','青','緑','白','黒','黄'];
const PAT243=['なし','縞','斑点','炎','雷','星'];
const EXP243=['neutral','happy','competitive','sad','tired','excited','proud'];
const EXPL243={neutral:'🙂',happy:'😊',competitive:'🔥',sad:'😢',tired:'😮‍💨',excited:'🤩',proud:'😤'};
const PARTS243={draco:['horn','wing','tail','muzzle_mark'],unil:['horn','mane','ear','tail'],grimo:['beak','wing','chest_feather','crest'],puru:['ear_blob','tail_blob','transparency_pattern','inner_core']};
function shinyLabel243(m){
 const names={draco:'エメラルド系',unil:'ミント系',grimo:'パープル系',puru:'ピンク系'};
 return m?.shiny?`✨色違い（${names[m.species]||'特殊色'}）`:'';
}
function persist243(){try{localStorage.setItem(SAVE243,JSON.stringify({savedAt:Date.now(),S}))}catch(_){}}
function all243(){const a=[],seen=new Set();for(const k of ['starters','nest','lineage','released','cands','foster'])for(const m of(S[k]||[]))if(m&&!seen.has(m.id)){seen.add(m.id);a.push(m)}if(S.egg&&!seen.has(S.egg.id))a.push(S.egg);return a}
function mut243(m){const n=Number(m?.hidden233?.mutation);if(!Number.isFinite(n))return 0;return [0,0,0,1,2,3,4,5][Math.max(0,Math.min(7,Math.round(n)))]}
function randomPart243(k){return `${k}_${1+Math.floor(Math.random()*4)}`}
function ensure243(m){if(!m)return;m.visual=m.visual||{};m.visual.color=m.visual.color||COLORS243[Math.floor(Math.random()*COLORS243.length)];m.visual.pattern=m.visual.pattern||PAT243[Math.floor(Math.random()*PAT243.length)];if(!m.expression243)m.expression243='neutral';if(!m.expressionTendency243)m.expressionTendency243=m.expression243;if(!m.parts243){m.parts243={};for(const k of(PARTS243[m.species]||[]))m.parts243[k]=randomPart243(k);if(m.visual.part){const first=(PARTS243[m.species]||[])[0];if(first)m.parts243[first]=m.visual.part}}if(m.visual.color==='金'&&!m.rareVisual243)m.rareVisual243='gold';if(m.shiny&&!m.rareVisual243)m.rareVisual243='gold'}
function pickCat243(a,b,pool,mutationChance){const r=Math.random();if(r<.42)return a;if(r<.84)return b;if(r<1-mutationChance){const x=pool.filter(v=>v!==a&&v!==b);return x.length?x[Math.floor(Math.random()*x.length)]:(Math.random()<.5?a:b)}const x=pool.filter(v=>v!==a&&v!==b);return x.length?x[Math.floor(Math.random()*x.length)]:(Math.random()<.5?a:b)}
function parentPart243(p,sp,k){if(!p||p.species!==sp)return null;ensure243(p);return p.parts243?.[k]||null}
try{const oldBaby243=baby;baby=function(a,b){ensure243(a);ensure243(b);const c=oldBaby243(a,b);ensure243(c);const boost=Math.min(.07,(mut243(a)+mut243(b))*.006),mutationChance=.05+boost;c.visual.color=pickCat243(a.visual.color,b.visual.color,COLORS243,mutationChance);c.visual.pattern=pickCat243(a.visual.pattern,b.visual.pattern,PAT243,mutationChance);c.parts243={};for(const k of(PARTS243[c.species]||[])){const pa=parentPart243(a,c.species,k),pb=parentPart243(b,c.species,k);if(pa&&pb)c.parts243[k]=pickCat243(pa,pb,[pa,pb,randomPart243(k),randomPart243(k)],mutationChance);else c.parts243[k]=pa||pb||randomPart243(k)}const er=Math.random();c.expressionTendency243=er<.42?(a.expressionTendency243||'neutral'):er<.84?(b.expressionTendency243||'neutral'):er<.95?'neutral':EXP243[Math.floor(Math.random()*EXP243.length)];c.expression243='neutral';const rareRoll=Math.random();if(rareRoll<mutationChance*.12){c.visual.color='プリズム';c.rareVisual243='prism'}else if(rareRoll<mutationChance*.38){c.visual.color='金';c.rareVisual243='gold'}else if(Math.random()<mutationChance*.22){c.rareVisual243='mutation'}c.visualGenetics243={father:42,mother:42,middle:Math.max(0,Math.round((1-.84-mutationChance)*100)),mutation:Math.round(mutationChance*100)};return c}}catch(e){console.warn('baby243',e)}
)();