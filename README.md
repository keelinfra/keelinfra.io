# keelinfra.io

Source for [keelinfra.io](https://keelinfra.io) — built with [Zola](https://www.getzola.org/).

```bash
zola build   # -> public/
zola serve   # local preview at localhost:1111
```

The Keycloak distribution was discontinued on 2026-10-24. Its old pages (docs, pricing,
compare, blog posts) are aliases of `content/keycloak.md`, the notice page, so links in the
wild still land somewhere; `tests/inbound-urls.txt` keeps them checked.

Deploys automatically on push to `main` via GitHub Actions → GitHub Pages.
