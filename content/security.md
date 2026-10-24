+++
title = "Security & verifiability"
description = "How to report vulnerabilities in keelinfra's tools, how long they get free security updates, how to check a release, how keelinfra reads the Cyber Resilience Act, and why nothing phones home."
template = "page.html"
+++

## Report a vulnerability

Email [hello@keelinfra.io](mailto:hello@keelinfra.io?subject=Security%20report) with the name of
the tool in the subject: Agent8 or jenkins-upgrade-check. Say what is affected and the release,
how to reproduce it, and what an attacker gains. Please don't open public issues for security
reports.

We answer within two business days, agree on a fix and a disclosure date with you, and credit you
in the release notes unless you prefer not to be named. Each tool's full policy:
[Agent8](https://github.com/keelinfra/agent8/blob/main/SECURITY.md) ·
[jenkins-upgrade-check](https://github.com/keelinfra/jenkins-upgrade-check/blob/main/SECURITY.md).

**Out of scope:** vulnerabilities in Jenkins, its agent (remoting) or a plugin. The Jenkins project
fixes those: report them at [jenkins.io/security](https://www.jenkins.io/security/). When a fix in
remoting affects Agent8, Agent8 ships it in a new release.

## Supported versions

Agent8 and jenkins-upgrade-check are supported until at least 31 December 2031, and security
updates are free, for everyone. Fixes ship in a new release; rerun `install.sh` to get it. When a
fix ships we publish a GitHub security advisory saying who is affected and what to do.

The Keycloak distribution was [discontinued](/keycloak/) on 24 October 2026 and gets no security
updates.

## Check a release

Every release carries `sha256sums.txt`, and the install scripts check it before they install
anything. Agent8 releases since 17 October 2026 also carry a CycloneDX SBOM and signed
build-provenance and SBOM attestations, and jenkins-upgrade-check's release workflow attaches the
same. To check a file came unmodified from the repository's public
release workflow:

```sh
gh attestation verify agent8-java8.jar --repo keelinfra/agent8
```

## Nothing phones home

Agent8 makes **no network calls to keelinfra**: no telemetry, no license checks. Like the standard
agent, it connects to your Jenkins controller; `install.sh` downloads the release from GitHub and
checks it.

## Cyber Resilience Act

The EU Cyber Resilience Act ([Regulation (EU) 2024/2847](https://eur-lex.europa.eu/eli/reg/2024/2847/oj))
puts security duties on whoever places software on the EU market. Its reporting duties apply since
11 September 2026; the rest from 11 December 2027. Open source published without commercial
activity is outside it, but selling support for it counts (recital 15). keelinfra sells services
for Agent8 and Jenkins upgrades, so we treat ourselves as the manufacturer of Agent8 and
jenkins-upgrade-check. Both are default-class products (not listed in Annex III).

- **SBOM and signed provenance with every release**, as above.
- **Free security updates** until at least 31 December 2031, with a public advisory for each fix.
- **Reporting.** An actively exploited vulnerability in our tools goes to ENISA's
  [Single Reporting Platform](https://portal.cra-srp.enisa.europa.eu) within 24 hours, then a
  notification within 72 hours and a final report within 14 days of a fix. You hear from us at the
  same time, through a GitHub security advisory. Vulnerabilities in Jenkins or remoting go to the
  Jenkins project.

This is our reading, not legal advice. If you ship software into the EU and want to know what it
means for your own release pipeline, [ask us](mailto:hello@keelinfra.io?subject=CRA%20question).
The tooling for SBOMs, attestations and exploited-vulnerability alerts is open source:
[CRA Release Ledger](/cra/).

## What we don't have

No SOC 2, no ISO 27001 badge. Those certifications attest to how a vendor handles your data — and
your data never reaches us. What we offer instead is auditable source and repeatable tests:
[the evidence ledger](/evidence/).
