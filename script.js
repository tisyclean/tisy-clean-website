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
  complet: 'Nettoyage complet (199€+)',
  int_ext: 'Intérieur + extérieur (99€+)',
  interieur: 'Nettoyage intérieur (69€+)',
  exterieur: 'Nettoyage extérieur (55€+)',
  phares: 'Rénovation des phares (69€)',
  sieges: 'Sièges',
  canape: 'Canapé (79€+)',
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
  const modalService = document.getElementById('realisations-modal-service');
  const modalLocation = document.getElementById('realisations-modal-location');
  const modalDesc = document.getElementById('realisations-modal-desc');
  const modalGallery = document.getElementById('realisations-modal-gallery');

  let activeFilter = 'all';
  let lastFocused = null;
  let destroyModalBa = null;

  const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const mediaBlock = (src, alt, className = '') => {
    const safeSrc = escapeHtml(src);
    const safeAlt = escapeHtml(alt);
    return `
      <div class="modal-media ${className}">
        <img
          src="${safeSrc}"
          alt="${safeAlt}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.hidden=false;"
        />
        <div class="media-placeholder" hidden>Photo à ajouter</div>
      </div>
    `;
  };

  const baSide = (src, alt) => {
    if (!src) {
      return `<div class="media-placeholder">Photo à ajouter</div>`;
    }
    const safeSrc = escapeHtml(src);
    const safeAlt = escapeHtml(alt);
    return `
      <img
        src="${safeSrc}"
        alt="${safeAlt}"
        loading="lazy"
        draggable="false"
      />
    `;
  };

  const initModalBeforeAfter = (slider) => {
    if (!slider) return () => {};

    const clip = slider.querySelector('.modal-ba__clip');
    const divider = slider.querySelector('.modal-ba__divider');
    if (!clip || !divider) return () => {};

    let position = 50;
    let dragging = false;

    const setPosition = (pct) => {
      syncWidth();
      position = Math.min(100, Math.max(0, pct));
      clip.style.width = `${position}%`;
      divider.style.left = `${position}%`;
      divider.setAttribute('aria-valuenow', Math.round(position));
    };

    const syncWidth = () => {
      const w = slider.offsetWidth;
      if (!w) return;
      slider.style.setProperty('--modal-ba-width', `${w}px`);
      const beforeImg = clip.querySelector('img');
      if (beforeImg) {
        beforeImg.style.width = `${w}px`;
        beforeImg.style.maxWidth = 'none';
      }
    };

    const positionFromEvent = (clientX) => {
      const rect = slider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };

    const startDrag = () => { dragging = true; };
    const endDrag = () => { dragging = false; };
    const onMove = (clientX) => {
      if (!dragging) return;
      setPosition(positionFromEvent(clientX));
    };

    const onMouseDown = (e) => {
      e.preventDefault();
      setPosition(positionFromEvent(e.clientX));
      startDrag();
    };
    const onMouseMove = (e) => onMove(e.clientX);
    const onTouchStart = (e) => {
      e.preventDefault();
      setPosition(positionFromEvent(e.touches[0].clientX));
      startDrag();
    };
    const onTouchMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setPosition(position - 2); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setPosition(position + 2); }
    };

    divider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', endDrag);
    divider.addEventListener('touchstart', onTouchStart, { passive: false });
    slider.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchcancel', endDrag);
    divider.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', syncWidth);

    const onImageReady = () => {
      syncWidth();
      setPosition(position);
    };
    slider.querySelectorAll('img').forEach((img) => {
      if (img.complete) onImageReady();
      else img.addEventListener('load', onImageReady, { once: true });
    });

    requestAnimationFrame(() => {
      syncWidth();
      setPosition(50);
    });

    return () => {
      divider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      divider.removeEventListener('touchstart', onTouchStart);
      slider.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', endDrag);
      window.removeEventListener('touchcancel', endDrag);
      divider.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', syncWidth);
    };
  };

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
    const before = card.dataset.before || '';
    const after = card.dataset.after || '';
    const during = card.dataset.during || '';
    const service = card.dataset.service || '';
    const badge = card.dataset.badge || service;
    const title = card.dataset.title || '';
    const location = card.dataset.location || '';

    modalBadge.textContent = badge;
    modalTitle.textContent = title;

    if (modalService) {
      if (service && service !== badge) {
        modalService.hidden = false;
        modalService.textContent = service;
      } else {
        modalService.hidden = true;
        modalService.textContent = '';
      }
    }

    modalLocation.textContent = location;
    modalDesc.textContent = card.dataset.description || '';

    if (destroyModalBa) {
      destroyModalBa();
      destroyModalBa = null;
    }

    let galleryHtml = '';

    if (before || after) {
      galleryHtml += `
        <div class="modal-ba" id="modal-ba-slider">
          <div class="modal-ba__after">
            ${baSide(after, `${title} — après nettoyage`)}
          </div>
          <div class="modal-ba__clip">
            ${baSide(before, `${title} — avant nettoyage`)}
          </div>
          <div
            class="modal-ba__divider"
            role="slider"
            tabindex="0"
            aria-label="Comparer avant et après"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="50"
          >
            <div class="modal-ba__handle"><i class="fa-solid fa-arrows-left-right" aria-hidden="true"></i></div>
          </div>
          <span class="ba-label before">Avant</span>
          <span class="ba-label after">Après</span>
        </div>
        <p class="modal-ba-caption">Glissez le curseur pour comparer avant et après</p>
      `;
    }

    if (during) {
      galleryHtml += `
        <p class="modal-during-label">Pendant l'intervention</p>
        ${mediaBlock(during, `${title} — pendant le nettoyage`)}
      `;
    }

    if (images.length) {
      galleryHtml += images.map((src, index) => mediaBlock(src, `${title} — photo ${index + 1}`)).join('');
    }

    modalGallery.innerHTML = galleryHtml;

    if (before || after) {
      destroyModalBa = initModalBeforeAfter(document.getElementById('modal-ba-slider'));
    }

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
    if (destroyModalBa) {
      destroyModalBa();
      destroyModalBa = null;
    }
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

