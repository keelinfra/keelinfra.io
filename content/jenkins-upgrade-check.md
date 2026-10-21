+++
title = "jenkins-upgrade-check"
description = "Plan a Jenkins upgrade, rehearse it on a copy of your controller, and know within minutes of the real upgrade whether to keep it or roll back, and why. Free and open source (Apache-2.0), one static binary."
path = "jenkins/upgrade-check"
template = "page.html"

[extra]
subtitle = "Free and open source (Apache-2.0) · one static binary · the rehearsal needs Docker"
+++

**For the people who run a Jenkins controller and have put off upgrading it.**
jenkins-upgrade-check works out the path to the version you want, rehearses it on a copy of
your controller, and after the real upgrade says GO or ROLL BACK, and why. Nothing is installed
on the controller. Source, install and every option:
[github.com/keelinfra/jenkins-upgrade-check](https://github.com/keelinfra/jenkins-upgrade-check).

## Why rehearse

We upgraded a controller with the 300 most installed plugins from the last release of every
LTS line since 2.60.3 to 2.580.1 ([upgrade matrix](/jenkins/upgrade-matrix/), 2026-10-21):

- **Replacing only the war, package or image:** Jenkins did not start from 12 of the 38 lines,
  and started with plugins failing from 12 more. 13.6% of the controllers that report usage
  are on those lines. From 2.356 or older this fails with network access too, because 2.580.1
  no longer ships the plugins that were split out of core.
- **Following the path `plan` gives:** every stop loaded every plugin, from all 38 lines.

## What it does

1. **plan** reads your controller (GET requests only) or a plugin list, and works out the
   stops, the Java version for each, and the plugin versions for each stop. It lists what the
   update center already knows is wrong: security warnings, deprecated plugins, plugins no
   longer distributed, and agents whose Java cannot follow. With `--runbook` it writes the
   upgrade and rollback commands for a Debian or RPM package, a war or the Docker image.
2. **dry-run** starts each stop in a throwaway container with no network and no executors,
   with your plugins and, if you give it, a copy of your configuration. It reports what failed
   and why: a plugin that needs a newer core or Java, a missing dependency, the jobs that would
   disappear, the settings Jenkins could no longer read.
3. **verify** runs right after the real upgrade. Jenkins comes up in quiet mode, so no build
   starts, and verify compares plugins, jobs, agents and settings with a snapshot from before.
   On ROLL BACK you restore the backup and the old version, and since no build ran on the new
   version, nothing is lost.

We tested the runbook end to end on a simulated controller (2.346.3, about 300 plugins, jobs,
folders and an agent): the normal upgrade, a forgotten plugin step, a missing plugin and an agent
on too old a Java. The window took 4 to 6 minutes, and every failure was caught and named.

## Install

On Linux or macOS:

```sh
curl -fsSL https://github.com/keelinfra/jenkins-upgrade-check/releases/latest/download/install.sh | sh
```

It checks the download against the release's SHA-256 sums before installing. Windows has an
`.exe` on the [releases page](https://github.com/keelinfra/jenkins-upgrade-check/releases).
Security updates are free until at least 31 December 2031
([security policy](https://github.com/keelinfra/jenkins-upgrade-check/blob/main/SECURITY.md)).

## What it does not cover

- A plugin that loads can still break at run time: a pipeline step, a page, an integration.
  The rehearsal shows what fails at startup, where most upgrade breakage shows, not everything.
- Plugins that are not on the update center are listed but not rehearsed.
- The rehearsal has no network, so what plugins do with outside systems (SCM, cloud, LDAP) is
  not exercised.

## Rather not do it alone?

Send the output of this, from *Manage Jenkins → Script Console*, to
[hello@keelinfra.io](mailto:hello@keelinfra.io?subject=Jenkins%20upgrade%20rehearsal), with the
version you want to reach:

```groovy
Jenkins.instance.pluginManager.plugins.sort { it.shortName }.each { println "${it.shortName}:${it.version}" }
```

We rehearse your upgrade with it and reply in writing: the stops, the Java for each, and which
plugins fail where. This is free. For help with the upgrade itself, write to the same address.
Bugs and questions about the tool go to
[GitHub issues](https://github.com/keelinfra/jenkins-upgrade-check/issues).
