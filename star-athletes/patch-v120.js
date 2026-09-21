(()=>{
// v0.12.0: cinematic tournament presentation layered on top of v0.11.9 logic.
function phaseClass120(){
  const host=document.getElementById('events');
  const meet=document.getElementById('meet');
  if(!host||!meet)return;
  const t=host.textContent||'';
  meet.classList.toggle('phaseOpening120',t.includes('序盤'));
  meet.classList.toggle('phaseMiddle120',t.includes('中盤'));
  meet.classList.toggle('phaseFinish120',t.includes('終盤'));
  meet.classList.toggle('eventFinalMode120',!!host.querySelector('.eventFinal119'));
  meet.classList.toggle('seasonResultMode120',!!document.querySelector('.seasonResult119'));
}
function decorateMeet120(){
  const meet=document.getElementById('meet');if(!meet)return;
  const box=meet.querySelector('.box');if(!box)return;
  box.classList.add('meetArena120');
  let chrome=document.getElementById('meetChrome120');
  if(!chrome){
    chrome=document.createElement('div');chrome.id='meetChrome120';chrome.className='meetChrome120';
    chrome.innerHTML='<div class="stadiumLights120"><i></i><i></i><i></i><i></i><i></i></div><div class="crowd120"></div><div class="arenaTitle120"><small>PLANET SPORTS NETWORK</small><b>STAR ATHLETES</b><span>LIVE</span></div>';
    box.insertBefore(chrome,box.firstChild);
  }
  const h=box.querySelector('h3');if(h){h.classList.add('meetTitle120');if(h.textContent.trim()==='運動会')h.textContent='STAR TOURNAMENT';}
  phaseClass120();
}

const css=document.createElement('style');
css.textContent=`
#meet{position:relative}
.meetArena120{position:relative;overflow:hidden;border:0!important;background:radial-gradient(circle at 50% 18%,#203354 0,#10192d 42%,#080d18 100%)!important;color:#f6fbff;box-shadow:0 18px 50px #0007!important;padding:14px!important}
.meetArena120:before{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 0 32%,#ffffff0c 33% 35%,transparent 36% 64%,#ffffff09 65% 67%,transparent 68%);pointer-events:none}
.meetChrome120{position:relative;margin:-14px -14px 12px;padding:14px 14px 8px;background:linear-gradient(180deg,#070b12,#141f34);border-bottom:1px solid #ffffff24;overflow:hidden}
.stadiumLights120{display:flex;justify-content:space-between;gap:8px;margin-bottom:9px}.stadiumLights120 i{width:18%;height:6px;border-radius:999px;background:linear-gradient(90deg,#4dd8ff,#fff,#a980ff);box-shadow:0 0 18px #69d8ff,0 0 36px #7e6cff66;animation:stadPulse120 1.8s ease-in-out infinite alternate}.stadiumLights120 i:nth-child(2){animation-delay:.2s}.stadiumLights120 i:nth-child(3){animation-delay:.4s}.stadiumLights120 i:nth-child(4){animation-delay:.6s}.stadiumLights120 i:nth-child(5){animation-delay:.8s}
@keyframes stadPulse120{to{opacity:.55;transform:scaleX(.88)}}
.arenaTitle120{display:flex;align-items:end;gap:8px;position:relative;z-index:2}.arenaTitle120 small{font-size:7px;letter-spacing:.16em;opacity:.55}.arenaTitle120 b{font-size:17px;letter-spacing:.06em}.arenaTitle120 span{margin-left:auto;background:#ff355f;color:#fff;border-radius:4px;padding:2px 5px;font-size:8px;font-weight:1000;box-shadow:0 0 12px #ff355f88;animation:liveBlink120 1s steps(2,end) infinite}@keyframes liveBlink120{50%{opacity:.55}}
.crowd120{position:absolute;left:0;right:0;bottom:-2px;height:30px;opacity:.2;background-image:radial-gradient(circle,#d7eaff 1.2px,transparent 1.3px);background-size:8px 8px}
.meetTitle120{position:relative;z-index:2;margin:0 0 8px!important;font-size:10px!important;letter-spacing:.18em;color:#8bcfff;text-transform:uppercase}
#meet #events,#meet #result,#meet #rival,#meet p,#meet #run{position:relative;z-index:2}
#meet .phase119,#meet .eventFinal119{border:1px solid #ffffff26!important;border-radius:18px!important;background:linear-gradient(180deg,#17243a,#0e1626)!important;color:#fff!important;box-shadow:0 12px 28px #0006,inset 0 1px 0 #ffffff1f!important;padding:14px!important;min-height:280px;overflow:hidden}
#meet .phase119:before,#meet .eventFinal119:before{content:'';position:absolute;width:190px;height:190px;border-radius:50%;right:-58px;top:-70px;background:radial-gradient(circle,#50d7ff35,transparent 68%);pointer-events:none}
#meet .phaseTop119{display:grid!important;grid-template-columns:auto 1fr;gap:4px 10px;align-items:center;text-align:left!important}.phaseTop119>span{grid-row:1/3;background:#0a0f19!important;border:1px solid #64d9ff!important;color:#b9eeff!important;border-radius:10px!important;padding:7px 9px!important;font-size:10px!important;box-shadow:0 0 16px #4edbff33}.phaseTop119>b{font-size:18px!important;letter-spacing:.02em}.phaseTop119>small{font-size:8px!important;opacity:.6}
#meet .phase119 .avatar,#meet .eventFinal119 .avatar{height:130px!important;max-width:230px;margin:12px auto 6px!important;background:transparent!important;border:0!important;filter:drop-shadow(0 14px 18px #0009)}
#meet .phaseMsg119{font-size:14px!important;font-weight:1000!important;letter-spacing:.03em;background:linear-gradient(90deg,transparent,#ffffff14,transparent)!important;color:#fff!important;padding:10px!important;margin:8px 0 10px!important;border-radius:0!important;text-shadow:0 2px 8px #000}
#meet .phaseCheer119{width:100%;font-size:14px!important;padding:12px 10px!important;border:1px solid #8be7ff!important;background:linear-gradient(180deg,#52d7ff,#1681c0)!important;color:#03101a!important;box-shadow:0 0 20px #39cfff55,0 4px 0 #082b40!important}
#meet .phaseTimer119{height:7px!important;background:#060b13!important;border:1px solid #ffffff2d!important;border-radius:999px!important;overflow:hidden!important;margin-top:10px!important}.phaseTimer119 i{background:linear-gradient(90deg,#4ff4ff,#ffe66b,#ff5f87)!important;box-shadow:0 0 12px #58e8ff!important}
#meet .phaseResult119{display:grid!important;grid-template-columns:1.2fr .9fr .9fr;gap:6px;align-items:end;margin:8px 0 12px;padding:10px;background:#09111f;border:1px solid #ffffff20;border-radius:14px}.phaseResult119 strong{font-size:36px!important;line-height:1;color:#fff}.phaseResult119 span,.phaseResult119 em{font-style:normal!important;font-weight:1000}.phaseResult119 span{color:#7ce9ff}.phaseResult119 em{color:#ffd96b;font-size:10px}
#meet .phaseTrack119{height:9px!important;background:#060a11!important;border:1px solid #ffffff22!important;border-radius:999px!important;overflow:hidden}.phaseTrack119 i{background:linear-gradient(90deg,#3fd6ff,#8b7cff,#ff5f89)!important;box-shadow:0 0 12px #64d6ff88!important}
#meet.phaseOpening120 .phase119{box-shadow:0 12px 28px #0006,inset 0 0 35px #35b8ff1f!important}
#meet.phaseMiddle120 .phase119{box-shadow:0 12px 28px #0006,inset 0 0 35px #ffb74a24!important}.phaseMiddle120 .phaseTop119>span{border-color:#ffc45f!important;color:#ffe0a2!important;box-shadow:0 0 16px #ffb34044!important}
#meet.phaseFinish120 .phase119{box-shadow:0 12px 28px #0006,inset 0 0 42px #ff4f8729!important}.phaseFinish120 .phaseTop119>span{border-color:#ff5d91!important;color:#ffc1d5!important;box-shadow:0 0 16px #ff4d8444!important}
#meet .eventFinal119{text-align:center;animation:eventPop120 .36s cubic-bezier(.2,.9,.2,1)}@keyframes eventPop120{from{transform:scale(.94);opacity:.2}to{transform:scale(1);opacity:1}}#meet .eventFinal119>strong{display:inline-block;font-size:42px!important;line-height:1;margin:3px 0 8px;background:linear-gradient(#fff,#ffd765);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 2px 8px #ffcb4d55)}
#meet .phaseMini119{display:grid!important;grid-template-columns:repeat(3,1fr);gap:6px}.phaseMini119 span{display:flex!important;flex-direction:column;align-items:center;background:#0a1220;border:1px solid #ffffff1f;border-radius:10px;padding:7px 4px;font-size:8px}.phaseMini119 b{font-size:13px}.phaseMini119 em{font-style:normal;color:#6ee8ff;font-weight:1000}.eventPts119{margin-top:9px;padding:8px;border-radius:10px;background:#ffffff10;font-size:10px}.eventPts119 b{color:#ffd86d;font-size:14px}
#meet .seasonResult119{background:linear-gradient(180deg,#101a2d,#0b1220)!important;color:#fff!important;border:1px solid #ffffff24!important;border-radius:16px!important;box-shadow:0 10px 28px #0006!important;text-align:center!important;padding:14px!important}.seasonResult119>strong{font-size:28px;color:#ffd96b;text-shadow:0 0 18px #ffcf5c44}.seasonResult119 hr{border:0;border-top:1px solid #ffffff22}
#meet #run,#meet #next225,#meet #annualNext233{width:100%;font-size:14px!important;padding:12px!important;border-radius:12px!important;letter-spacing:.04em;font-weight:1000}#meet #run{background:linear-gradient(180deg,#4cf0b8,#169e75)!important;color:#03130d!important;border:1px solid #85ffd6!important;box-shadow:0 0 18px #34e7ad55,0 4px 0 #0b5d45!important}#meet #next225,#meet #annualNext233{background:linear-gradient(180deg,#ffe06b,#d89b18)!important;color:#241700!important;border:1px solid #fff09c!important;box-shadow:0 0 16px #ffca4855,0 4px 0 #79540d!important}
@media(max-width:480px){.meetArena120{margin-left:-2px;margin-right:-2px}.phaseResult119 strong{font-size:31px!important}.arenaTitle120 b{font-size:15px}}
`;
document.head.appendChild(css);

const mo=new MutationObserver(()=>{decorateMeet120();phaseClass120()});
mo.observe(document.body,{childList:true,subtree:true,characterData:true});
setTimeout(decorateMeet120,0);
})();