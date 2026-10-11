#!/usr/bin/env python3
"""Generate the English static page and demo script from the Chinese sources."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parent.parent
pairs=[line.split('\t',1) for line in (ROOT/'scripts/en-translations.tsv').read_text().splitlines() if '\t' in line]
# Longest phrases first prevents short labels from splitting full sentences.
def translate(source):
    for original,english in sorted(pairs,key=lambda pair:-len(pair[0])):
        source=source.replace(original,english)
    return source
html=translate((ROOT/'index.html').read_text())
html=html.replace('<html lang="zh-Hant">','<html lang="en">').replace('src="app.js?', 'src="en-app.js?')
html=html.replace('aria-current="page" href="index.html"','href="index.html"').replace('href="en.html" lang="en"','aria-current="page" href="en.html" lang="en"')
# Keep the language names recognizable in either locale.
html=html.replace('aria-label="網站語言"','aria-label="Website language"')
(ROOT/'en.html').write_text(html)
js=translate((ROOT/'app.js').read_text()).replace(".join('、')", ".join(', ')").replace('\\nVenue：','\\nVenue: ')
# English idea prompts need enough space for a short phrase.
js=js.replace('maxlength="24"','maxlength="80"').replace('Your idea (24 characters)','Your idea (80 characters)')
(ROOT/'en-app.js').write_text(js)
# The only intentionally untranslated characters in the English page are the language switch.
for name in ['en.html','en-app.js']:
    residual=re.findall(r'[^<>\n]*[\u3400-\u9fff][^<>\n]*',(ROOT/name).read_text())
    residual=[x for x in residual if x!='繁中']
    if residual: raise ValueError(f'Untranslated text in {name}: {residual}')
print('Generated en.html and en-app.js')
