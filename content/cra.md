+++
title = "CRA Release Ledger"
description = "EU Cyber Resilience Act evidence for every release, and an alert within hours when a version you still support has an actively exploited vulnerability. Free GitHub Action today; hosted service on the waitlist."
template = "waitlist.html"

[extra]
subtitle = "Free GitHub Action today · hosted service in development · waitlist open"
+++

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

## In development: the hosted ledger

The Action lives in your repository and tells you when a workflow fails. The hosted service is
for when that is not enough:

- **Every version you shipped, watched for its whole support period**, with alerts by email,
  not only a red workflow.
- **A drafted Article 14 report** when something is actively exploited: what is affected,
  since which version, and the text for ENISA's reporting platform, for you to check and send.
- **Help deciding whether you are affected**: whether the vulnerable code is reachable in your
  product.
- **Evidence kept in the EU for ten years**: SBOMs, attestations, support periods and reports,
  still there if a repository is deleted.
- **One page of support periods**: which versions are still supported, until when.

Planned price: about €49 per product per month, through GitHub Marketplace. The first pilots
come from the waitlist.

It will not make you compliant or replace your own assessment. It keeps the evidence and tells
you when to look.
