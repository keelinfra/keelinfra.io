"""Build steps the site needs beyond the theme.

- `aliases:` in a page's front matter: old URLs (the discontinued Keycloak
  pages, moved pages) get a small page that redirects to it and carries the
  #fragment over, so links in READMEs and sent emails keep working.
- The blog feed keeps its old address, /blog/atom.xml, next to Sumi's
  /blog/feed.xml.
"""
from __future__ import annotations

import html
import json
import os
import shutil

_aliases: dict[str, str] = {}

ALIAS_PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved — keelinfra</title>
<link rel="canonical" href="{url}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url={url}">
<script>
  // Moved pages are linked from READMEs and sent emails with #fragments
  // (/pricing/#services). A meta refresh drops the fragment; carry it over.
  location.replace({url_js} + location.hash);
</script>
</head>
<body>
<p>This page moved to <a href="{url}">{url}</a>.</p>
</body>
</html>
"""


def on_pre_build(config, **kwargs):
    _aliases.clear()


def on_page_markdown(markdown, page, config, files, **kwargs):
    for alias in page.meta.get('aliases') or []:
        _aliases[alias] = config.site_url.rstrip('/') + '/' + page.url
    return markdown


def on_post_build(config, **kwargs):
    site = config.site_dir
    for alias, url in _aliases.items():
        path = os.path.join(site, alias.strip('/'), 'index.html')
        if os.path.exists(path):
            raise SystemExit(f'alias {alias} would overwrite a page')
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(ALIAS_PAGE.format(url=html.escape(url), url_js=json.dumps(url)))
    feed = os.path.join(site, 'blog', 'feed.xml')
    if os.path.exists(feed):
        shutil.copyfile(feed, os.path.join(site, 'blog', 'atom.xml'))
