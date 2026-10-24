+++
title = "The Keycloak distribution is discontinued"
description = "keelinfra's self-hosted Keycloak distribution was discontinued on 24 October 2026: no new releases, no security updates, no support and no subscriptions."
template = "page.html"
aliases = [
  "/pricing/",
  "/keycloak/pricing/",
  "/upgrade-drill/",
  "/compare/",
  "/compare/managed-keycloak/",
  "/compare/phase-two-alternative/",
  "/compare/skycloak-alternative/",
  "/docs/keycloak/",
  "/docs/keycloak/configuration/",
  "/docs/keycloak/cve-policy/",
  "/docs/keycloak/deployment/",
  "/docs/keycloak/example-ha-3node/",
  "/docs/keycloak/example-single-node/",
  "/docs/keycloak/install-ha/",
  "/docs/keycloak/install-single-node/",
  "/docs/keycloak/requirements/",
  "/docs/keycloak/security/",
  "/docs/keycloak/upgrades/",
  "/docs/keycloak/verify/",
  "/blog/air-gapped-keycloak-delete-the-default-route/",
  "/blog/emudhra-keycloak-java-trust-store/",
  "/blog/keycloak-26-7-3-cve-triage/",
  "/blog/keycloak-critical-fix-no-release/",
  "/blog/zero-downtime-keycloak-upgrades/",
]
[extra]
subtitle = "Discontinued on 24 October 2026"
+++

keelinfra's self-hosted Keycloak distribution
([keelinfra/keycloak](https://github.com/keelinfra/keycloak)) was discontinued on
24 October 2026. It gets no new releases and no security updates. The earlier commitment to
support it until at least 31 December 2031 is withdrawn. No subscription or support contract was
ever sold for it.

## If you run it

Move to a maintained Keycloak: the upstream [Keycloak](https://www.keycloak.org/) project, with
its container image or the Keycloak Operator, or a commercially supported build such as the Red
Hat build of Keycloak. The playbooks stay on GitHub, read-only, under Apache-2.0, if you want to
keep them going yourself.

## Services

keelinfra no longer offers Keycloak health checks, upgrade drills, migrations or subscriptions.
The pages that described them, the Keycloak docs and the Keycloak blog posts have been removed;
their old addresses lead here.

keelinfra now works on Jenkins: [Agent8](/jenkins/), which keeps build hosts on Java 8, 11 or 17
connected to a current controller, and the [upgrade matrix](/jenkins/upgrade-matrix/) for old
controllers.
