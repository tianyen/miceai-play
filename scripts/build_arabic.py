#!/usr/bin/env python3
"""Build Arabic pages and interactions from the English source and reviewed phrase map."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parent.parent
pairs=dict(line.split('\t',1) for line in (ROOT/'scripts/ar-translations.tsv').read_text().splitlines() if '\t' in line)
pattern=re.compile(r'(?<![A-Za-z0-9_])(?:'+'|'.join(re.escape(k) for k in sorted(pairs,key=len,reverse=True))+r')(?![A-Za-z0-9_])')
def translate(s):return pattern.sub(lambda m:pairs[m.group()],s)
s=translate((ROOT/'en.html').read_text())
s=s.replace('<html lang="en">','<html lang="ar" dir="rtl">')
s=s.replace('aria-current="page" href="en.html"','href="en.html"').replace('href="ar.html" lang="ar"','aria-current="page" href="ar.html" lang="ar"')
s=s.replace('src="en-app.js?', 'src="ar-app.js?').replace('src="proposal.js?', 'src="ar-proposal.js?').replace('src="game-gallery.js?', 'src="ar-gallery.js?')
s=s.replace('</head>','<link rel="stylesheet" href="arabic.css?v=ar-v1">\n</head>')
(ROOT/'ar.html').write_text(s)
s=translate((ROOT/'en-app.js').read_text()).replace("e.key==='الرئيسية'","e.key==='Home'")
# Match visual tab order in RTL while preserving standard Home/End keyboard keys.
s=s.replace("if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;","if(e.key==='ArrowLeft')n=(i+1)%tabs.length;if(e.key==='ArrowRight')n=(i-1+tabs.length)%tabs.length;")
(ROOT/'ar-app.js').write_text(s)
s=translate((ROOT/'proposal.js').read_text()).replace("document.documentElement.lang === 'en'","true").replace("locale:en?'en':'zh-Hant'","locale:'ar'")
(ROOT/'ar-proposal.js').write_text(s)
s=translate((ROOT/'game-gallery.js').read_text()).replace("document.documentElement.lang === 'en'","true")
(ROOT/'ar-gallery.js').write_text(s)
print('Generated Arabic page, demos, proposal and gallery')
