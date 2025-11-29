
document.addEventListener('DOMContentLoaded', function () {
  // Ensure Bootstrap tab activation works reliably for dynamically many tabs
  try {
    var tabLinks = document.querySelectorAll('.nav-tabs .nav-link');
    tabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        // Use Bootstrap's Tab API if available
        if (typeof bootstrap !== 'undefined' && bootstrap.Tab) {
          var tabInstance = bootstrap.Tab.getOrCreateInstance(link);
          tabInstance.show();
        } else {
          // fallback: toggle classes manually
          tabLinks.forEach(function (l) { l.classList.remove('active', 'show'); });
          link.classList.add('active', 'show');
          var targets = document.querySelectorAll('.tab-pane');
          targets.forEach(function (tp) { tp.classList.remove('active', 'show'); });
          var target = document.querySelector(link.getAttribute('data-bs-target'));
          if (target) {
            target.classList.add('active', 'show');
          }
        }
        e.preventDefault();
      }, { passive: true });
    });
  } catch (err) {
    // silent fail
    console.error('Tab init error', err);
  }

  // Ensure WhatsApp links open in a new tab and are safe
  try {
    var waLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    waLinks.forEach(function (a) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
  } catch (err) {
    console.error('WA link init error', err);
  }
});

// End of main script