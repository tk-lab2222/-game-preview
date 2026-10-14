"""Build the licensed, self-hosted fonts used by STAR ATHLETES.

Requires fontTools and Brotli. Download the TTFs listed below into --source-dir first.
This build never downloads fonts, rewrites game saves, or edits character art.
WOFF2 keeps the self-hosted Japanese font payload smaller.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'star-athletes' / 'assets' / 'fonts'
SOURCES = [
    ('noto-ui-variable.ttf', 'stellar-text-regular.woff2', 'Stellar Text', 400,
     'notosansjp/NotoSansJP%5Bwght%5D.ttf'),
    ('noto-ui-variable.ttf', 'stellar-text-semibold.woff2', 'Stellar Text', 600,
     'notosansjp/NotoSansJP%5Bwght%5D.ttf'),
    ('noto-ui-variable.ttf', 'stellar-text-bold.woff2', 'Stellar Text', 700,
     'notosansjp/NotoSansJP%5Bwght%5D.ttf'),
    ('barlow-display-semibold.ttf', 'stellar-display-semibold.woff2', 'Stellar Display', 600,
     'barlowcondensed/BarlowCondensed-SemiBold.ttf'),
]


def glyphs():
    # Ship the actual game vocabulary, ASCII, kana, and common Japanese names.
    used = set(range(0x20, 0x100)) | set(range(0x3000, 0x3100))
    shell = ROOT / 'star-athletes-v112' / 'index.html'
    used.update(map(ord, shell.read_text(encoding='utf-8')))
    refs = re.findall(r'(?:src|href)="\.\./star-athletes/([^"?]+)', shell.read_text())
    for name in set(refs):
        path = ROOT / 'star-athletes' / name
        if path.suffix in {'.js', '.css'}:
            used.update(map(ord, path.read_text(encoding='utf-8')))
    # Keep a small name vocabulary; other user-entered kanji fall back normally.
    names = '太郎花子一二三四五六七八九十山田川木林森本中村小大高橋鈴佐藤伊吉健翔優美咲愛陽悠蓮湊蒼樹莉凛桜葵結菜心陸海空光月星雪春夏秋冬真香直清和幸恵晴希遥翼学礼智仁勇信寿良慶拓啓隆裕浩輝誠舞彩夢里奈音楓萌栞琴龍竜虎獅王姫姉弟友'
    return used, used | set(map(ord, names))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-dir', type=Path, required=True)
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    vocabulary, common_names = glyphs()
    manifest = {'license': 'SIL Open Font License 1.1', 'format': 'WOFF2', 'fonts': []}
    for filename, output, family, weight, url in SOURCES:
        original = args.source_dir / filename
        font = TTFont(original, recalcTimestamp=False)
        if 'fvar' in font:
            font = instantiateVariableFont(font, {'wght': weight}, inplace=True)
        options = subset.Options()
        options.name_IDs = ['*']
        options.name_legacy = True
        options.name_languages = ['*']
        sub = subset.Subsetter(options=options)
        sub.populate(unicodes=common_names if family == 'Stellar Text' else set(range(0x20,0x100)))
        sub.subset(font)
        # Modified fonts get new internal names; retain copyright/license records.
        style = {400:'Regular',600:'SemiBold',700:'Bold'}[weight]
        for entry in font['name'].names:
            values = {1: family, 2: style, 3: f'{family}-{style}-STAR-ATHLETES',
                      4: f'{family} {style}', 6: family.replace(' ', '') + '-' + style,
                      16: family, 17: style}
            if entry.nameID in values:
                entry.string = values[entry.nameID].encode(entry.getEncoding(), errors='replace')
        font.flavor = 'woff2'
        target = OUT / output
        font.save(target)
        manifest['fonts'].append({
            'file': output, 'family': family, 'weight': weight,
            'bytes': target.stat().st_size, 'glyphs': font['maxp'].numGlyphs,
            'source': 'https://raw.githubusercontent.com/google/fonts/main/ofl/' + url,
            'source_sha256': hashlib.sha256(original.read_bytes()).hexdigest(),
            'sha256': hashlib.sha256(target.read_bytes()).hexdigest(),
        })
    for source, target in [('noto-OFL.txt', 'NotoSansJP-OFL.txt'),
                           ('barlow-OFL.txt', 'BarlowCondensed-OFL.txt')]:
        (OUT / target).write_text('\n'.join(line.rstrip() for line in (args.source_dir / source).read_text().splitlines()) + '\n')
    (OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(manifest, ensure_ascii=False))


if __name__ == '__main__':
    main()
