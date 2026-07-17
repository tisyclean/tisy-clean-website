// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
});

// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const body = document.body;
menuToggle.addEventListener('click', () => {
  body.classList.toggle('menu-open');
});
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => body.classList.remove('menu-open'));
});

// FAQ accordion
document.querySelectorAll('.accordion button').forEach(btn => {
  btn.addEventListener('click', () => {
    const article = btn.parentElement;
    const isOpen = article.classList.contains('open');
    document.querySelectorAll('.accordion article').forEach(a => a.classList.remove('open'));
    if (!isOpen) article.classList.add('open');
  });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat strong[data-count]');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 30);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });
stats.forEach(s => statsObserver.observe(s));

// Contact form → WhatsApp
const form = document.getElementById('contact-form');
const serviceLabels = {
  complet: 'Complet int. + ext. (70€+)',
  interieur: 'Intérieur (35€+)',
  exterieur: 'Extérieur (50€+)',
  sieges: 'Sièges',
  canape: 'Canapé (60€+)',
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const text = [
    'Bonjour, je souhaite un devis Tisy Clean.',
    '',
    `Nom : ${data.get('name')}`,
    `Tél : ${data.get('phone')}`,
    `Service : ${serviceLabels[data.get('service')] || data.get('service')}`,
  ].join('\n');
  window.open(`https://wa.me/262693474365?text=${encodeURIComponent(text)}`, '_blank');
});

// Fade-in on scroll
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-grid article, .pack-grid article, .quote-grid article, .strengths-grid article, .float-card, .realisation-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Before / After slider
(function initBeforeAfterSlider() {
  const slider = document.getElementById('ba-slider');
  const clip = document.getElementById('ba-clip');
  const divider = document.getElementById('ba-divider');
  if (!slider || !clip || !divider) return;

  let position = 50;
  let dragging = false;

  const setPosition = (pct) => {
    position = Math.min(100, Math.max(0, pct));
    clip.style.width = `${position}%`;
    divider.style.left = `${position}%`;
    divider.setAttribute('aria-valuenow', Math.round(position));
  };

  const syncWidth = () => {
    const w = slider.offsetWidth;
    slider.style.setProperty('--ba-width', `${w}px`);
    slider.querySelectorAll('.ba-img--before').forEach((img) => {
      img.style.width = `${w}px`;
    });
  };

  const positionFromEvent = (clientX) => {
    const rect = slider.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  };

  const startDrag = () => {
    dragging = true;
    slider.classList.add('is-dragging');
    document.body.style.userSelect = 'none';
  };

  const endDrag = () => {
    dragging = false;
    slider.classList.remove('is-dragging');
    document.body.style.userSelect = '';
  };

  const onMove = (clientX) => {
    if (!dragging) return;
    setPosition(positionFromEvent(clientX));
  };

  divider.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag();
  });

  slider.addEventListener('mousedown', (e) => {
    if (e.target === divider || divider.contains(e.target)) return;
    e.preventDefault();
    setPosition(positionFromEvent(e.clientX));
    startDrag();
  });

  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', endDrag);

  divider.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrag();
  }, { passive: false });

  slider.addEventListener('touchstart', (e) => {
    if (e.target === divider || divider.contains(e.target)) return;
    const touch = e.touches[0];
    setPosition(positionFromEvent(touch.clientX));
    startDrag();
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    e.preventDefault();
    onMove(e.touches[0].clientX);
  }, { passive: false });

  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchcancel', endDrag);

  divider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPosition(position - 2); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPosition(position + 2); }
  });

  syncWidth();
  setPosition(50);
  window.addEventListener('resize', syncWidth);
})();

// Galerie réalisations — filtres, modale, afficher plus
(function initRealisationsGallery() {
  const grid = document.getElementById('realisations-grid');
  const modal = document.getElementById('realisations-modal');
  if (!grid || !modal) return;

  const cards = Array.from(grid.querySelectorAll('.realisation-card'));
  const filters = Array.from(document.querySelectorAll('.realisations-filter'));
  const emptyState = document.getElementById('realisations-empty');
  const showAllBtn = document.getElementById('realisations-show-all');
  const closeBtn = document.getElementById('realisations-modal-close');
  const backdrop = modal.querySelector('[data-close-modal]');
  const modalBadge = document.getElementById('realisations-modal-badge');
  const modalTitle = document.getElementById('realisations-modal-title');
  const modalLocation = document.getElementById('realisations-modal-location');
  const modalDesc = document.getElementById('realisations-modal-desc');
  const modalGallery = document.getElementById('realisations-modal-gallery');

  let activeFilter = 'all';
  let lastFocused = null;

  const applyFilter = (filter) => {
    activeFilter = filter;
    let visibleCount = 0;

    filters.forEach((btn) => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    cards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      const isExtraHidden = card.classList.contains('realisation-card--extra') && !grid.classList.contains('is-expanded');
      const shouldShow = matches && !isExtraHidden;
      card.classList.toggle('is-hidden', !shouldShow);
      if (shouldShow) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    btn.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const index = filters.indexOf(btn);
      const next = e.key === 'ArrowRight'
        ? filters[(index + 1) % filters.length]
        : filters[(index - 1 + filters.length) % filters.length];
      next.focus();
      applyFilter(next.dataset.filter);
    });
  });

  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      grid.classList.add('is-expanded');
      showAllBtn.setAttribute('aria-expanded', 'true');
      showAllBtn.hidden = true;
      applyFilter(activeFilter);
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const openModal = (card) => {
    const images = (card.dataset.images || '').split('|').filter(Boolean);
    const service = card.dataset.service || '';
    const title = card.dataset.title || '';

    modalBadge.textContent = service;
    modalTitle.textContent = title;
    modalLocation.textContent = card.dataset.location || '';
    modalDesc.textContent = card.dataset.description || '';

    modalGallery.innerHTML = images.map((src, index) => {
      const alt = `${title} — photo ${index + 1}`;
      return `<img src="${src}" alt="${alt}" loading="lazy" />`;
    }).join('');

    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalGallery.innerHTML = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  };

  cards.forEach((card) => {
    const trigger = card.querySelector('.realisation-card__open');
    if (!trigger) return;
    trigger.addEventListener('click', () => openModal(card));
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  const modalCta = document.getElementById('realisations-modal-cta');
  if (modalCta) modalCta.addEventListener('click', closeModal);

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  applyFilter('all');
})();

// Liquid line animation
const liquidLine = document.querySelector('.liquid-line');
if (liquidLine) {
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
    liquidLine.style.transform = `scaleX(${progress})`;
  });
}
