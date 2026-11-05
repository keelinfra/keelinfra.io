---
description: 'Agent8 is free and open source. Write to us for help rolling it out: AIX, Solaris and HP-UX
  pilots, plugin compatibility on a Java 8 agent, and a free first look at which path each build host
  needs.'
subtitle: First answer free · in writing · within two business days
---

# Help moving legacy build hosts to current Jenkins

[Agent8](https://github.com/keelinfra/agent8) is free and open source, and you can roll it out
yourself: the README has the install script and an Ansible playbook, and
[GitHub issues](https://github.com/keelinfra/agent8/issues) are the place for bugs.

Write to us when that is not enough:

- **Your hosts run AIX, Solaris or HP-UX.** Agent8 has been tested on AIX, Solaris and HP-UX. We run it
  with you on your platform as a pilot, and fix what breaks.
- **You need to know whether your plugins work.** Plugins that run their own code on agents
  are the main open risk on a Java 8 agent. CI tests Git checkout (JGit and command-line git)
  and credentials binding; others, such as Docker or artifact upload steps, still need testing.
  We check the ones your builds use.
- **You have many hosts, or you need longer-term support.**
- **You are not sure which path each host needs.** Some can run a normal Java 21 agent, some
  builds can move into a container, and the rest need agent8.

The first answer is free and in writing: for each host, the highest Java it can run with the
vendor source for it, the path that fits, and what we have not verified for your platform. If
every host you have can run a normal agent, that is what we will tell you. The background is in
[Jenkins requires Java 21. What happens to your AIX 7.1 and RHEL 6 build hosts?](blog/jenkins-java-21-aix-rhel6-build-hosts.md)

Leave out hostnames, IP addresses, credentials and anything else you would not put in an
email to a stranger.

Paid support has fixed prices, listed on the [pricing page](jenkins/pricing.md). Operating system versions and what each host builds are enough.

## Tell us about your build hosts {#request}

<form class="ki-lead-form" id="assessment-form" data-subject="Jenkins legacy build host assessment">
<label for="f-jenkins">Jenkins version you run today</label>
<input id="f-jenkins" name="Jenkins version today" type="text" placeholder="e.g. 2.346.3" required>
<label for="f-controller">Controller OS and Java version</label>
<input id="f-controller" name="Controller OS and Java" type="text" placeholder="e.g. RHEL 8, Java 8">
<label for="f-hosts">Build hosts that block the upgrade</label>
<textarea id="f-hosts" name="Build hosts" rows="5" required placeholder="One line per kind of host: OS and version, Java installed, how many, what it builds.&#10;e.g. AIX 7.1 TL5, IBM Java 8, 2 hosts, C/C++ release builds&#10;e.g. RHEL 6.10, 4 hosts, gcc 4.4 builds of the Linux agent"></textarea>
<label for="f-processor">AIX only: POWER generation</label>
<input id="f-processor" name="AIX POWER generation" type="text" placeholder="e.g. POWER8">
<label for="f-deadline">Is there a deadline?</label>
<input id="f-deadline" name="Deadline" type="text" placeholder="e.g. audit finding due in Q1">
<label for="f-plugins">Plugins your builds use on these hosts</label>
<input id="f-plugins" name="Plugins used on these hosts" type="text" placeholder="e.g. git, Maven, credentials binding">
<label for="f-notes">Anything else we should know</label>
<textarea id="f-notes" name="Notes" rows="3" placeholder="What you have tried, what must not change, NFS available or not, etc."></textarea>
<p>Pressing the button opens an email to hello@keelinfra.io in your mail program, with these
answers filled in. Nothing is sent until you send it, and this page stores nothing.</p>
<button type="submit">Write the email</button>
</form>

Prefer to write it yourself? Email
<a href="mailto:hello@keelinfra.io?subject=Jenkins%20legacy%20build%20host%20assessment">hello@keelinfra.io</a>
<button type="button" class="ki-copy-mail" data-subject="Jenkins legacy build host assessment" hidden>Copy</button>
with your Jenkins version and the OS versions of the hosts that hold it back.
