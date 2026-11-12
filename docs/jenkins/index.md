---
template: landing.html
description: "Run Jenkins agents on build hosts stuck on Java 8, 11 or 17, and fix UnsupportedClassVersionError after a controller upgrade. The controller moves to Java 21; AIX, Solaris, HP-UX and hosts whose JDK can't change keep their Java. Free and open source (MIT)."
image: assets/social-preview-agent8.png
jsonld: {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Agent8 for Jenkins", "applicationCategory": "DeveloperApplication", "operatingSystem": "Linux, AIX, Solaris, HP-UX", "url": "https://keelinfra.io/jenkins/", "codeRepository": "https://github.com/keelinfra/agent8", "license": "https://opensource.org/licenses/MIT", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}
hero:
  eyebrow: keelinfra / agent8
  title: Agent8 for Jenkins
  text: >-
    **Run Jenkins agents on hosts stuck on Java 8, 11 or 17.** Jenkins now requires Java 21 on the
    controller and on every agent. With Agent8 the controller moves on, and the old build host
    keeps its Java and stays an ordinary node.
  badges:
    - {text: Available, tone: tip}
    - Free · MIT
    - Linux tested in CI
    - {text: Tested on AIX · Solaris · HP-UX, tone: tip}
  actions:
    - {text: Install Agent8, link: "#install", primary: true}
    - {text: View on GitHub, link: "https://github.com/keelinfra/agent8", icon: brand-github}
  code:
    title: build host · Java 8
    lang: sh
    content: |
      # 1. fetch the installer
      curl -fsSLO https://raw.githubusercontent.com/\
          keelinfra/agent8/main/install.sh

      # 2. match the controller, swap the jar
      sh install.sh --url https://jenkins.example.com/ \
          --replace /path/to/agent.jar

      # 3. restart with the same command as before
      java -jar /path/to/agent.jar -url ... -name aix71
sections:
  - type: stats
    id: proof
    items:
      - {value: Java 8 · 11 · 17, label: "one jar per host Java, in every release", link: "https://github.com/keelinfra/agent8/releases"}
      - {value: CentOS 6.10, label: tested in CI on every change, link: "https://github.com/keelinfra/agent8/actions/workflows/ci.yml"}
      - {value: LTS + weekly, label: tested against both Jenkins lines every week, link: "https://github.com/keelinfra/agent8/actions/workflows/ci.yml"}
      - {value: Same command, label: "java -jar agent.jar, unchanged", link: "#install"}
  - type: markdown
    id: how
    eyebrow: How it works
    title: The controller upgrades. The build host doesn't have to.
    markdown: |
      <figure class="ki-how">
      <img class="ki-light no-zoom" src="../assets/agent8-how-it-works-light.svg" width="960" height="400" alt="Without Agent8, Jenkins' agent.jar needs Java 21 and a Java 8 build host cannot connect. install.sh asks the controller which agent it ships, downloads the matching Agent8 jar, checks its sha256 and swaps it in. The host runs the same java -jar agent.jar on Java 8, connects and runs builds.">
      <img class="ki-dark no-zoom" src="../assets/agent8-how-it-works-dark.svg" width="960" height="400" alt="">
      </figure>

      ### What keeps working on the old host

      - Labels and executors
      - `sh` and file steps
      - `junit` and `stash`
      - Pipeline, Git checkout (JGit) and credentials
      - Aborts and agent restarts mid-build
      - The script console
      {.ki-checks}
  - type: markdown
    id: support
    tone: soft
    eyebrow: Support
    title: Where it runs today
    text: >-
      Linux is tested in CI on every change. Agent8 has also been tested on AIX (IBM Java 8),
      Solaris (Oracle Java 8) and HP-UX (Itanium, HP Java 8); those platforms are not in CI.
      [Tell us](../jenkins-assessment.md) what your hosts run.
    markdown: |
      | Build host | Java | Status |
      | --- | --- | --- |
      | Linux, including RHEL/CentOS 6 | `HotSpot 8` | **Tested in CI**{.badge .tip} |
      | Linux, IBM Semeru (OpenJ9, the JVM family of IBM Java 8) | `OpenJ9 8` | **Tested in CI · best effort**{.badge .tip} |
      | Linux | `HotSpot 11, 17` | **Tested in CI (LTS)**{.badge .tip} |
      | AIX 7.1 / 7.2 / 7.3 | `IBM Java 8` | **Tested**{.badge .tip} |
      | Solaris | `Java 8` | **Tested**{.badge .tip} |
      | HP-UX (Itanium) | `Java 8` | **Tested**{.badge .tip} |

      OpenJ9 and IBM Java (J9) are outside Jenkins' own support. Agent8 tests OpenJ9 8 in CI and
      fixes the J9 problems it finds, best effort; report them on
      [Agent8's issues](https://github.com/keelinfra/agent8/issues).
  - type: steps
    id: install
    eyebrow: Install
    title: One script, plain `sh`, any old Unix
    items:
      - title: It asks your controller
        text: >-
          `install.sh` reads the remoting version of the controller's `agent.jar` and downloads
          the Agent8 release built for it, in the build for the host's Java. If there is none yet,
          it says so and uses the latest release.
      - title: It checks before it swaps
        text: >-
          Downloads are checked against `sha256sums.txt` and test-started on the local Java. The
          old jar is kept, and `--restore` puts it back.
      - title: You restart as usual
        text: >-
          Same `java -jar` command, same service script. Offline hosts copy the jars and
          `sha256sums.txt` and use `--from DIR`; fleets use the Ansible playbook.
    markdown: |
      <div class="ki-callout">
      <code>jenkins-2.580.1</code>
      <p>Releases are named after the Jenkins version they were tested with. Your version is at the bottom right of every Jenkins page.</p>
      <a href="https://github.com/keelinfra/agent8/releases">All releases →</a>
      </div>

      Full options, the Ansible playbook and troubleshooting are in the
      [README](https://github.com/keelinfra/agent8#install). Background:
      [Jenkins requires Java 21. What happens to your AIX 7.1 and RHEL 6 build hosts?](../blog/jenkins-java-21-aix-rhel6-build-hosts.md)
  - type: markdown
    id: errors
    title: The error that brings people here
    text: "After a controller upgrade, an agent on Java 8, 11 or 17 fails to start with:"
    markdown: |
      ```text
      java.lang.UnsupportedClassVersionError: hudson/remoting/Launcher has been compiled by a more recent version of the Java Runtime (class file version 65.0), this version of the Java Runtime only recognizes class file versions up to 52.0
      ```

      Class file version 65.0 is Java 21 (61.0 is Java 17, 55.0 is Java 11); 52.0 is Java 8.
      If the host can install a newer Java, do that. If it can't, as on AIX, Solaris or HP-UX, or
      where the JDK must stay as it is, [install Agent8](#install) on it. On an SSH node that
      still shows this error, set the node's *Java Path* to the `java` file Agent8 installed.
  - type: faq
    id: faq
    title: Questions teams ask first
    items:
      - q: Is this an official Jenkins project?
        a: >-
          No. Agent8 is independent and not endorsed or supported by the Jenkins project. Report
          problems on its [GitHub issues](https://github.com/keelinfra/agent8/issues), not the
          Jenkins tracker.
      - q: Why not run agent.jar on Java 21 and build with the old JDK?
        a: >-
          If the host can install Java 21, do that and keep building with the old JDK; you don't
          need Agent8. It is for hosts that can't, such as AIX 7.1, HP-UX on Itanium and Solaris.
          Not sure which yours is? [Ask us](../jenkins-assessment.md).
      - q: Why not run the build in a container?
        a: >-
          That works for many RHEL 6 builds, and RHEL 6 x86_64 hosts can also install Amazon
          Corretto 21 or Azul Zulu 21 and run the stock agent. Neither covers builds that must run
          natively on AIX, Solaris or HP-UX hardware.
      - q: Does any controller setting matter?
        a: >-
          Only if the Versions Node Monitors plugin (`versioncolumn`) is installed. Its JVM Version
          monitor takes Agent8 nodes offline seconds after they connect, so set it not to
          disconnect. Its Remoting Version monitor does the same when the agent's build differs from
          the controller's. The [README](https://github.com/keelinfra/agent8#install) has the
          configuration-as-code snippet.
      - q: What happens when we upgrade the controller?
        a: >-
          Rerun `install.sh` (or the playbook) and restart the agent. Jenkins refuses agents older
          than a minimum remoting version that it raises over time: Jenkins 2.586 already refuses
          the Agent8 build for 2.462.3. Which upgrade paths load every plugin, and where Java has to
          change on the way, is in the [upgrade matrix](upgrade-matrix/index.md).
      - q: What hasn't been tested yet, and what doesn't work?
        a: >-
          Plugins that run their own code on the agent beyond Git checkout (JGit and command-line
          git) and credentials, such as Docker or artifact upload steps, are untested. The Maven
          project type does not work: it starts its own JVM, which Agent8 does not reach. Run Maven
          from a Pipeline or freestyle shell step (`sh 'mvn ...'`) instead. The
          [README](https://github.com/keelinfra/agent8#known-gaps) keeps the list.
      - q: Which launch methods work?
        a: >-
          Inbound agents, started with `java -jar agent.jar`, and the SSH Build Agents launcher:
          set the node's *Java Path* to the `java` file `install.sh` writes, and it runs Agent8
          instead of the stock jar the launcher copies.
      - q: What is the license?
        a: >-
          Agent8's own code is MIT. Its jars also contain Jenkins remoting (MIT), ASM
          (BSD-3-Clause) and JvmDowngrader classes (LGPL-2.1), and each release ships JvmDowngrader
          itself as `jvmdg.jar` (LGPL-2.1, unmodified).
  - type: cta
    id: help
    eyebrow: Get help
    title: Rolling out to AIX, Solaris or HP-UX, or a whole fleet?
    text: >-
      Agent8 is free. If you need support, we offer it as a paid service: pilots on your platform,
      plugin compatibility checks and yearly support. The first answer is free and in writing,
      within two business days.
    actions:
      - {text: Describe your build hosts, link: ../jenkins-assessment.md, primary: true}
      - {text: Pricing, link: pricing.md}
---

# Agent8 for Jenkins

Agent8 runs Jenkins agents on build hosts stuck on Java 8, 11 or 17, while the controller moves
to Java 21. Free and open source (MIT): [github.com/keelinfra/agent8](https://github.com/keelinfra/agent8).
