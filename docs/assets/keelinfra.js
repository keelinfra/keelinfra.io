// keelinfra: mail fallbacks and the lead forms.
(function () {
  var EMAIL = 'hello@keelinfra.io';

  // Under each mailto: button, show the address with a Copy button: for
  // visitors whose mailto: links open nothing (webmail only, locked-down work
  // machines). Copies are reported as copy_email, with the offer's subject.
  function subjectOf(href) {
    return new URLSearchParams((href || '').split('?')[1] || '').get('subject') || '';
  }
  document.querySelectorAll('button.ki-copy-mail[hidden]').forEach(function (b) { b.hidden = false; });
  document.querySelectorAll('a.sumi-btn[href^="mailto:"]').forEach(function (el) {
    var p = document.createElement('p');
    p.className = 'ki-mail-alt';
    p.innerHTML = 'or email <span class="ki-mail-addr"></span> <button type="button" class="ki-copy-mail">Copy</button>';
    p.querySelector('.ki-mail-addr').textContent = EMAIL;
    p.querySelector('button').dataset.subject = subjectOf(el.getAttribute('href'));
    var row = el.closest('.sumi-actions-row');
    (row || el).insertAdjacentElement('afterend', p);
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.ki-copy-mail');
    if (!b) return;
    function say(text) {
      b.textContent = text;
      setTimeout(function () { b.textContent = 'Copy'; }, 2000);
    }
    function selectAddress() {
      // No clipboard access: select the address so Ctrl/Cmd+C works.
      var span = b.parentNode.querySelector('.ki-mail-addr') || b.previousElementSibling;
      if (!span) return;
      var r = document.createRange();
      r.selectNodeContents(span);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      say('Selected');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(function () { say('Copied'); }, selectAddress);
    } else {
      selectAddress();
    }
    if (typeof gtag === 'function') {
      gtag('event', 'copy_email', { email_subject: b.dataset.subject || '', page_path: location.pathname });
    }
  });

  // The lead forms have no backend: they compose an email in the visitor's
  // own mail program. Nothing is stored or sent until they press send there.
  document.querySelectorAll('form.ki-lead-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        if (el.type === 'checkbox' && !el.checked) return;
        if (!el.value.trim()) return;
        lines.push(el.name + ':\n' + el.value.trim() + '\n');
      });
      var subject = form.dataset.subject;
      // Same lead event the mailto: links report, which this navigation bypasses.
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { method: 'email_form', email_subject: subject, page_path: location.pathname });
      }
      location.href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  });
})();
