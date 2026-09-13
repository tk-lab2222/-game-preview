from pathlib import Path
from PIL import Image
import json

SRC = Path('star-athletes-draco-lab/assets-source/draco-master.png.png')
OUT = Path('star-athletes-draco-lab/generated')
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert('RGBA')
meta = {
    'source': str(SRC),
    'width': im.width,
    'height': im.height,
    'mode': im.mode,
}
(OUT / 'source-copy.png').write_bytes(SRC.read_bytes())
(OUT / 'metadata.json').write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
print(meta)
