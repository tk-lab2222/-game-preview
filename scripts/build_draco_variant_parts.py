from pathlib import Path
from PIL import Image
import json

OUT = Path('star-athletes-draco-lab/generated')


def trim_alpha(im, pad=4):
    box = im.getbbox()
    if not box:
        return im
    l,t,r,b = box
    return im.crop((max(0,l-pad), max(0,t-pad), min(im.width,r+pad), min(im.height,b+pad)))

# Split the two-horn presentation samples into independent screen-left/right assets.
# The source cards also contain a little head/hair; tight crops keep the horn root context
# while avoiding drawing the whole presentation sample twice.
for variant in ('curl','crystal'):
    p = OUT / f'horn_{variant}_clean.png'
    im = Image.open(p).convert('RGBA')
    w,h = im.size
    left = trim_alpha(im.crop((8, 0, int(w*0.62), int(h*0.78))))
    right = trim_alpha(im.crop((int(w*0.58), 0, w, int(h*0.72))))
    left.save(OUT / f'horn_{variant}_left.png', optimize=True)
    right.save(OUT / f'horn_{variant}_right.png', optimize=True)

# Canonical attachment presets. Values are relative to the already pixel-exact slot anchors.
# dx/dy are fractions of the 545x515 body stage. scale multiplies the slot-fit scale.
# left/right are SCREEN left/right.
presets = {
  'horn_left': {
    'curl':    {'dx': -0.010, 'dy': -0.012, 'scale': 0.94, 'rotation': -4, 'flipX': False, 'flipY': False},
    'crystal': {'dx': -0.008, 'dy': -0.014, 'scale': 0.96, 'rotation': -2, 'flipX': False, 'flipY': False}
  },
  'horn_right': {
    'curl':    {'dx':  0.006, 'dy': -0.010, 'scale': 0.90, 'rotation':  5, 'flipX': False, 'flipY': False},
    'crystal': {'dx':  0.006, 'dy': -0.012, 'scale': 0.93, 'rotation':  3, 'flipX': False, 'flipY': False}
  },
  'wing_left': {
    'feather': {'dx': -0.006, 'dy':  0.004, 'scale': 1.00, 'rotation': -8, 'flipX': True,  'flipY': False},
    'crystal': {'dx': -0.004, 'dy':  0.002, 'scale': 0.98, 'rotation': -7, 'flipX': True,  'flipY': False}
  },
  'wing_right': {
    'feather': {'dx':  0.004, 'dy':  0.000, 'scale': 0.98, 'rotation':  7, 'flipX': False, 'flipY': False},
    'crystal': {'dx':  0.004, 'dy': -0.002, 'scale': 0.96, 'rotation':  6, 'flipX': False, 'flipY': False}
  },
  'tail': {
    'star': {'dx': -0.008, 'dy': 0.006, 'scale': 1.00, 'rotation': -6, 'flipX': True, 'flipY': False},
    'leaf': {'dx': -0.006, 'dy': 0.010, 'scale': 0.97, 'rotation': -4, 'flipX': True, 'flipY': False}
  }
}
(OUT / 'variant_presets.json').write_text(json.dumps(presets, ensure_ascii=False, indent=2), encoding='utf-8')
print('generated split horn assets + variant_presets.json')
