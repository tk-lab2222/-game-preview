from pathlib import Path
from collections import deque
from PIL import Image, ImageDraw
import json

SRC = Path('star-athletes-draco-lab/assets-source/draco-master.png.png')
OUT = Path('star-athletes-draco-lab/generated')
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert('RGBA')

CROPS = {
    'body_base.png': (55, 10, 600, 525),
    'face_normal.png': (526, 67, 694, 273),
    'face_happy.png': (697, 67, 868, 273),
    'face_fight.png': (870, 67, 1038, 273),
    'face_sad.png': (1042, 67, 1212, 273),
    'face_tired.png': (1215, 67, 1385, 273),
    'horn_normal.png': (522, 365, 655, 510),
    'horn_curl.png': (659, 365, 792, 510),
    'horn_crystal.png': (796, 365, 928, 510),
    'wing_normal.png': (956, 365, 1090, 510),
    'wing_feather.png': (1096, 365, 1230, 510),
    # v4.1.4: old crystal-wing crop ended at x=1385 and clipped the outer wing tip.
    # Keep generous transparent/background margin so the full artwork survives cleaning.
    'wing_crystal.png': (1230, 350, 1425, 520),
    'tail_normal.png': (28, 607, 158, 777),
    'tail_star.png': (164, 607, 291, 777),
    'tail_leaf.png': (300, 607, 425, 777),
    'pattern_star.png': (448, 607, 592, 777),
    'pattern_moon.png': (595, 607, 738, 777),
    'pattern_line.png': (742, 607, 887, 777),
    'accessory_ribbon.png': (929, 607, 1073, 777),
    'accessory_scarf.png': (1078, 607, 1222, 777),
    'accessory_flower.png': (1227, 607, 1385, 777),
}

REFERENCE_RECTS = {
    'horn_left': (180, 5, 325, 165),
    'horn_right': (315, 35, 425, 170),
    'wing_left': (45, 135, 270, 355),
    'wing_right': (330, 165, 475, 350),
    'tail': (55, 240, 225, 455),
}

def bg_like(px):
    r, g, b, a = px
    if a == 0:
        return True
    hi, lo = max(r, g, b), min(r, g, b)
    return (r > 228 and g > 232 and b > 232 and hi - lo < 30) or (r > 238 and g > 238 and b > 238)

def remove_edge_background(src):
    img = src.convert('RGBA')
    w, h = img.size
    pix = img.load()
    seen = bytearray(w * h)
    q = deque()
    def push(x, y):
        i = y * w + x
        if not seen[i] and bg_like(pix[x, y]):
            seen[i] = 1
            q.append((x, y))
    for x in range(w):
        push(x, 0); push(x, h - 1)
    for y in range(h):
        push(0, y); push(w - 1, y)
    while q:
        x, y = q.popleft()
        if x: push(x - 1, y)
        if x + 1 < w: push(x + 1, y)
        if y: push(x, y - 1)
        if y + 1 < h: push(x, y + 1)
    out = img.copy(); op = out.load()
    for y in range(h):
        for x in range(w):
            if seen[y * w + x]:
                r, g, b, _ = op[x, y]
                op[x, y] = (r, g, b, 0)
    return out

