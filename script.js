// =========================================================
// Field Notes — shared behavior
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initSearch();
  initContactForm();
});

// ---------------------------------------------------------
// Mobile hamburger menu
// ---------------------------------------------------------
function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a link is tapped (mobile)
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------------------
// Real-time search filter (homepage only)
// ---------------------------------------------------------
function initSearch() {
  var input = document.getElementById('searchInput');
  var grid = document.getElementById('postGrid');
  var meta = document.getElementById('searchMeta');

  if (!input || !grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.post-card'));
  var noResultsMsg = grid.querySelector('.no-results');

  input.addEventListener('input', function () {
    var query = input.value.trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var title = card.getAttribute('data-title') || '';
      var isMatch = title.toLowerCase().indexOf(query) !== -1;
      card.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (query === '') {
      meta.textContent = '';
    } else {
      meta.textContent = visibleCount === 0
        ? 'No posts match "' + input.value.trim() + '"'
        : visibleCount + ' post' + (visibleCount === 1 ? '' : 's') + ' found';
    }
  });
}

// ---------------------------------------------------------
// Contact form (front-end only — no backend)
// ---------------------------------------------------------
function initContactForm() {
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.querySelector('#name').value.trim();
    status.textContent = name
      ? 'Thanks, ' + name + ' — your note has been sent.'
      : 'Thanks — your note has been sent.';
    form.reset();
  });
}
