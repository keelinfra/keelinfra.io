+++
title = "Evidence"
description = "Every claim keelinfra makes, and where its proof lives: public CI runs and published test data you can repeat yourself."
template = "page.html"
[extra]
subtitle = "Every claim we make, and where its proof lives. If you find a claim on this site that isn't on this page, email us and we'll either add the receipt or delete the claim."
+++

## The ledger

<div class="table-scroll"><table class="ledger">
<thead><tr><th>Claim</th><th>Evidence</th><th>Last verified</th></tr></thead>
<tbody>
<tr><td>Agent8 runs Jenkins builds on Java 8, including CentOS 6.10 and OpenJ9</td><td><a href="https://github.com/keelinfra/agent8/actions/workflows/ci.yml">Agent8 CI</a>: HotSpot 8 on CentOS 6.10 and OpenJ9 8 against the current Jenkins LTS and weekly — Pipeline, Git checkout, credentials, abort and agent restart; Java 11 and 17 against the LTS</td><td class="when">every change and weekly</td></tr>
<tr><td>An older Agent8 release keeps working after a controller upgrade, within limits</td><td>The version-skew job in <a href="https://github.com/keelinfra/agent8/actions/workflows/ci.yml">Agent8 CI</a> runs the latest release against the newer weekly controller; Jenkins 2.586 refusing the build for 2.462.3 is recorded in the <a href="https://github.com/keelinfra/agent8#install">README</a></td><td class="when">every change and weekly</td></tr>
<tr><td>A controller on 2.346.3 or older does not come up cleanly on 2.580.2 after a core-only upgrade; going in steps does</td><td><a href="/jenkins/upgrade-matrix/">The upgrade matrix</a>: 328 Jenkins starts across 38 LTS lines with the 100 and the 300 most installed plugins, with the method and the <a href="/jenkins/upgrade-matrix/2.580.2/matrix.json">raw results</a>; the <a href="/jenkins/upgrade-matrix/2.580.1/">2.580.1 run</a> came out the same</td><td class="when">2026-10-31</td></tr>
<tr><td>Extended Security for Jenkins 2.541.x carries the core security fixes released after 2.541.3</td><td><a href="https://github.com/keelinfra/jenkins-extended-security/blob/stable-2.541/COVERAGE.md">COVERAGE.md</a> lists each advisory, the fix and its upstream commit; <a href="https://github.com/keelinfra/jenkins-extended-security/actions/workflows/ci.yml?query=branch%3Astable-2.541">CI</a> builds the WAR and runs the tests on Java 17 and 21</td><td class="when">every change</td></tr>
</tbody>
</table></div>

<div class="badges">
<a href="https://github.com/keelinfra/agent8/actions/workflows/ci.yml"><img src="https://github.com/keelinfra/agent8/actions/workflows/ci.yml/badge.svg" alt="Agent8 CI status"></a>
</div>

## Corrections

Found a claim that's wrong, stale, or missing a receipt? Open an issue or a pull request on
[this site's repository](https://github.com/keelinfra/keelinfra.io), or email
[hello@keelinfra.io](mailto:hello@keelinfra.io?subject=Evidence%20correction).
