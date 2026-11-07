---
template: landing.html
description: "Agent8 is free and MIT. Paid help: a plugin compatibility check for $1,500, a pilot on your AIX, Solaris or HP-UX hosts for $4,000, and yearly support from $3,000 per controller."
jsonld:
  - {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Agent8 for Jenkins", "url": "https://keelinfra.io/jenkins/", "license": "https://opensource.org/licenses/MIT", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}
  - {"@context": "https://schema.org", "@type": "Service", "name": "Plugin compatibility check", "provider": {"@type": "Organization", "name": "keelinfra"}, "offers": {"@type": "Offer", "price": "1500", "priceCurrency": "USD"}}
  - {"@context": "https://schema.org", "@type": "Service", "name": "Pilot on your platform", "provider": {"@type": "Organization", "name": "keelinfra"}, "offers": {"@type": "Offer", "price": "4000", "priceCurrency": "USD"}}
  - {"@context": "https://schema.org", "@type": "Service", "name": "Standard", "provider": {"@type": "Organization", "name": "keelinfra"}, "offers": {"@type": "Offer", "price": "3000", "priceCurrency": "USD"}}
  - {"@context": "https://schema.org", "@type": "Service", "name": "Enterprise", "provider": {"@type": "Organization", "name": "keelinfra"}, "offers": {"@type": "Offer", "price": "8000", "priceCurrency": "USD"}}
hero:
  title: Agent8 is free.<br>You pay for someone on the hook.
  text: >-
    The code is MIT and stays that way. What you pay for is what code alone does not give you: a
    tested build for each Jenkins LTS, checks on your real platform, and someone who answers when
    a controller upgrade leaves your build hosts offline.
sections:
  - type: features
    id: oss
    columns: 1
    items:
      - title: Open source, $0
        icon: brand-github
        text: >-
          The install script, the Ansible playbook, and releases for the current Jenkins LTS and
          weekly, each named after the Jenkins version it was tested with. Bugs go to
          [GitHub issues](https://github.com/keelinfra/agent8/issues).
          [How Agent8 works →](index.md)
        actions:
          - {text: View on GitHub, link: "https://github.com/keelinfra/agent8"}
  - type: include
    template: partials/pricing.html
    id: services
    eyebrow: One-off
    title: Find out before you roll out
    text: >-
      Fixed scope, agreed before work starts. Not sure what you need? The
      [first answer is free](../jenkins-assessment.md).
    items:
      - name: Plugin compatibility check
        price: $1,500
        note: fixed price
        bullets:
          - The plugins your builds use on old hosts, run on Agent8 with your host's Java
          - Your Jenkins version, and the next LTS you plan to move to
          - "Written report: what works, what breaks, and what to do about each"
          - Delivered within ten business days of getting your plugin list
        actions:
          - {text: Ask for a check, link: "mailto:hello@keelinfra.io?subject=Agent8%20plugin%20compatibility%20check"}
      - name: Pilot on your platform
        price: $4,000
        note: fixed price, up to 3 hosts
        bullets:
          - Agent8 installed on up to 3 AIX, Solaris or HP-UX hosts with your team
          - Your own jobs run end to end, including aborts and agent restarts
          - We fix what breaks there in Agent8, or tell you in writing why we cannot
          - Written report and a rollout runbook for the rest of the fleet
        actions:
          - {text: Plan a pilot, link: "mailto:hello@keelinfra.io?subject=Agent8%20pilot"}
  - type: include
    template: partials/pricing.html
    id: support
    eyebrow: Yearly support
    title: Keep up with every controller upgrade
    text: >-
      Jenkins raises the oldest agent it accepts over time, so an Agent8 jar that works today is
      eventually refused: Jenkins 2.586 already refuses the build for 2.462.3. Support means a
      tested build is ready before you upgrade.
    items:
      - name: Standard
        price: $3,000
        note: per controller, per year, up to 20 hosts
        bullets:
          - A tested Agent8 build within five business days of every Jenkins LTS
          - Your installed build checked against each upcoming LTS, with a warning before it would be refused
          - Email support from the engineer who builds Agent8, reply within two business days
          - Help with each controller upgrade across your hosts
        actions:
          - {text: Ask about Standard, link: "mailto:hello@keelinfra.io?subject=Agent8%20Standard%20support"}
      - name: Enterprise
        price: from $8,000
        note: per year, any number of hosts
        bullets:
          - Everything in Standard, for all your controllers
          - Each new build verified on your OS and Java versions before you get it
          - Signed jars and an SBOM, prepared for your security review (not yet in the public releases)
          - A named engineer, reply within one business day
        actions:
          - {text: Ask about Enterprise, link: "mailto:hello@keelinfra.io?subject=Agent8%20Enterprise%20support"}
    markdown: |
      Support is new: the first customers set it up with us, and the price they start at stays
      theirs. Agent8 is independent and not endorsed or supported by the Jenkins project.
  - type: features
    id: faq
    eyebrow: FAQ
    title: Straight answers
    columns: 2
    items:
      - title: Do I need to pay to use Agent8?
        text: No. Everything in the repository is free, with no gated features. Paying adds checks on your platform, builds ready ahead of your upgrades, and people.
      - title: Could we build this ourselves?
        text: "Yes, and the code is open if you want to. The work is in keeping up: a new Jenkins release every week, a rising minimum agent version, and platforms CI cannot rent. For most teams, support costs less than an engineer's time spent on that."
      - title: What does a pilot not cover?
        text: Plugins and job types outside the jobs we run with you. The report lists what was and was not exercised, so you know what is still unverified.
      - title: What are your support hours?
        text: EU business hours. We do not sell a 24/7 SLA we cannot staff honestly.
---

# Agent8 for Jenkins pricing

Agent8 is free and MIT. Paid help: a plugin compatibility check for $1,500, a pilot on your AIX,
Solaris or HP-UX hosts for $4,000, and yearly support from $3,000 per controller.
