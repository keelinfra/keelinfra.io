+++
title = "About"
description = "keelinfra is built by Xianpeng Shen, the engineer who answers your email — EU-based, shipping open-source tools for Jenkins with the tests behind each claim published."
template = "page.html"
+++

keelinfra ships tested, open-source builds for CI that can't upgrade yet, until it can:
[Agent8 for Jenkins](/jenkins/), which keeps build hosts stuck on Java 8, 11 or 17 connected to a
current Jenkins controller;
[Extended Security for Jenkins](https://github.com/keelinfra/jenkins-extended-security), which
backports core security fixes to 2.541.x for controllers that can't leave Java 17 yet;
[AIX Runner for GitLab](https://github.com/keelinfra/aix-runner), a GitLab Runner build for AIX;
and the [Jenkins upgrade matrix](/jenkins/upgrade-matrix/), which shows how an old controller gets to
the current LTS. (An earlier Keycloak distribution was
[discontinued](/keycloak/) in October 2026.)

## Deliberately small

keelinfra is not a platform vendor with an account team. It's built by
[Xianpeng Shen](https://shenxianpeng.dev/about/), an engineer based in Lithuania, who builds the tools and
publishes every claim with a receipt. When you email
[hello@keelinfra.io](mailto:hello@keelinfra.io), the person who answers is the person who will do
the work. For the buyer we serve, that's not a limitation; it's the point:

- **You talk to the engineer, not an account manager.**
- **Everything is in the open** — the [code](https://github.com/keelinfra), the CI runs, the
  [claims ledger](/evidence/). At this size there's no process to hide behind, so we don't try.
- **We say "you don't need us" when you don't.** The tools are complete without a support
  plan or a service engagement — that's by design.
- **If keelinfra stopped tomorrow, nothing you run would stop.** The code runs on your own machines,
  and it is open source down to the build scripts
  ([Agent8](https://github.com/keelinfra/agent8/blob/main/build.sh)), so you can keep it going
  yourself.

## Who builds it

Xianpeng Shen maintains open-source tools for building and shipping software:

- [cpp-linter](https://github.com/cpp-linter) — clang-format and clang-tidy on every pull request.
  More than 1,000 repositories on GitHub
  [depend on it](https://github.com/cpp-linter/cpp-linter-action/network/dependents).
- [explain-error-plugin](https://github.com/jenkinsci/explain-error-plugin) and
  [jenkinsfilelint](https://github.com/jenkinsci/jenkinsfilelint), in the jenkinsci organization.
  Agent8 itself is independent and not endorsed by the Jenkins project.
- Years of keeping Jenkins builds working on AIX, written up along the way: from
  [Git clones](https://shenxianpeng.dev/posts/2021/git-clone-failed-on-aix/) to
  [IBM Java certificate chains](https://shenxianpeng.dev/posts/2023/upload-artifacts-failed-on-aix/).

[GitHub](https://github.com/shenxianpeng) · [Blog](https://shenxianpeng.dev/)

## The operating principles

1. **Tested, not promised.** No claim ships without a test behind it: a public CI run, a
   published measurement, or a drill you can run yourself. Where a platform is tested by hand
   and not in CI (AIX, Solaris, HP-UX), the page says so.
2. **The ops knowledge is the product** — and it's open source (Agent8: MIT;
   jenkins-upgrade-check: Apache-2.0). No open-core split, no gated features, no relicense rug-pull.
3. **Your machines, your data.** Nothing phones home to us. There is nothing of yours for us to lose.

## Contact

[hello@keelinfra.io](mailto:hello@keelinfra.io) · EU business hours