// Liquid line reveal (hero scroll progress)
const liquidLine = document.querySelector('.liquid-line');
function updateLiquidLineScale() {
  if (!liquidLine) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
  liquidLine.style.transform = `scaleX(${progress})`;
}

// Neon bars — dégradé dynamique lié au scroll
(function initNeonBarGradient() {
  const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TITLE_BAR_WIDTH = {
    'title-bar--sm': 'neon-bar--w-sm',
    'title-bar--md': 'neon-bar--w-md',
    'title-bar--lg': 'neon-bar--w-lg',
  };

  function widthClassForTitle(h2) {
    for (const [titleCls, barCls] of Object.entries(TITLE_BAR_WIDTH)) {
      if (h2.classList.contains(titleCls)) return barCls;
    }
    return 'neon-bar--w-md';
  }

  function createBar(variant, extraClass) {
    const bar = document.createElement('span');
    bar.className = ['neon-bar', `neon-bar--${variant}`, extraClass].filter(Boolean).join(' ');
    bar.setAttribute('aria-hidden', 'true');
    return bar;
  }

  function wrapTitleWithBar(titleEl, bar, options = {}) {
    if (titleEl.closest('.title-bar-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'title-bar-wrap';
    if (options.centered) wrap.classList.add('title-bar-wrap--centered');
    if (options.hero) wrap.classList.add('title-bar-wrap--hero');
    const parent = titleEl.parentNode;
    parent.insertBefore(wrap, titleEl);
    wrap.appendChild(titleEl);
    wrap.appendChild(bar);
  }

  function mountHeroSloganBar() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent || heroContent.querySelector('.title-bar-wrap--hero')) return;
    const h1s = Array.from(heroContent.querySelectorAll('h1'));
    if (!h1s.length) return;
    const lastH1 = h1s[h1s.length - 1];
    let bar = lastH1.nextElementSibling?.classList?.contains('neon-bar')
      ? lastH1.nextElementSibling
      : createBar('red', 'neon-bar--hero');
    const wrap = document.createElement('div');
    wrap.className = 'title-bar-wrap title-bar-wrap--hero';
    heroContent.insertBefore(wrap, h1s[0]);
    h1s.forEach((h1) => wrap.appendChild(h1));
    if (bar.parentNode !== wrap) wrap.appendChild(bar);
  }

  function mountTitleBar(h2) {
    if (h2.closest('.title-bar-wrap')) return;
    let bar = h2.nextElementSibling;
    if (!bar?.classList?.contains('neon-bar')) {
      bar = createBar('accent', widthClassForTitle(h2));
      h2.insertAdjacentElement('afterend', bar);
    }
    wrapTitleWithBar(h2, bar, {
      centered: Boolean(h2.closest('.section-head.centered')),
    });
  }

  function mountNeonBars() {
    mountHeroSloganBar();
    document.querySelectorAll('.section-head.centered h2, .booking-title h2').forEach(mountTitleBar);
    if (liquidLine) {
      liquidLine.classList.add('neon-bar', 'neon-bar--accent');
    }
  }

  mountNeonBars();

  const BASE = { blue: 28, mauve: 50, red: 72, redMid: 50 };

  function applyAccentGradient(bar, phase) {
    const wobble = Math.sin(phase * 2.4) * 1.2;
    const wobble2 = Math.sin(phase * 1.7 + 0.6) * 1.5;
    let blue = BASE.blue + phase * 11 + wobble * 0.6;
    let mauve = BASE.mauve + phase * 13 + wobble;
    let red = BASE.red + phase * 15 + wobble2;
    blue = Math.max(14, Math.min(40, blue));
    mauve = Math.max(blue + 10, Math.min(62, mauve));
    red = Math.max(mauve + 10, Math.min(84, red));
    const luma = Math.min(1, Math.abs(phase) * 0.85 + Math.abs(wobble) * 0.08);
    bar.style.setProperty('--bar-blue', `${blue}%`);
    bar.style.setProperty('--bar-mauve', `${mauve}%`);
    bar.style.setProperty('--bar-red-stop', `${red}%`);
    bar.style.setProperty('--bar-luma', String(luma));
  }

  function applyRedGradient(bar, phase) {
    const mid = Math.max(38, Math.min(62, BASE.redMid + phase * 8 + Math.sin(phase * 2.1) * 2));
    const luma = Math.min(1, Math.abs(phase) * 0.75);
    bar.style.setProperty('--bar-red-mid', `${mid}%`);
    bar.style.setProperty('--bar-luma', String(luma));
  }

  if (!motionOk) {
    window.addEventListener('scroll', updateLiquidLineScale, { passive: true });
    updateLiquidLineScale();
    return;
  }

  let lastScrollY = window.scrollY;
  let phase = 0;
  let phaseVel = 0;
  let rafId = 0;

  function isBarVisible(bar) {
    const r = bar.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }

  function tick() {
    const dy = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;

    if (Math.abs(dy) > 0.25) {
      phaseVel += dy * 0.0022;
    }
    phaseVel *= 0.9;
    phase += phaseVel;
    phase *= 0.985;

    document.querySelectorAll('.neon-bar').forEach((bar) => {
      if (!isBarVisible(bar)) return;
      if (bar.classList.contains('neon-bar--accent')) {
        applyAccentGradient(bar, phase);
      } else if (bar.classList.contains('neon-bar--red')) {
        applyRedGradient(bar, phase);
      }
    });

    updateLiquidLineScale();
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();

// Simulateur de devis (tarifs affichés sur le site uniquement)
(function initQuoteEstimator() {
  const form = document.getElementById('quote-estimator-form');
  if (!form) return;

  const WHATSAPP = '262693474365';
  const TOTAL_STEPS = 6;
  const PROGRESS_STEP_COUNT = 5;
  const PROGRESS_STEP_NAMES = {
    1: 'Type de véhicule',
    2: 'Prestation',
    3: 'État du véhicule',
    4: 'Options supplémentaires',
    5: 'Commune d\'intervention',
  };
  const VEHICLE_LABELS = {
    citadine: 'Citadine',
    berline: 'Berline',
    suv: 'SUV',
    monospace: 'Monospace',
    seven: '7 places',
  };
  const SERVICE_META = {
    interieur: { label: 'Nettoyage intérieur', from: true, amount: 69 },
    exterieur: { label: 'Nettoyage extérieur', from: true, amount: 55 },
    int_ext: { label: 'Intérieur + extérieur', from: true, amount: 99 },
    complet: { label: 'Nettoyage complet (sièges inclus)', from: true, amount: 199 },
    phares: { label: 'Rénovation des phares', from: false, amount: 69 },
    canape: { label: 'Nettoyage de canapé', from: true, amount: 79 },
  };
  const CONDITION_LABELS = {
    light: 'Peu sale',
    dirty: 'Sale',
    very_dirty: 'Très sale',
  };
  const OPTION_META = {
    phares_addon: { label: 'Rénovation des phares', amount: 69 },
    seat_1: { label: 'Extraction 1 siège', amount: 49 },
    seat_5: { label: 'Sièges 5 places', amount: 169 },
    seat_7: { label: 'Sièges 7 places', amount: 269 },
  };

  const steps = Array.from(form.querySelectorAll('.quote-step'));
  const prevBtn = document.getElementById('quote-prev');
  const continueBtn = document.getElementById('quote-continue');
  const optionsNoneBtn = document.getElementById('quote-options-none');
  const progressRoot = document.getElementById('quote-progress');
  const progressTrack = document.getElementById('quote-progress-track');
  const progressFill = document.getElementById('quote-progress-fill');
  const progressStatus = document.getElementById('quote-progress-status');
  const progressStepName = document.getElementById('quote-progress-step-name');
  const stepTotal = document.getElementById('quote-step-total');
  const stepLive = document.getElementById('quote-step-live');
  const panelEl = form.closest('.quote-estimator__panel');
  const vehicleHint = document.getElementById('quote-vehicle-hint');
  const waBtn = document.getElementById('quote-whatsapp');
  const isMobileFlow = () => window.matchMedia('(max-width: 899px)').matches;
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const advanceMs = () => (prefersReducedMotion() ? 0 : 300);
  let currentStep = 1;
  let advanceTimer = null;
  let isAdvancing = false;
  let lastPriceText = '';
  let progressPulseTimer = null;
  let lastProgressKey = null;

  function getState() {
    const fd = new FormData(form);
    return {
      vehicle: fd.get('vehicle'),
      service: fd.get('service'),
      condition: fd.get('condition'),
      commune: fd.get('commune'),
      options: fd.getAll('options'),
    };
  }

  function formatMoney(amount, from) {
    return from ? `À partir de ${amount} €` : `${amount} €`;
  }

  function computeEstimate(state) {
    if (!state.service) {
      return {
        surDevis: false,
        idle: true,
        text: 'Sélectionnez une prestation pour obtenir une estimation',
      };
    }

    const service = SERVICE_META[state.service];
    if (!service) {
      return { surDevis: true, text: 'Sur devis', detail: 'Prestation non reconnue.' };
    }

    const seatOpts = state.options.filter((o) => o.startsWith('seat_'));
    if (seatOpts.length > 1) {
      return {
        surDevis: true,
        text: 'Sur devis',
        detail: 'Plusieurs formules sièges sélectionnées : devis personnalisé requis.',
      };
    }

    if (state.condition === 'very_dirty') {
      return {
        surDevis: true,
        text: 'Sur devis',
        detail: 'État très sale : aucun supplément automatique — confirmation après évaluation.',
      };
    }

    if (state.commune === 'autre') {
      return {
        surDevis: true,
        text: 'Sur devis',
        detail: 'Commune hors zone habituelle : faisabilité et tarif à confirmer.',
      };
    }

    let total = service.amount;
    const fromLabel = service.from;

    state.options.forEach((key) => {
      const meta = OPTION_META[key];
      if (!meta) return;
      if (state.service === 'phares' && key === 'phares_addon') return;
      if (state.service === 'complet' && key.startsWith('seat_')) return;
      if (state.service === 'canape') return;
      total += meta.amount;
    });

    const useFrom = fromLabel || state.options.length > 0;

    return {
      surDevis: false,
      text: formatMoney(total, useFrom),
      detail:
        'Basé sur les tarifs affichés sur le site (sans majoration taille ou état du véhicule).',
      total,
      from: useFrom,
    };
  }

  function updateSummary() {
    const state = getState();
    const est = computeEstimate(state);

    document.getElementById('sum-vehicle').textContent =
      state.service === 'canape'
        ? 'Non applicable (canapé)'
        : VEHICLE_LABELS[state.vehicle] || '—';
    document.getElementById('sum-service').textContent =
      SERVICE_META[state.service]?.label || '—';
    document.getElementById('sum-condition').textContent =
      CONDITION_LABELS[state.condition] || '—';
    document.getElementById('sum-options').textContent = state.options.length
      ? state.options.map((k) => OPTION_META[k]?.label).filter(Boolean).join(', ')
      : 'Aucune';
    document.getElementById('sum-commune').textContent = state.commune || '—';

    const priceEl = document.getElementById('sum-price');
    const detailEl = document.getElementById('sum-price-detail');
    const recapPriceEl = document.getElementById('sum-price-recap');
    if (priceEl) {
      if (est.text !== lastPriceText) {
        lastPriceText = est.text;
        priceEl.textContent = est.text;
        priceEl.classList.remove('quote-estimator__price-value--tick');
        if (!prefersReducedMotion()) {
          void priceEl.offsetWidth;
          priceEl.classList.add('quote-estimator__price-value--tick');
        }
      }
    }
    if (recapPriceEl) recapPriceEl.textContent = est.text;
    if (detailEl) {
      if (est.idle) {
        detailEl.hidden = true;
        detailEl.textContent = '';
      } else {
        detailEl.hidden = false;
        detailEl.textContent = est.detail || '';
      }
    }

    const ready =
      state.service &&
      state.condition &&
      state.commune &&
      (state.service === 'canape' || state.vehicle);

    const showWa = ready && (!isMobileFlow() || currentStep === TOTAL_STEPS);
    if (waBtn) {
      waBtn.hidden = !showWa;
      if (ready) {
        const lines = [
          'Bonjour, je souhaite recevoir mon devis personnalisé Tisy Clean.',
          '',
          `Véhicule : ${state.service === 'canape' ? 'Canapé (non applicable)' : VEHICLE_LABELS[state.vehicle] || '—'}`,
          `Prestation : ${SERVICE_META[state.service]?.label || '—'}`,
          `État : ${CONDITION_LABELS[state.condition] || '—'}`,
          `Options : ${state.options.length ? state.options.map((k) => OPTION_META[k]?.label).join(', ') : 'Aucune'}`,
          `Commune : ${state.commune}`,
          `Estimation indicative affichée : ${est.text}`,
          '',
          'Je comprends que le tarif définitif sera confirmé après examen de ma demande.',
        ];
        waBtn.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
      }
    }
    syncNav();
  }

  function syncOptionsAvailability() {
    const service = getState().service;
    form.querySelectorAll('.quote-option').forEach((row) => {
      const input = row.querySelector('input');
      if (!input) return;
      let disabled = false;
      if (service === 'canape' || service === 'phares') disabled = true;
      if (service === 'complet' && input.value.startsWith('seat_')) disabled = true;
      if (service === 'phares' && input.value === 'phares_addon') disabled = true;
      if (!service) disabled = true;
      row.classList.toggle('is-disabled', disabled);
      if (disabled) input.checked = false;
    });
  }

  function syncVehicleStep() {
    const isCanape = getState().service === 'canape';
    form.querySelectorAll('input[name="vehicle"]').forEach((input) => {
      input.required = !isCanape && isMobileFlow() && currentStep === 1;
      input.disabled = isCanape;
    });
    if (vehicleHint) {
      vehicleHint.textContent = isCanape
        ? 'Prestation canapé : le type de véhicule n\'influence pas l\'estimation.'
        : 'Sélectionnez la catégorie la plus proche de votre véhicule.';
    }
  }

  function seatExclusive(e) {
    const t = e.target;
    if (t.name !== 'options' || !t.checked || !t.value.startsWith('seat_')) return;
    form.querySelectorAll('input[name="options"]').forEach((input) => {
      if (input !== t && input.value.startsWith('seat_')) input.checked = false;
    });
  }

  function validateStep(step) {
    const fieldset = steps.find((s) => Number(s.dataset.step) === step);
    if (!fieldset) return true;
    if (step === 1 && getState().service === 'canape') return true;
    if (step === 4) return true;
    const required = fieldset.querySelectorAll('input, select');
    for (const el of required) {
      if (el.disabled) continue;
      if (el.type === 'radio' && !form.querySelector(`input[name="${el.name}"]:checked`)) return false;
      if (el.required && !el.value && el.type !== 'radio') return false;
    }
    return true;
  }

  function clearAdvanceTimer() {
    if (advanceTimer) {
      clearTimeout(advanceTimer);
      advanceTimer = null;
    }
  }

  function flashCard(input) {
    if (prefersReducedMotion() || !input) return;
    const card = input.closest('.quote-card');
    if (!card) return;
    card.classList.remove('quote-card--advance-flash');
    void card.offsetWidth;
    card.classList.add('quote-card--advance-flash');
  }

  function flashOptionsNone() {
    if (prefersReducedMotion() || !optionsNoneBtn) return;
    optionsNoneBtn.classList.remove('quote-option--advance-flash');
    void optionsNoneBtn.offsetWidth;
    optionsNoneBtn.classList.add('quote-option--advance-flash');
  }

  function scrollSimulatorIntoView() {
    if (!isMobileFlow() || !panelEl) return;
    const header = document.getElementById('header');
    const offset = (header ? header.offsetHeight : 0) + 12;
    const top = panelEl.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }

  function setContinueVisible(visible) {
    if (!continueBtn) return;
    continueBtn.hidden = !visible;
    continueBtn.disabled = !visible;
    if (visible) {
      continueBtn.removeAttribute('aria-hidden');
      continueBtn.removeAttribute('tabindex');
    } else {
      continueBtn.setAttribute('aria-hidden', 'true');
      continueBtn.tabIndex = -1;
    }
  }

  function syncNav() {
    const onRecapStep = currentStep === TOTAL_STEPS;
    const showContinue = isMobileFlow() && currentStep === 4;

    setContinueVisible(showContinue);

    form.classList.toggle('quote-estimator__form--on-recap', isMobileFlow() && onRecapStep);

    if (!isMobileFlow()) {
      setContinueVisible(false);
      form.classList.remove('quote-estimator__form--on-recap');
      return;
    }

    const state = getState();
    if (prevBtn) {
      prevBtn.hidden = false;
      prevBtn.disabled =
        currentStep <= 1 || (currentStep === 2 && state.service === 'canape');
    }
  }

  function inferProgressStep() {
    if (isMobileFlow()) {
      if (currentStep >= TOTAL_STEPS) return { index: 5, recap: true };
      return { index: Math.min(currentStep, PROGRESS_STEP_COUNT), recap: false };
    }
    const s = getState();
    const hasVehicle = s.service === 'canape' || Boolean(s.vehicle);
    const ready = Boolean(s.service && s.condition && s.commune && hasVehicle);
    if (ready) return { index: 5, recap: true };
    if (s.condition && s.service && hasVehicle) return { index: 5, recap: false };
    if (s.service && hasVehicle) return { index: 4, recap: false };
    if (s.service) return { index: 3, recap: false };
    if (s.vehicle) return { index: 2, recap: false };
    return { index: 1, recap: false };
  }

  function syncProgressGradientWidth() {
    if (!progressFill || !progressTrack) return;
    progressFill.style.setProperty('--quote-progress-w', `${progressTrack.offsetWidth}px`);
  }

  function syncProgressUI({ pulse = false } = {}) {
    const { index, recap } = inferProgressStep();
    const progressKey = recap ? 'recap' : String(index);
    const changed = lastProgressKey !== null && lastProgressKey !== progressKey;
    lastProgressKey = progressKey;

    const percent = recap ? 100 : (index / PROGRESS_STEP_COUNT) * 100;
    syncProgressGradientWidth();
    if (progressFill) progressFill.style.width = `${percent}%`;

    if (stepTotal) stepTotal.textContent = String(PROGRESS_STEP_COUNT);

    if (recap) {
      if (progressStatus) progressStatus.textContent = 'Estimation terminée';
      if (progressStepName) progressStepName.textContent = 'Récapitulatif';
      if (stepLive) stepLive.textContent = 'Estimation terminée. Récapitulatif.';
    } else {
      if (progressStatus) {
        progressStatus.innerHTML = `Étape <span id="quote-step-current">${index}</span> sur <span id="quote-step-total">${PROGRESS_STEP_COUNT}</span>`;
      }
      if (progressStepName) {
        progressStepName.textContent = PROGRESS_STEP_NAMES[index] || '';
      }
      if (stepLive) {
        stepLive.textContent = `Étape ${index} sur ${PROGRESS_STEP_COUNT} : ${PROGRESS_STEP_NAMES[index] || ''}`;
      }
    }

    if (progressRoot) progressRoot.classList.toggle('quote-estimator__progress--recap', recap);

    if (pulse && changed && progressRoot && !prefersReducedMotion()) {
      progressRoot.classList.add('quote-estimator__progress--pulse');
      clearTimeout(progressPulseTimer);
      progressPulseTimer = setTimeout(() => {
        progressRoot?.classList.remove('quote-estimator__progress--pulse');
      }, 420);
    }
  }

  function announceStep(fieldset) {
    if (!stepLive || !fieldset) return;
    if (currentStep >= TOTAL_STEPS) return;
    const legend = fieldset.querySelector('legend');
    stepLive.textContent = legend ? `Étape : ${legend.textContent}` : '';
  }

  function goToNextStep(fromStep) {
    if (!isMobileFlow()) return;
    if (fromStep !== currentStep || isAdvancing) return;
    if (!validateStep(fromStep)) return;
    isAdvancing = true;
    clearAdvanceTimer();
    setStep(fromStep + 1);
    requestAnimationFrame(() => {
      isAdvancing = false;
    });
  }

  function scheduleAutoAdvance(fromStep, input) {
    if (!isMobileFlow() || isAdvancing || fromStep !== currentStep) return;
    clearAdvanceTimer();
    flashCard(input);
    advanceTimer = setTimeout(() => goToNextStep(fromStep), advanceMs());
  }

  function handleSingleChoiceAdvance(target) {
    if (!isMobileFlow() || isAdvancing || !target.checked) return;
    const stepMap = {
      vehicle: 1,
      service: 2,
      condition: 3,
      commune: 5,
    };
    const step = stepMap[target.name];
    if (step && step === currentStep) scheduleAutoAdvance(step, target);
  }

  function setStep(step) {
    clearAdvanceTimer();
    const previousStep = currentStep;
    currentStep = Math.max(1, Math.min(TOTAL_STEPS, step));
    steps.forEach((s) => {
      const n = Number(s.dataset.step);
      if (isMobileFlow()) {
        const active = n === currentStep;
        s.classList.toggle('is-active', active);
        s.toggleAttribute('hidden', !active);
      } else {
        s.classList.add('is-active');
        s.removeAttribute('hidden');
      }
    });
    const activeFieldset = steps.find((s) => Number(s.dataset.step) === currentStep);
    if (activeFieldset && isMobileFlow()) {
      announceStep(activeFieldset);
      scrollSimulatorIntoView();
      const legend = activeFieldset.querySelector('legend');
      if (legend) {
        legend.setAttribute('tabindex', '-1');
        legend.focus({ preventScroll: true });
      }
    }
    form.classList.add('quote-estimator__form--ready');
    syncProgressUI({ pulse: previousStep !== currentStep });
    syncNav();
    syncVehicleStep();
    updateSummary();
  }

  prevBtn?.addEventListener('click', () => {
    clearAdvanceTimer();
    isAdvancing = false;
    if (currentStep > 1) setStep(currentStep - 1);
  });

  continueBtn?.addEventListener('click', () => {
    if (currentStep !== 4) return;
    goToNextStep(4);
  });

  optionsNoneBtn?.addEventListener('click', () => {
    if (!isMobileFlow() || currentStep !== 4 || isAdvancing) return;
    form.querySelectorAll('input[name="options"]').forEach((input) => {
      input.checked = false;
    });
    optionsNoneBtn.classList.add('is-selected');
    updateSummary();
    clearAdvanceTimer();
    flashOptionsNone();
    advanceTimer = setTimeout(() => {
      optionsNoneBtn.classList.remove('is-selected');
      goToNextStep(4);
    }, advanceMs());
  });

  form.addEventListener('change', (e) => {
    seatExclusive(e);
    syncOptionsAvailability();
    syncVehicleStep();
    if (e.target.name === 'options' && optionsNoneBtn) {
      optionsNoneBtn.classList.remove('is-selected');
    }
    updateSummary();
    handleSingleChoiceAdvance(e.target);
    syncNav();
    if (!isMobileFlow()) syncProgressUI();
  });

  form.addEventListener('input', () => {
    updateSummary();
    if (!isMobileFlow()) syncProgressUI();
  });

  window.addEventListener('resize', () => {
    clearAdvanceTimer();
    isAdvancing = false;
    if (!isMobileFlow()) {
      steps.forEach((s) => {
        s.classList.add('is-active');
        s.removeAttribute('hidden');
      });
      updateSummary();
      syncNav();
      syncProgressUI();
    } else {
      setStep(currentStep);
    }
    syncProgressGradientWidth();
  });

  syncOptionsAvailability();
  syncVehicleStep();
  updateSummary();
  syncProgressUI();
  if (isMobileFlow()) setStep(1);
  else {
    steps.forEach((s) => {
      s.classList.add('is-active');
      s.removeAttribute('hidden');
    });
    syncNav();
  }
})();
