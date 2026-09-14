from pathlib import Path
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
APPROVED = ROOT / 'star-athletes' / 'approved'

CONFIGS = {
    'unil-transparent.webp': {
        'poly': [(5,45),(55,10),(140,15),(210,35),(295,55),(315,135),(300,215),(230,250),(90,248),(10,210)],
        'points': [(85,95,9),(145,80,9),(225,165,10),(70,185,8),(260,200,8)],
        'text_bg': (0,55,175,999),
        'expected': (320,260),
    },
    'grimo-transparent.webp': {
        'poly': [(5,75),(60,30),(145,35),(210,20),(310,60),(315,150),(300,225),(235,250),(70,250),(5,210)],
        'points': [(205,100,9),(260,120,8),(165,160,10),(100,100,9),(190,220,8),(265,220,8)],
        'text_bg': (0,55,185,999),
        'expected': (320,260),
    },
    'puru-transparent.webp': {
        'poly': [(10,95),(55,50),(150,35),(235,55),(325,100),(330,185),(285,240),(70,245),(10,205)],
        'points': [(165,120,12),(100,155,9),(225,160,9),(90,205,9),(250,210,9)],
        'text_bg': (0,60,190,999),
        'expected': (340,260),
    },
}


def clean(path: Path, cfg: dict) -> None:
    crop = np.array(Image.open(path).convert('RGB'))
    h, w = crop.shape[:2]
    if (w, h) != cfg['expected']:
        raise RuntimeError(f'{path.name}: unexpected size {(w,h)}, expected {cfg["expected"]}')

    bgr = cv2.cvtColor(crop, cv2.COLOR_RGB2BGR)
    mask = np.full((h, w), cv2.GC_PR_BGD, np.uint8)
    mask[:6, :] = cv2.GC_BGD
    mask[-6:, :] = cv2.GC_BGD
    mask[:, :6] = cv2.GC_BGD
    mask[:, -6:] = cv2.GC_BGD

    poly = np.array(cfg['poly'], np.int32)
    cv2.fillPoly(mask, [poly], cv2.GC_PR_FGD)
    for x, y, r in cfg['points']:
        cv2.circle(mask, (x, y), r, cv2.GC_FGD, -1)

    y1, y2, x1, x2 = cfg['text_bg']
    mask[y1:min(y2, h), x1:min(x2, w)] = cv2.GC_BGD

    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    cv2.grabCut(bgr, mask, None, bgd, fgd, 10, cv2.GC_INIT_WITH_MASK)

    fg = np.where(
        (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 1, 0
    ).astype(np.uint8)

    num, labels, stats, cent = cv2.connectedComponentsWithStats(fg, 8)
    keep = np.zeros_like(fg)
    for i in range(1, num):
        area = int(stats[i, cv2.CC_STAT_AREA])
        cx, cy = cent[i]
        if area > 50 and cv2.pointPolygonTest(poly, (float(cx), float(cy)), False) >= 0:
            keep[labels == i] = 1

    alpha = cv2.GaussianBlur((keep * 255).astype(np.uint8), (3, 3), 0)
    rgba = np.dstack([crop, alpha])
    ys, xs = np.where(alpha > 8)
    if not len(xs):
        raise RuntimeError(f'{path.name}: foreground not found')

    pad = 4
    xa = max(0, xs.min() - pad)
    xb = min(w, xs.max() + pad + 1)
    ya = max(0, ys.min() - pad)
    yb = min(h, ys.max() + pad + 1)
    rgba = rgba[ya:yb, xa:xb]

    Image.fromarray(rgba, 'RGBA').save(path, 'WEBP', lossless=True, method=6)
    print(path.name, '->', rgba.shape[1], 'x', rgba.shape[0])


for filename, cfg in CONFIGS.items():
    clean(APPROVED / filename, cfg)
