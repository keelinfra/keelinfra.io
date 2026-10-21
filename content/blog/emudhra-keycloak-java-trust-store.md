+++
title = "The eMudhra keys leaked. Your Keycloak's JDK may still trust them."
date = 2026-10-21
description = "Eight eMudhra intermediate CA keys can be recovered from their certificates. Browsers blocked them within hours; a Keycloak JVM keeps trusting them until the roots leave its own trust store. We tested twelve public test chains against the JDK on Rocky 9, AlmaLinux 9, Ubuntu 24.04 and the official image: 6 or 12 accepted, depending on the node. How to check yours in one command, and how to fix it."
[extra]
seo_title = "eMudhra CA compromise: check your Keycloak JDK trust store"
seo_description = "Keycloak's JDK trusts the compromised eMudhra intermediates until emSign ECC Root CA - G3 leaves cacerts. One command to check, and the fix per OS."
og_image = "/assets/social-preview-keycloak.png"
+++

On 2026-10-17 it became public that the private keys of eight eMudhra intermediate CAs can be
recovered from the certificates themselves
([disclosure](https://emudhra.we-have-a-problem.com/)), so anyone can sign certificates with
them. Chrome and Firefox blocked them the same day, Apple on the 19th,
Microsoft on the 20th.

Keycloak is not a browser. When it calls an identity provider, an LDAP server, an SMTP relay
or a webhook over TLS, it trusts what its JDK trusts, and Java does not check revocation by
default. The intermediates are revoked; that does not reach a JVM. What does is removing the
roots they chain to from the JDK's trust store: **emSign ECC Root CA - G3**, and **AAA
Certificate Services** for the cross-signed copies.

## What we measured

The disclosure publishes the twelve certificate chains its test hosts serve. We validated each
with the JDK's default trust manager, the one Keycloak uses for outgoing TLS, on fully updated
systems on 2026-10-21:

| Where Keycloak runs | Chains accepted |
|---|---|
| `quay.io/keycloak/keycloak:26.8.1` (official image) | 6 of 12 |
| Rocky Linux 9, AlmaLinux 9, OpenJDK 21 from the OS | 6 of 12 |
| Ubuntu 24.04, JDK installed before the 2026-10-20 ca-certificates update | **12 of 12** |
| Ubuntu 24.04, JDK installed after that update | 0 of 12 |

The first two rows have one cause. The official image is built on Red Hat's UBI 9, and Red Hat
has not shipped a fixed ca-certificates package yet
([RHSB-2026-012](https://access.redhat.com/security/vulnerabilities/RHSB-2026-012) gives a
manual workaround). A rebuild of the image would not change the result until it has.
Upstream, [keycloak/keycloak#54197](https://github.com/keycloak/keycloak/issues/54197) was
opened on 2026-10-20 with a community PR linked; there is no maintainer reply yet.

The third row surprised us. OpenJDK's
[advisory](https://openjdk.org/groups/vulnerability/advisories/2026-10-21) says that for a JDK
packaged by your OS, updating the OS certificates is sufficient. On Ubuntu it was not, for a
JDK installed before the update. The update removes the roots from `/etc/ssl/certs`, but the
JDK's copy, `/etc/ssl/certs/java/cacerts`, kept all 43 roots the update removed: 146 entries
against 120 in the system store. Running `update-ca-certificates --fresh` did not change it.
We saw this going from the package Ubuntu 24.04 shipped with to the update; we have not tested
every package version in between, so check your own servers rather than assume.

## Check yours

Run this wherever Keycloak's JVM runs (on the host, or with `docker exec` in the container).
Any output means it still trusts a compromised chain:

```bash
keytool -list -cacerts -storepass changeit -v 2>/dev/null \
  | grep -E '^Owner: .*(emSign ECC Root CA - G3|AAA Certificate Services)'
```

For the official image, without starting it:

```bash
docker run --rm --entrypoint keytool quay.io/keycloak/keycloak:26.8.1 \
  -list -cacerts -storepass changeit -v | grep -E '^Owner: .*emSign ECC Root CA - G3'
```

If you set `truststore-paths`, Keycloak trusts those files as well; check them the same way.

## Fix it

**RHEL, Rocky Linux, AlmaLinux (and images built on them):** block the root, as Red Hat's
bulletin describes, then restart Keycloak:

```bash
sudo trust extract --overwrite --format=pem-bundle \
  --filter='pkcs11:object=emSign%20ECC%20Root%20CA%20-%20G3;type=cert' \
  /etc/pki/ca-trust/source/blocklist/emSign_ECC_Root_CA_-_G3.pem
sudo update-ca-trust
```

**Ubuntu and Debian:** install the ca-certificates update. If the JDK's copy holds more roots
than the system store, it missed removals:

```bash
grep -c 'BEGIN CERT' /etc/ssl/certs/ca-certificates.crt
keytool -list -cacerts -storepass changeit | grep -c trustedCertEntry
```

Rebuild it from the system store, then restart Keycloak:

```bash
sudo mv /etc/ssl/certs/java/cacerts /etc/ssl/certs/java/cacerts.before-rebuild
sudo update-ca-certificates --fresh
```

On our test nodes both took the count of accepted chains to 0 of 12. The restart matters
either way: the JVM reads its trust store once, when it starts.

## What we changed in keelinfra

keelinfra installs Keycloak on your hosts with the OS's OpenJDK 21, so the Rocky, AlmaLinux and
Ubuntu rows above are our nodes too. [keelinfra/keycloak#51](https://github.com/keelinfra/keycloak/pull/51)
removes both roots from every node's system and JDK trust stores without waiting for the OS
packages, and works offline. `./update-trust` applies it to a running cluster and restarts
Keycloak one node at a time where it still holds the old store. `./verify` now fails while a
node trusts a root on the distrusted list, while the JDK's store has missed a removal the
system store has, or while Keycloak runs with an older copy of it. CI puts the root back into
the JDK store of a running three-node cluster and checks that `./verify` names it and
`./update-trust` removes it.

---

*keelinfra is an open-source (Apache-2.0), production-ready self-hosted
Keycloak distribution. A subscription adds CVE notification matched to the
version you actually run, and upgrade help along a path we've already drilled:
[keelinfra.io/keycloak/pricing](https://keelinfra.io/keycloak/pricing/) · hello@keelinfra.io.*

*Keycloak is a trademark of The Linux Foundation. keelinfra is an independent
project, not affiliated with or endorsed by The Linux Foundation or the
Keycloak project.*
