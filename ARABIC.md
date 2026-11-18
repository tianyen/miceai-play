# Arabic edition

Added 2026-11-19. `ar.html` uses Modern Standard Arabic and `dir="rtl"`, retaining the existing dark visual design. All three languages link to one another and preserve the current section hash when switching. The duplicate hero wordmark has been removed in all languages; the header identity stays at the top left.

## Source and rebuild

1. Edit Chinese source `index.html` / `app.js` and English phrases in `scripts/en-translations.tsv` as before.
2. Run `python3 scripts/build_english.py`.
3. Update English-to-Arabic phrases in `scripts/ar-translations.tsv`, then run `python3 scripts/build_arabic.py`.

Generated Arabic files: `ar.html`, `ar-app.js`, `ar-proposal.js`, `ar-gallery.js`. Do not edit these output files directly. Arabic layout rules are in `arabic.css`; shared layout remains in `styles.css`.

Arabic covers navigation, accessible labels, section content, game previews, interactive demos, dynamic scene tabs, reward journeys, the three-step proposal form, email-request text, and submission feedback. Brand names and email addresses remain in their original form. Budget currency remains TWD; the form explicitly says Taiwan dollars. No backend or currency conversion was added. API requests set `locale: ar`; email remains the configured fallback until an endpoint is supplied.

## Verification

Serve the repository on port 8766. Run `scripts/test-arabic.cjs` with Playwright available, plus the existing gallery and proposal tests. Arabic checks cover five viewport widths, RTL direction, language selection, removed hero wordmark, dynamic content, quiz/poll/wall, reward dialog, Arabic email content and locale. Browser-native validation messages follow the visitor's browser locale. Images are shared concept assets and may contain Latin brand labels.
