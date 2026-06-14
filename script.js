document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  /* Navbar shrink + active link */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    let current = '';
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
    navLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href') === '#' + current); });
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const bsCollapse = document.getElementById('navbarNav');
      if (bsCollapse && bsCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(bsCollapse)?.hide();
      }
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  /* Skill bar animation */
  const skillBars = document.querySelectorAll('.skill-fill[data-width]');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { entry.target.style.width = entry.target.dataset.width + '%'; }, 200);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* Back to top */
  backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Contact form */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.btn-submit');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #6ecf7f, #34c85a)';
      btn.disabled = true;
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; contactForm.reset(); }, 3000);
    });
  }

  /* Typing effect */
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = ['Information Technology Student', 'Frontend Developer', 'UI/UX Enthusiast', 'Creative Problem Solver'];
    let pi = 0, ci = 0, del = false;
    function type() {
      const p = phrases[pi];
      typingEl.textContent = del ? p.slice(0, --ci) : p.slice(0, ++ci);
      let speed = del ? 50 : 90;
      if (!del && ci === p.length) { speed = 1800; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; speed = 400; }
      setTimeout(type, speed);
    }
    type();
  }

  /* Blob parallax */
  document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    blobs.forEach((blob, i) => {
      const f = (i + 1) * 8;
      blob.style.transform = 'translate(' + (dx * f) + 'px, ' + (dy * f) + 'px)';
    });
  });

});
