+++
title = "Which Jenkins LTS lines can go straight to 2.580.1"
description = "We started Jenkins 328 times: every LTS line from 2.60.3 to 2.568.3, with the 100 and the 300 most installed plugins, upgraded to 2.580.1 by replacing only the core and in steps. From 2.401.3 a core-only upgrade loaded every plugin. From 2.346.3 or older it never did, with or without network access, because 2.580.1 no longer ships the plugins that were split out of core."
path = "jenkins/upgrade-matrix"
template = "page.html"

[extra]
subtitle = "Rehearsed 2026-10-21 · 38 LTS lines · 100 and 300 plugins · 328 Jenkins starts"
+++

**Short answer.** If your controller is on 2.401.3 or newer, replacing only the war, the
package or the image with 2.580.1 loaded all of the 300 most installed plugins. On 2.346.3 or
older it never did, with or without network access: plugins failed to load, and with 300
plugins 12 of those 21 lines did not start at all. Going in steps, through 2.346.3, 2.462.3 and 2.541.3 and
changing Java on the way, loaded every plugin from every line. 2.580.1 needs Java 21, on the
controller and on the agents.

**New in 2.580.1.** Jenkins
[2.574](https://www.jenkins.io/changelog/#v2.574) and
[2.577](https://www.jenkins.io/changelog/#v2.577) took the plugins that were split out of
core out of the war. Before, an upgraded controller installed the ones it was missing from
its own war. Jenkins does not download them when it starts, so a controller older than 2.356
comes up on 2.580.1 without `instance-identity`, and older ones also without `sshd` and the
JavaMail plugins. This happens even when the update center is reachable: we repeated the
upgrade from 2.346.3 and 2.277.4 with network access and got the same failure. If yours is on
2.356 or older, upgrade to an LTS that still bundles them (2.568.3 or earlier) first, update
your plugins there, and only then go to 2.580.1. Copying in `instance-identity` alone is not
enough: it needs a newer `bouncycastle-api` too.

## How we tested

- **Starting points:** the last release of every LTS line from 2.60.3 (the oldest
  `jenkins/jenkins` image) to 2.568.3, 38 lines.
- **Plugins:** for each line, the 100 and the 300 plugins most installed on it in the Jenkins
  usage statistics (March 2026, 234,780 controllers), each at the newest release that line
  could load. The 38 lines cover 79.1% of those controllers.
- **Rehearsals:** every controller was started without network in the official image three
  ways: as it is, with only the core replaced by 2.580.1, and at every stop of the stepped
  path with the plugin versions for that stop. The upgrades start Jenkins as an upgrade from
  the previous version, not as a new install. A plugin counts as failing when Jenkins does not
  load it, and as loading partly when some of its extensions fail to load.

## What we found

- **Replacing only the core, 300 plugins:** Jenkins did not start from 12 lines and started
  with failing plugins from 12 more. 13.6% of the reporting controllers are on those lines.
  With 100 plugins it always started, but 21 lines (10.8% of controllers) had failing plugins.
- **Why:** the logs show Jenkins failing to find classes from the plugins that used to come
  with the war, for example `InstanceIdentity` upgrading from 2.346.3 and the `sshd` module's
  `SshCommandFactory` from 2.277.4. Then Jenkins cannot inject the extensions that need them
  and stops. Which extension stops it varies between runs: Bitbucket Server Integration,
  Kubernetes Credentials Provider or Git.
- **2.89.4 to 2.150.3:** about 120 of 305 plugins failed after a core-only upgrade, mostly on
  dependency cycles between plugins that were split out of core.
- **In steps:** with the plugin versions for each stop, plus the split-out plugins each stop
  needs, every line reached 2.580.1 with every plugin loaded, with 100 and with 300 plugins.
- **The Java for a stop is not always the one you would pick.** At the 2.346.3 stop the gradle
  plugin needs Java 11, not Java 8. The update center does not publish plugins' minimum Java;
  only the plugin's own manifest has it.

## 300 most installed plugins

| From | Controllers | Before the upgrade | Core only → 2.580.1 | Steps | After the steps |
|---|---|---|---|---|---|
| 2.60.3 | <0.1% | ✅ all load | ⚠️ 9 load partly | 2.346.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.73.3 | <0.1% | ✅ all load | ⚠️ 9 load partly | 2.346.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.89.4 | <0.1% | ✅ all load | ⚠️ 121 fail, 10 load partly | 2.346.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.107.3 | <0.1% | ✅ all load | ⚠️ 121 fail, 10 load partly | 2.346.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.121.3 | 0.1% | ✅ all load | ⚠️ 122 fail, 9 load partly | 2.346.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.138.4 | 0.2% | ✅ all load | ⚠️ 126 fail, 7 load partly | 2.346.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.150.3 | 0.2% | ✅ all load | ⚠️ 127 fail, 7 load partly | 2.346.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.164.3 | 0.3% | ✅ all load | ❌ does not start (1 fail, 10 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.176.4 | 0.4% | ✅ all load | ❌ does not start (1 fail, 9 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.190.3 | 0.4% | ✅ all load | ❌ does not start (8 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.204.6 | 0.4% | ✅ all load | ❌ does not start (8 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.222.4 | 0.5% | ✅ all load | ❌ does not start (8 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.235.5 | 0.5% | ✅ all load | ❌ does not start (7 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.249.3 | 0.5% | ✅ all load | ❌ does not start (7 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.263.4 | 0.7% | ✅ all load | ❌ does not start (4 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.277.4 | 0.5% | ✅ all load | ❌ does not start (4 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.289.3 | 0.7% | ⚠️ 97 fail | ⚠️ 97 fail, 1 load partly | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.303.3 | 0.7% | ⚠️ 98 fail | ⚠️ 98 fail, 1 load partly | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.319.3 | 0.9% | ✅ all load | ❌ does not start (2 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.332.4 | 1.4% | ✅ all load | ❌ does not start (2 load partly) | 2.462.3 (Java 11) → 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.346.3 | 2.2% | ✅ all load | ❌ does not start (2 load partly) | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.361.4 | 0.7% | ⚠️ 1 load partly | ⚠️ 1 load partly | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.375.4 | 0.8% | ⚠️ 1 load partly | ⚠️ 1 load partly | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.387.3 | 1.3% | ⚠️ 1 load partly | ⚠️ 1 load partly | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.401.3 | 1.0% | ✅ all load | ✅ all load | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.414.3 | 1.2% | ✅ all load | ✅ all load | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.426.3 | 2.6% | ✅ all load | ✅ all load | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.440.3 | 2.1% | ✅ all load | ✅ all load | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.452.4 | 2.2% | ✅ all load | ✅ all load | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.462.3 | 3.7% | ✅ all load | ✅ all load | 2.541.3 (Java 17) → 2.580.1 (Java 21) | ✅ all load |
| 2.479.3 | 3.5% | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |
| 2.492.3 | 4.2% | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |
| 2.504.3 | 4.7% | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |
| 2.516.3 | 5.7% | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |
| 2.528.3 | 11.6% | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |
| 2.541.3 | 23.2% | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |
| 2.555.3 | – | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |
| 2.568.3 | – | ✅ all load | ✅ all load | 2.580.1 (Java 21) | ✅ all load |

## 100 most installed plugins

From 2.361.4 on, all 100 loaded before the upgrade, after a core-only upgrade and after the
steps. The lines before it:

| From | Controllers | Before the upgrade | Core only → 2.580.1 | After the steps |
|---|---|---|---|---|
| 2.60.3 | <0.1% | ✅ all load | ⚠️ 6 load partly | ✅ all load |
| 2.73.3 | <0.1% | ✅ all load | ⚠️ 6 load partly | ✅ all load |
| 2.89.4 | <0.1% | ✅ all load | ⚠️ 42 fail, 4 load partly | ✅ all load |
| 2.107.3 | <0.1% | ✅ all load | ⚠️ 42 fail, 4 load partly | ✅ all load |
| 2.121.3 | 0.1% | ✅ all load | ⚠️ 44 fail, 4 load partly | ✅ all load |
| 2.138.4 | 0.2% | ✅ all load | ⚠️ 44 fail, 3 load partly | ✅ all load |
| 2.150.3 | 0.2% | ✅ all load | ⚠️ 45 fail, 3 load partly | ✅ all load |
| 2.164.3 | 0.3% | ✅ all load | ⚠️ 2 fail, 6 load partly | ✅ all load |
| 2.176.4 | 0.4% | ✅ all load | ⚠️ 2 fail, 6 load partly | ✅ all load |
| 2.190.3 | 0.4% | ✅ all load | ⚠️ 5 load partly | ✅ all load |
| 2.204.6 | 0.4% | ✅ all load | ⚠️ 5 load partly | ✅ all load |
| 2.222.4 | 0.5% | ✅ all load | ⚠️ 5 load partly | ✅ all load |
| 2.235.5 | 0.5% | ✅ all load | ⚠️ 4 load partly | ✅ all load |
| 2.249.3 | 0.5% | ✅ all load | ⚠️ 4 load partly | ✅ all load |
| 2.263.4 | 0.7% | ✅ all load | ⚠️ 2 load partly | ✅ all load |
| 2.277.4 | 0.5% | ✅ all load | ⚠️ 2 load partly | ✅ all load |
| 2.289.3 | 0.7% | ⚠️ 30 fail | ⚠️ 30 fail | ✅ all load |
| 2.303.3 | 0.7% | ⚠️ 31 fail | ⚠️ 31 fail | ✅ all load |
| 2.319.3 | 0.9% | ✅ all load | ⚠️ 2 load partly | ✅ all load |
| 2.332.4 | 1.4% | ✅ all load | ⚠️ 2 load partly | ✅ all load |
| 2.346.3 | 2.2% | ✅ all load | ⚠️ 2 load partly | ✅ all load |

## What this does not cover

- The table was rehearsed without network. With network access we repeated only the upgrades
  from 2.346.3 and 2.277.4 with 300 plugins; both failed the same way.
- These are synthetic controllers: popular plugins, but no jobs, no configuration as code, no
  credentials and no agents. Your controller has pinned versions and plugins nobody else uses.
- 2.289.3 and 2.303.3 already fail before the upgrade, with about 100 plugins down on a
  dependency cycle around the credentials plugin. We have not seen that on a real controller,
  and it may come from picking the newest release of every plugin.
- 2.361.4 to 2.387.3 have `blueocean-rest-impl` loading partly before the upgrade too.
- Usage shares are from March 2026, so 2.555.3 and 2.568.3 show none.

## Use the data

The rows behind both tables are published as JSON:
[matrix.json](https://raw.githubusercontent.com/keelinfra/jenkins-upgrade-check/matrix/2.580.1/matrix.json),
one row per starting line and plugin count (76 rows). Each row has the starting `core`, the
result of replacing only the core (`asIs`), and the `stops` of the tested path in order, each
with its `core` and the `java` it ran on.

If an AI agent is upgrading your controller, give it that file. Ask it to take the row for your
LTS line and to go through its `stops` in order: switch the controller and every agent to the
stop's `java`, upgrade the core to the stop's `core`, and update every plugin before going on
to the next stop. Use `java`, not `planJava`: `java` is what the rehearsal needed, and it is
newer where a plugin required it: from 2.150.3 or older, the gradle plugin needs Java 11 at the
2.346.3 stop, where the plan alone says Java 8.

## Your own plugin list

Run this in *Manage Jenkins → Script Console* and send the output to
[hello@keelinfra.io](mailto:hello@keelinfra.io?subject=Jenkins%20upgrade%20rehearsal):

```groovy
Jenkins.instance.pluginManager.plugins.sort { it.shortName }.each { println "${it.shortName}:${it.version}" }
```

We run the same rehearsal with your plugins and your target version, and reply in writing:
which stops your upgrade needs, which Java each one runs on, which plugins fail at which
stop, and which split-out plugins it is missing. This is free: real plugin lists are how we
test the rehearsal.

Or run it yourself: the table was made with [jenkins-upgrade-check](/jenkins/upgrade-check/),
which plans the stops for your plugin list, rehearses each one in a container, and after the
real upgrade says whether to keep it or roll back.
