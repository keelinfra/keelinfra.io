+++
title = "Questions about old build hosts and Jenkins upgrades"
description = "Which path fits each build host when Jenkins moves to Java 21: a normal agent, a container, or Agent8. Ask in a GitHub issue, or by email when the details can't be public."
template = "assessment.html"

[extra]
subtitle = "Ask in public where you can · email when you can't"
+++

[Agent8](https://github.com/keelinfra/agent8) is free and open source, and you can roll it out
yourself: the README has the install script and an Ansible playbook. The
[upgrade matrix](/jenkins/upgrade-matrix/) and
[Extended Security for Jenkins 2.541.x](https://github.com/keelinfra/jenkins-extended-security)
cover the controller side.

**Ask in public first.** Bugs and questions go to the GitHub issues of
[Agent8](https://github.com/keelinfra/agent8/issues),
[Extended Security](https://github.com/keelinfra/jenkins-extended-security/issues) or
[jenkins-upgrade-check](https://github.com/keelinfra/jenkins-upgrade-check/issues). An answer
there helps the next person with the same hosts, and a fix lands in the next release.

The questions that come up most:

- **Which path does each host need?** Some hosts can run a normal Java 21 agent, some builds can
  move into a container, and the rest need Agent8. The background is in
  [Jenkins requires Java 21. What happens to your AIX 7.1 and RHEL 6 build hosts?](/blog/jenkins-java-21-aix-rhel6-build-hosts/)
- **Do my plugins work on a Java 8 agent?** Plugins that run their own code on agents are the
  main open risk. CI tests Git checkout (JGit and command-line git) and credentials binding;
  others, such as Docker or artifact upload steps, still need testing. If you try one, say how
  it went in an issue, whether it worked or not.
- **Does Agent8 run on AIX, Solaris or HP-UX?** It has been tested on all three, not in CI. A
  report from your OS and Java version adds to what is known.

**Email when it can't be public.** If your host details can't go in a public issue, use the
form below. Operating system versions and what each host builds are enough; leave out
hostnames, IP addresses, credentials and anything else you would not put in an email to a
stranger.
