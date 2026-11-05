---
description: 'Every claim keelinfra makes, and where its proof lives: public CI runs and published test
  data you can repeat yourself.'
subtitle: Every claim we make, and where its proof lives. If you find a claim on this site that isn't
  on this page, email us and we'll either add the receipt or delete the claim.
---

# Evidence

## The ledger

| Claim | Evidence | Last verified |
| --- | --- | --- |
| **Agent8 runs Jenkins builds on Java 8, including CentOS 6.10 and OpenJ9** | [Agent8 CI](https://github.com/keelinfra/agent8/actions/workflows/ci.yml): HotSpot 8 on CentOS 6.10 and OpenJ9 8 against the current Jenkins LTS and weekly — Pipeline, Git checkout, credentials, abort and agent restart; Java 11 and 17 against the LTS | every change and weekly |
| **An older Agent8 release keeps working after a controller upgrade, within limits** | The version-skew job in [Agent8 CI](https://github.com/keelinfra/agent8/actions/workflows/ci.yml) runs the latest release against the newer weekly controller; Jenkins 2.586 refusing the build for 2.462.3 is recorded in the [README](https://github.com/keelinfra/agent8#install) | every change and weekly |
| **A controller on 2.346.3 or older does not come up cleanly on 2.580.1 after a core-only upgrade; going in steps does** | [The upgrade matrix](jenkins/upgrade-matrix/index.md): 328 Jenkins starts across 38 LTS lines with the 100 and the 300 most installed plugins, with the method and the [raw results](https://raw.githubusercontent.com/keelinfra/jenkins-upgrade-check/matrix/2.580.1/matrix.json) | 2026-10-21 |

<p class="ki-ci-badges"><a href="https://github.com/keelinfra/agent8/actions/workflows/ci.yml"><img src="https://github.com/keelinfra/agent8/actions/workflows/ci.yml/badge.svg" alt="Agent8 CI status"></a></p>

## Claims we do not make (yet)

- **An SLA.** We publish measurements, not promises. An uptime number without a public probe log is marketing.
- **SOC 2 / ISO certification.** Certifications attest to how a vendor handles your data. Your data never reaches us — the code is auditable and the tests are repeatable instead.

## Corrections

Found a claim that's wrong, stale, or missing a receipt? Email
[hello@keelinfra.io](mailto:hello@keelinfra.io?subject=Evidence%20correction) — we correct within
one business day.
