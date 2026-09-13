from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json

SRC = Path('star-athletes-draco-lab/assets-source/draco-master.png.png')
OUT = Path('star-athletes-draco-lab/generated')
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert('RGBA')

# Coordinates are tied to the approved 1448x1086 Draco character asset sheet.
# Keep the master art unchanged; generated files are implementation crops only.
CROPS = {
    'body_base.png': (105, 28, 510, 492),
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
    'wing_crystal.png': (1237, 365, 1385, 510),
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

def crop_save(name, box):
    asset = im.crop(box)
    asset.save(OUT / name, optimize=True)
    return asset

assets = {name: crop_save(name, box) for name, box in CROPS.items()}

# Build a simple visual verification sheet so mobile testing can confirm
# that the Action generated the expected regions before Canvas composition.
thumb_w, thumb_h = 180, 150
items = [
    ('body', assets['body_base.png']),
    ('normal', assets['face_normal.png']),
    ('happy', assets['face_happy.png']),
    ('fight', assets['face_fight.png']),
    ('sad', assets['face_sad.png']),
    ('tired', assets['face_tired.png']),
]
preview = Image.new('RGB', (thumb_w * 3, thumb_h * 2), 'white')
for i, (_, asset) in enumerate(items):
    t = asset.convert('RGB')
    t.thumbnail((thumb_w - 12, thumb_h - 12), Image.Resampling.LANCZOS)
    x = (i % 3) * thumb_w + (thumb_w - t.width) // 2
    y = (i // 3) * thumb_h + (thumb_h - t.height) // 2
    preview.paste(t, (x, y))
preview.save(OUT / 'preview.png', optimize=True)

meta = {
    'source': str(SRC),
    'width': im.width,
    'height': im.height,
    'mode': im.mode,
    'version': '4.0.4',
    'generated': list(CROPS.keys()) + ['preview.png'],
    'note': 'Implementation crops generated from the approved Draco master sheet. No redraw.',
}
(OUT / 'source-copy.png').write_bytes(SRC.read_bytes())
(OUT / 'metadata.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(meta, ensure_ascii=False))
