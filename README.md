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

## For search engines and AI assistants

- `static/llms.txt` is a hand-written summary for AI assistants and agents ([llmstxt.org](https://llmstxt.org/)).
  It repeats facts from the pages (versions, platforms, the matrix result), so update it with them.
- Pages with `noindex = true` under `[extra]` get a robots noindex tag and stay out of `sitemap.xml`
  (`templates/sitemap.xml`). The Keycloak notice is one.
- After each deploy, the `indexnow` job submits the sitemap URLs to [IndexNow](https://www.indexnow.org/)
  (Bing, Yandex, Naver, Seznam). Its key file is `static/6f2a774ae1c556a1b212de7d2919f81e.txt`.
  Google reads `sitemap.xml` instead; Search Console is where to ask it to recrawl.
