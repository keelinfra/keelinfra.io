# keelinfra.io

Source for [keelinfra.io](https://keelinfra.io), built with [MkDocs NG](https://github.com/mkdocs-ng/mkdocs)
and the [Sumi](https://sumi.mkdocs-ng.org/) theme.

```bash
pip install -r requirements.txt
mkdocs serve                        # local preview at localhost:8000
mkdocs build --strict               # -> site/
python3 scripts/check_site.py site  # links, anchors, inbound URLs, external requests
```

- Pages are Markdown in `docs/`. The home, Agent8 and pricing pages are Sumi landing pages:
  their sections are front matter (`hero:`, `sections:`), the body is the Markdown copy for
  readers and agents.
- `docs/assets/keelinfra.css` sets the brand (IBM Plex, navy and amber) on top of Sumi;
  `docs/assets/keelinfra.js` adds the mail fallbacks and the lead forms.
- `overrides/main.html` keeps the search-result titles, Google Analytics with lead events,
  and the schema.org data. `hooks/keelinfra.py` writes the alias pages and `/blog/atom.xml`.

The Keycloak distribution was discontinued on 2026-10-24. Its old pages (docs, pricing,
compare, blog posts) are `aliases` of `docs/keycloak.md`, the notice page, so links in the
wild still land somewhere; `tests/inbound-urls.txt` keeps them checked.

Pull requests run the build and every check. Pushes to `main` deploy via GitHub Actions →
GitHub Pages.