def keep_largest_component(src):
    img = src.convert('RGBA')
    w, h = img.size
    ap = img.getchannel('A').load()
    seen = bytearray(w * h)
    comps = []
    for y in range(h):
        for x in range(w):
            idx = y * w + x
            if seen[idx] or ap[x, y] < 20:
                continue
            q = deque([(x, y)]); seen[idx] = 1; pts = []
            while q:
                cx, cy = q.popleft(); pts.append((cx, cy))
                for nx, ny in ((cx-1,cy),(cx+1,cy),(cx,cy-1),(cx,cy+1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        ni = ny * w + nx
                        if not seen[ni] and ap[nx, ny] >= 20:
                            seen[ni] = 1; q.append((nx, ny))
            comps.append(pts)
    if not comps:
        return img
    comps.sort(key=len, reverse=True)
    keep = set(comps[0])
    out = img.copy(); op = out.load()
    for y in range(h):
        for x in range(w):
            if op[x, y][3] and (x, y) not in keep:
                r, g, b, _ = op[x, y]
                op[x, y] = (r, g, b, 0)
    return out

def trim(src, pad=12):
    bbox = src.getbbox()
    if not bbox:
        return src
    l, t, r, b = bbox
    l = max(0, l-pad); t = max(0, t-pad); r = min(src.width, r+pad); b = min(src.height, b+pad)
    return src.crop((l, t, r, b))

def make_clean(name, box):
    raw = im.crop(box)
    raw.save(OUT / name, optimize=True)
    clean = trim(keep_largest_component(remove_edge_background(raw)))
    clean_name = name.replace('.png', '_clean.png')
    clean.save(OUT / clean_name, optimize=True)
    return raw, clean, clean_name

assets = {}; clean_names = []
for name, box in CROPS.items():
    raw, clean, clean_name = make_clean(name, box)
    assets[name] = clean; clean_names.append(clean_name)

body_raw = im.crop(CROPS['body_base.png'])
body_stage = keep_largest_component(remove_edge_background(body_raw))
body_stage.save(OUT / 'body_stage.png', optimize=True)

reference_meta = {}
for part, rect in REFERENCE_RECTS.items():
    ref = body_stage.crop(rect); name = f'ref_{part}.png'; ref.save(OUT / name, optimize=True)
    l, t, r, b = rect
    reference_meta[part] = {'file': name,'rect': [l,t,r,b],'anchor': {'x':((l+r)/2)/body_stage.width,'y':((t+b)/2)/body_stage.height,'scale':(r-l)/body_stage.width,'rotation':0,'flipX':False,'flipY':False}}

thumb_w, thumb_h = 180, 170
preview_items=[('body',assets['body_base.png']),('normal',assets['face_normal.png']),('happy',assets['face_happy.png']),('horn',assets['horn_crystal.png']),('wing',assets['wing_crystal.png']),('tail',assets['tail_star.png'])]
preview=Image.new('RGB',(thumb_w*3,thumb_h*2),'#eef4fb'); d=ImageDraw.Draw(preview)
for i,(label,asset) in enumerate(preview_items):
    cell_x=(i%3)*thumb_w; cell_y=(i//3)*thumb_h
    for yy in range(cell_y,cell_y+thumb_h,16):
        for xx in range(cell_x,cell_x+thumb_w,16):
            c='#ffffff' if ((xx-cell_x)//16+(yy-cell_y)//16)%2==0 else '#dce8f3'; d.rectangle((xx,yy,xx+15,yy+15),fill=c)
    t=asset.copy(); t.thumbnail((thumb_w-18,thumb_h-35),Image.Resampling.LANCZOS)
    px=cell_x+(thumb_w-t.width)//2; py=cell_y+6; preview.paste(t,(px,py),t); d.text((cell_x+8,cell_y+thumb_h-22),label,fill='#17304d')
preview.save(OUT/'preview_clean.png',optimize=True)

meta={'source':str(SRC),'width':im.width,'height':im.height,'mode':im.mode,'version':'4.1.4','asset_revision':'414-full-crystal-wing-crop','body_stage':{'file':'body_stage.png','width':body_stage.width,'height':body_stage.height},'references':reference_meta,'generated_raw':list(CROPS.keys()),'generated_clean':clean_names+['preview_clean.png','body_stage.png']+[f'ref_{k}.png' for k in REFERENCE_RECTS],'note':'v4.1.4 expands the crystal-wing source crop to preserve the full outer wing tip; bilateral canonical references remain unchanged.'}
(OUT/'source-copy.png').write_bytes(SRC.read_bytes())
(OUT/'metadata.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(meta,ensure_ascii=False))
