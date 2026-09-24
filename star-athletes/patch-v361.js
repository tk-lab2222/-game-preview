(()=>{'use strict';
// v361 compatibility bridge only. Canonical logic lives in STAR_GRADE_ENGINE362.
if(window.STAR_GRADE_FIX361)return;
function expected(m){try{return Number(window.STAR_GRADE_ENGINE362?.athleteGrade?.(m)||window.STAR_GRADE340?.athleteGrade?.(m)||1)}catch(_){return 1}}
function sync(){try{window.STAR_GRADE_ENGINE362?.sync?.()}catch(_){}}
window.STAR_GRADE_FIX361={expected,sync};
})();