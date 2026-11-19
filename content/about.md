+++
title = "About"
description = "keelinfra is an open-source project by Xianpeng Shen: tested builds for Jenkins setups that can't move to what upstream supports yet, with the tests behind each claim published."
template = "page.html"
+++

keelinfra ships tested, open-source builds for CI that can't upgrade yet, until it can:
[Extended Security for Jenkins](https://github.com/keelinfra/jenkins-extended-security), which
backports core security fixes to 2.541.x for controllers that can't leave Java 17 yet;
[Agent8 for Jenkins](/jenkins/), which keeps build hosts stuck on Java 8, 11 or 17 connected to a
current Jenkins controller;
the [Jenkins upgrade matrix](/jenkins/upgrade-matrix/), which shows how an old controller gets to
the current LTS; and [AIX Runner for GitLab](https://github.com/keelinfra/aix-runner), a GitLab
Runner build for AIX. (An earlier Keycloak distribution was
[discontinued](/keycloak/) in October 2026.)

## Why

Upstream moves on: Jenkins now needs Java 21 on the controller and on every agent, and security
fixes after 2.541.3 ship only in releases that need it. A lot of real CI can't follow on
upstream's schedule, because of a JDK that isn't approved yet, build hosts on AIX, Solaris or
HP-UX, or a vendor tool pinned to one version. keelinfra keeps shipping tested builds for it, in
the open, and maps the way to the current release.

## How it is run

1. **Tested, not promised.** No claim ships without a test behind it: a public CI run, a
   published measurement, or a rehearsal you can run yourself. Where a platform is tested by
   hand and not in CI (AIX, Solaris, HP-UX), the page says so. The [evidence page](/evidence/)
   lists every claim and its proof.
2. **All open source.** Agent8, Extended Security and aix-runner are MIT;
   jenkins-upgrade-check is Apache-2.0. No open-core split, no gated features, no relicensing.
3. **Your machines, your data.** Nothing phones home. If keelinfra stopped tomorrow, nothing you
   run would stop: the code and the build scripts are public, so you can keep it going yourself.

## Get involved

Use it and say how it went. Issues and pull requests are open in every
[repository](https://github.com/keelinfra): bug reports, test results from platforms we can't
reach, upgrade results from real controllers, fixes, and corrections to anything on this site.

## Who builds it

keelinfra is built by [Xianpeng Shen](https://shenxianpeng.dev/about/), an engineer based in
Lithuania, who also maintains:

- [cpp-linter](https://github.com/cpp-linter) — clang-format and clang-tidy on every pull request.
  More than 1,000 repositories on GitHub
  [depend on it](https://github.com/cpp-linter/cpp-linter-action/network/dependents).
- [explain-error-plugin](https://github.com/jenkinsci/explain-error-plugin) and
  [jenkinsfilelint](https://github.com/jenkinsci/jenkinsfilelint), in the jenkinsci organization.
  keelinfra itself is independent and not endorsed by the Jenkins project.
- Years of keeping Jenkins builds working on AIX, written up along the way: from
  [Git clones](https://shenxianpeng.dev/posts/2021/git-clone-failed-on-aix/) to
  [IBM Java certificate chains](https://shenxianpeng.dev/posts/2023/upload-artifacts-failed-on-aix/).

[GitHub](https://github.com/shenxianpeng) · [Blog](https://shenxianpeng.dev/)

## Contact

Public questions: the GitHub issues of each project. Anything that can't be public:
[hello@keelinfra.io](mailto:hello@keelinfra.io). Security reports: see [Security](/security/).
