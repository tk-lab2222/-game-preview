(()=>{
// v0.21.8: result-view styling only. No progression/event logic.
// Keep tournament result rows readable across every season without observers.
const css=document.createElement('style');
css.textContent=`
#meet #events>.evt{
  position:relative!important;
  display:grid!important;
  gap:5px!important;
  background:linear-gradient(145deg,#14233a,#0d1727)!important;
  color:#f7fbff!important;
  border:1px solid #ffffff24!important;
  border-radius:14px!important;
  padding:12px 14px!important;
  margin:0 0 9px!important;
  box-shadow:0 6px 18px #0004,inset 0 1px 0 #ffffff12!important;
  min-height:66px!important;
}
#meet #events>.evt>b{
  color:#fff!important;
  font-size:16px!important;
  line-height:1.2!important;
  letter-spacing:.01em!important;
}
#meet #events>.evt>div{
  color:#a9c3dd!important;
  font-size:10px!important;
  line-height:1.45!important;
}
#meet #events>.evt:nth-child(1){border-color:#6adfff66!important}
#meet #events>.evt:nth-child(2){border-color:#8f85ff55!important}
#meet #events>.evt:nth-child(3){border-color:#ffcf6a55!important}
#meet #events>.evt:nth-child(4){border-color:#ff6f9c55!important}
#meet #result .notice,
#meet #result .seasonResult119{
  background:linear-gradient(180deg,#101a2d,#0b1220)!important;
  color:#fff!important;
  border:1px solid #ffffff24!important;
  border-radius:16px!important;
}
#meet #result .notice b,
#meet #result .notice strong,
#meet #result .seasonResult119 b,
#meet #result .seasonResult119 strong{color:#ffd96b!important}
`;
document.head.appendChild(css);
})();