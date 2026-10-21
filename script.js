(() => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = motionPreference.matches;
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    items.forEach((item) => revealObserver.observe(item));
    document.documentElement.classList.add('motion-ready');
    motionPreference.addEventListener?.('change', (event) => {
      if (!event.matches) return;
      document.documentElement.classList.remove('motion-ready');
      items.forEach((item) => item.classList.add('is-visible'));
    });
  }

  const navigation = document.querySelector('#primary-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigationLinks = [...document.querySelectorAll('#primary-nav a')];
  const closeMenu = () => {
    navigation?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  };

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation?.classList.toggle('is-open', open);
  });
  navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMenu();
    menuToggle?.focus();
  });
  document.addEventListener('click', (event) => {
    if (!navigation?.classList.contains('is-open')) return;
    if (navigation.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeMenu();
  });

  const progressBar = document.querySelector('.scroll-progress span');
  let scrollTicking = false;
  const updateScrollProgress = () => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    progressBar?.style.setProperty('--page-progress', progress);
    scrollTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollProgress);
  }, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      const activeId = visible[0].target.id;
      navigationLinks.forEach((link) => {
        if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const heroArt = document.querySelector('.hero-art');
  if (heroArt && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    heroArt.addEventListener('pointermove', (event) => {
      const bounds = heroArt.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      heroArt.style.setProperty('--shift-x', `${x * 10}px`);
      heroArt.style.setProperty('--shift-y', `${y * 10}px`);
    });
    heroArt.addEventListener('pointerleave', () => {
      heroArt.style.setProperty('--shift-x', '0px');
      heroArt.style.setProperty('--shift-y', '0px');
    });
  }

  const palette = [
    { id: 'sky', name: 'Sky blue', background: '#0F172A' },
    { id: 'violet', name: 'Violet', background: '#170F2B' },
    { id: 'emerald', name: 'Emerald', background: '#081D18' },
    { id: 'amber', name: 'Amber', background: '#21170B' },
    { id: 'rose', name: 'Rose', background: '#24131B' },
    { id: 'teal', name: 'Teal', background: '#082021' },
    { id: 'white', name: 'White', background: '#F8FAFC' },
    { id: 'black', name: 'Black', background: '#050505' },
  ];
  const themeButton = document.querySelector('#theme-switch');
  const themeStatus = document.querySelector('#theme-status');
  let themeIndex = palette.findIndex((theme) => theme.id === document.documentElement.dataset.theme);
  if (themeIndex < 0) themeIndex = 6;

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const current = palette[themeIndex];
    const next = palette[(themeIndex + 1) % palette.length];
    themeButton.setAttribute('aria-label', `Change color theme. Current theme: ${current.name}, option ${themeIndex + 1} of ${palette.length}. Activate to switch to ${next.name}.`);
    themeButton.title = `Current color theme: ${current.name}. Click to switch to ${next.name}.`;
  };
  updateThemeLabel();

  themeButton?.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % palette.length;
    const selected = palette[themeIndex];
    document.documentElement.dataset.theme = selected.id;
    document.documentElement.dataset.themePicked = 'true';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', selected.background);
    updateThemeLabel();
    if (themeStatus) themeStatus.textContent = `${selected.name} color theme selected, option ${themeIndex + 1} of ${palette.length}.`;
    themeButton.classList.remove('is-changing');
    void themeButton.offsetWidth;
    themeButton.classList.add('is-changing');
    window.setTimeout(() => themeButton.classList.remove('is-changing'), 650);
  });
})();

