from pathlib import Path
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'star-athletes' / 'assets'
APPROVED = ROOT / 'star-athletes' / 'approved'
APPROVED.mkdir(parents=True, exist_ok=True)

CONFIGS = {
    'unil': {
        'ref': (320,260),
        'poly': [(5,45),(55,10),(140,15),(210,35),(295,55),(315,135),(300,215),(230,250),(90,248),(10,210)],
        'points': [(85,95,9),(145,80,9),(225,165,10),(70,185,8),(260,200,8)],
        'text_bg': (0,55,175,999),
    },
    'grimo': {
        'ref': (320,260),
        'poly': [(5,75),(60,30),(145,35),(210,20),(310,60),(315,150),(300,225),(235,250),(70,250),(5,210)],
        'points': [(205,100,9),(260,120,8),(165,160,10),(100,100,9),(190,220,8),(265,220,8)],
        'text_bg': (0,55,185,999),
    },
    'puru': {
        'ref': (340,260),
        'poly': [(10,95),(55,50),(150,35),(235,55),(325,100),(330,185),(285,240),(70,245),(10,205)],
        'points': [(165,120,12),(100,155,9),(225,160,9),(90,205,9),(250,210,9)],
        'text_bg': (0,60,190,999),
    },
}

def scale_cfg(cfg, w, h):
    rw, rh = cfg['ref']
    sx, sy = w/rw, h/rh
    poly=[(round(x*sx),round(y*sy)) for x,y in cfg['poly']]
    points=[(round(x*sx),round(y*sy),max(2,round(r*(sx+sy)/2))) for x,y,r in cfg['points']]
    y1,y2,x1,x2=cfg['text_bg']
    text=(round(y1*sy), round(min(y2,rh)*sy), round(x1*sx), round(min(x2,rw)*sx))
    return poly, points, text

def clean(species, cfg):
    src=ASSETS/f'{species}.jpg'
    crop=np.array(Image.open(src).convert('RGB'))
    h,w=crop.shape[:2]
    poly,points,text_bg=scale_cfg(cfg,w,h)
    bgr=cv2.cvtColor(crop,cv2.COLOR_RGB2BGR)
    mask=np.full((h,w),cv2.GC_PR_BGD,np.uint8)
    edge=max(2,round(min(w,h)*.02))
    mask[:edge,:]=cv2.GC_BGD; mask[-edge:,:]=cv2.GC_BGD
    mask[:,:edge]=cv2.GC_BGD; mask[:,-edge:]=cv2.GC_BGD
    p=np.array(poly,np.int32)
    cv2.fillPoly(mask,[p],cv2.GC_PR_FGD)
    for x,y,r in points: cv2.circle(mask,(x,y),r,cv2.GC_FGD,-1)
    y1,y2,x1,x2=text_bg
    mask[y1:min(y2,h),x1:min(x2,w)]=cv2.GC_BGD
    bgd=np.zeros((1,65),np.float64); fgd=np.zeros((1,65),np.float64)
    cv2.grabCut(bgr,mask,None,bgd,fgd,8,cv2.GC_INIT_WITH_MASK)
    fg=np.where((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD),1,0).astype(np.uint8)
    num,labels,stats,cent=cv2.connectedComponentsWithStats(fg,8)
    keep=np.zeros_like(fg)
    for i in range(1,num):
        area=int(stats[i,cv2.CC_STAT_AREA]); cx,cy=cent[i]
        if area>max(12,w*h*.001) and cv2.pointPolygonTest(p,(float(cx),float(cy)),False)>=0:
            keep[labels==i]=1
    alpha=cv2.GaussianBlur((keep*255).astype(np.uint8),(3,3),0)
    ys,xs=np.where(alpha>8)
    if not len(xs): raise RuntimeError(f'{species}: foreground not found')
    pad=max(2,round(min(w,h)*.02))
    xa=max(0,xs.min()-pad); xb=min(w,xs.max()+pad+1)
    ya=max(0,ys.min()-pad); yb=min(h,ys.max()+pad+1)
    rgba=np.dstack([crop,alpha])[ya:yb,xa:xb]
    # upscale the small in-repo source for cleaner mobile rendering
    im=Image.fromarray(rgba,'RGBA')
    scale=max(1, min(3, round(420/max(im.size))))
    if scale>1: im=im.resize((im.width*scale,im.height*scale),Image.Resampling.LANCZOS)
    out=APPROVED/f'{species}-transparent.webp'
    im.save(out,'WEBP',quality=94,method=6)
    print(species, 'source', (w,h), '->', im.size)

for species,cfg in CONFIGS.items(): clean(species,cfg)
