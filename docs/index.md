---
template: landing.html
description: "Tested, open-source builds for CI that can't upgrade yet: Agent8 runs Jenkins agents on hosts stuck on Java 8, 11 or 17, the upgrade matrix maps paths for old Jenkins controllers, aix-runner builds GitLab Runner for AIX, and Extended Security for Jenkins backports core security fixes to 2.541.x. Every claim links to public CI."
seo_title: keelinfra — Self-hosted infrastructure, tested in public
hero:
  eyebrow: open source · tested in public · help when you need it
  title: CI that can’t upgrade yet, kept *running*.
  text: >-
    A JDK that isn't approved yet, build hosts on AIX, Solaris or HP-UX, a vendor tool pinned to
    one version: plenty of CI can't move to what upstream supports. keelinfra keeps shipping tested,
    open-source builds for it until it can, and publishes the CI runs and test data behind what it says.
  actions:
    - {text: See the products, link: "#product", primary: true}
    - {text: Read the evidence, link: evidence.md}
sections:
  - type: features
    id: product
    eyebrow: for Jenkins and GitLab · free and open source
    title: Products
    columns: 2
    items:
      - title: Agent8 for Jenkins
        mark: "8"
        meta: keelinfra/agent8 · MIT
        badges:
          - {text: Available, tone: tip}
          - Free
          - {text: Tested on AIX · Solaris · HP-UX, tone: tip}
        text: Run Jenkins agents on hosts stuck on Java 8, 11 or 17, while the controller moves to Java 21.
        bullets:
          - The old host keeps its Java and stays an ordinary node
          - Tested in CI on Linux, including RHEL/CentOS 6
          - Releases named after the Jenkins version they were tested with, one install script
        actions:
          - {text: Explore Agent8, link: jenkins/index.md, primary: true}
          - {text: GitHub, link: "https://github.com/keelinfra/agent8", icon: brand-github}
          - {text: Get help, link: jenkins-assessment.md}
      - title: Jenkins upgrade matrix
        icon: grid-3x3
        meta: keelinfra/jenkins-upgrade-check · Apache-2.0
        badges:
          - {text: Published, tone: tip}
          - Free
        text: >-
          Which Jenkins LTS lines can go straight to 2.580.1, and which need to stop on the way,
          from 328 rehearsed starts.
        bullets:
          - 38 LTS lines, from 2.60.3 to 2.568.3
          - The 100 and the 300 most installed plugins
          - Core-only and stepped upgrades, with the Java for each step
        actions:
          - {text: See the matrix, link: jenkins/upgrade-matrix/index.md, primary: true}
          - {text: Check your own plugins, link: jenkins/upgrade-check.md}
      - title: AIX Runner for GitLab
        mark: AIX
        meta: keelinfra/aix-runner · MIT
        badges:
          - {text: Experimental, tone: warning}
          - Free
          - {text: Tested on AIX 7.3, tone: tip}
        text: GitLab Runner for AIX 7.2 and 7.3, which GitLab doesn't ship.
        bullets:
          - The unmodified upstream runner, with four small dependency patches
          - The latest upstream release built daily in CI; releases published by hand
          - "Shell executor tested: jobs, artifacts, cache, git clone, cancel"
        actions:
          - {text: GitHub, link: "https://github.com/keelinfra/aix-runner", icon: brand-github, primary: true}
      - title: Extended Security for Jenkins 2.541.x
        icon: shield-check
        meta: keelinfra/jenkins-extended-security · MIT
        badges:
          - {text: Released, tone: tip}
          - Free
          - Not an official Jenkins release
        text: >-
          Jenkins 2.541.3, the last LTS that runs on Java 17, with the core security fixes released
          after it.
        bullets:
          - Each fix listed with its upstream commit and any change from upstream
          - Built and tested in public CI on Java 17 and 21
          - A reproducible WAR, with a checksum, an SBOM and a build attestation
        actions:
          - {text: GitHub, link: "https://github.com/keelinfra/jenkins-extended-security", icon: brand-github, primary: true}
          - {text: Releases, link: "https://github.com/keelinfra/jenkins-extended-security/releases"}
  - type: steps
    id: status
    tone: dark
    title: How every keelinfra product works
    items:
      - title: Open source first
        text: >-
          The code, install scripts and tests are public. You can run everything without talking
          to us.
      - title: Tested in public
        text: >-
          Linux, the upgrade rehearsals and the security backports are tested in public CI you can
          check. AIX, Solaris and HP-UX are tested by hand, not in CI, and the pages say so.
          [The evidence ledger →](evidence.md)
      - title: Paid support if you need it
        text: >-
          The tools work without us. If you want someone to stand behind them, the engineer who
          builds them offers paid support.
    markdown: |
      ```sh
      sh install.sh --url https://jenkins.example.com/ --replace agent.jar   # agent8
      ```
  - type: cta
    id: services
    class: ki-panel
    eyebrow: Agent8 help
    title: AIX, Solaris and HP-UX pilots, plugin checks, fleets
    text: >-
      <span id="pricing"></span>Tell us about your build hosts. The first answer is free and in
      writing, within two business days.
    actions:
      - {text: Ask about your hosts, link: jenkins-assessment.md, primary: true}
  - type: posts
    id: writing
    title: From the blog
    limit: 3
    actions:
      - {text: All posts, link: blog/index.md, primary: true}
---

# keelinfra

keelinfra ships tested, open-source builds for CI that can't upgrade yet: Agent8 for Jenkins,
the Jenkins upgrade matrix, AIX Runner for GitLab and Extended Security for Jenkins 2.541.x.
