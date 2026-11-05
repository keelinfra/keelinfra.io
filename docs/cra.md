---
description: EU Cyber Resilience Act evidence for every release, and an alert within hours when a version
  you still support has an actively exploited vulnerability. Free GitHub Action today; hosted service
  on the waitlist.
image: assets/social-preview-release-ledger.png
subtitle: Free GitHub Action today · hosted service planned · waitlist open
---

# CRA Release Ledger

Since 11 September 2026, a manufacturer selling software in the EU has to warn ENISA within
24 hours of learning that a vulnerability in its product is being actively exploited (Cyber
Resilience Act, Article 14). From 11 December 2027, every product also needs an SBOM, a support
period of normally at least five years, and technical documentation kept for ten years.

That covers every version you still support, not only `main`. Dependabot and most scanners
watch the default branch. The 24-hour clock does not care that the vulnerable library sits in a
release you shipped two years ago.

## Free today: the GitHub Action

[release-ledger](https://github.com/keelinfra/release-ledger) is open source (Apache-2.0) and
works now:

- **record** runs when you publish a release. It signs build-provenance and SBOM attestations
  for your release files and attaches `cra-evidence.json` (support period, hashes, links) to
  the release.
- **monitor** runs daily. It checks the SBOM of every release still inside its support period
  against [OSV](https://osv.dev), and opens an issue when a vulnerability is listed as actively
  exploited by CISA KEV or ENISA's EU Vulnerability Database. The issue carries the Article 14
  checklist: early warning in 24 hours, notification in 72 hours, final report.

Agent8's release workflow uses the same building blocks: a CycloneDX SBOM per jar and signed
build-provenance and SBOM attestations on every release since 17 October 2026.

## Planned: the hosted ledger

The Action lives in your repository and tells you when a workflow fails. The planned hosted
service is for when that is not enough:

- **Every version you shipped, watched for its whole support period**, with alerts by email,
  not only a red workflow.
- **A drafted Article 14 report** when something is actively exploited: what is affected,
  since which version, and the text for ENISA's reporting platform, for you to check and send.
- **Help deciding whether you are affected**: whether the vulnerable code is reachable in your
  product.
- **Evidence kept in the EU for ten years**: SBOMs, attestations, support periods and reports,
  still there if a repository is deleted.
- **One page of support periods**: which versions are still supported, until when.

The first pilots come from the waitlist.

It will not make you compliant or replace your own assessment. It keeps the evidence and tells
you when to look.

## Join the waitlist {#waitlist}

<form class="ki-lead-form" id="waitlist-form" data-subject="CRA Release Ledger waitlist">
<label for="f-platform">Where your code and releases live</label>
<select id="f-platform" name="Platform" required>
<option value="">Choose one</option>
<option>GitHub</option>
<option>GitLab (self-managed)</option>
<option>GitLab.com</option>
<option>Bitbucket</option>
<option>Azure DevOps</option>
<option>Other</option>
</select>
<label for="f-products">What you ship into the EU</label>
<input id="f-products" name="Products" type="text" placeholder="e.g. 2 products: an on-prem server and a desktop agent">
<label for="f-versions">How many versions are still in support</label>
<input id="f-versions" name="Versions in support" type="text" placeholder="e.g. 4 (two LTS lines)">
<label for="f-worry">What worries you most about the CRA</label>
<textarea id="f-worry" name="Biggest CRA worry" rows="3" placeholder="e.g. the 24-hour reporting, SBOMs for old releases, not knowing where to start"></textarea>
<label for="f-pilot"><input id="f-pilot" name="Pilot" type="checkbox" value="yes, interested"> We would like to join a pilot.</label>
<p>Pressing the button opens an email to hello@keelinfra.io in your mail program, with these
answers filled in. Nothing is sent until you send it, and this page stores nothing. We write
when the first pilots open, and not otherwise.</p>
<button type="submit">Write the email</button>
</form>

Prefer to write it yourself? Email
<a href="mailto:hello@keelinfra.io?subject=CRA%20Release%20Ledger%20waitlist">hello@keelinfra.io</a>
<button type="button" class="ki-copy-mail" data-subject="CRA Release Ledger waitlist" hidden>Copy</button>
and say where your releases live.
