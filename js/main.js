/* ============================================
   YORK CONCRETE — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar Scroll Behaviour --- */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --- Active Nav Link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Mobile Menu --- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu .nav-link, .mobile-menu .btn').forEach(el => {
    el.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- Scroll Reveal (Intersection Observer) --- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- Animated Counter --- */
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* --- Marquee Duplicate --- */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const items = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = items + items;
  }

  /* --- Quote Form Validation & Submission --- */
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.querySelector('.form-success');
  const formBody   = document.querySelector('.form-body');

  if (quoteForm) {
    const requiredInputs = quoteForm.querySelectorAll('[required]');

    const showError = (input) => {
      input.classList.add('error');
      const errMsg = input.closest('.form-group')?.querySelector('.form-error-msg');
      if (errMsg) errMsg.classList.add('show');
    };

    const clearError = (input) => {
      input.classList.remove('error');
      const errMsg = input.closest('.form-group')?.querySelector('.form-error-msg');
      if (errMsg) errMsg.classList.remove('show');
    };

    requiredInputs.forEach(input => {
      input.addEventListener('input', () => clearError(input));
      input.addEventListener('change', () => clearError(input));
    });

    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          showError(input);
          valid = false;
        } else {
          clearError(input);
        }
      });

      // Email validation
      const emailInput = quoteForm.querySelector('#email');
      if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          showError(emailInput);
          valid = false;
        }
      }

      if (!valid) return;

      // Simulate submission
      const submitBtn = quoteForm.querySelector('.btn-submit');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        if (formBody) formBody.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('show');
      }, 1200);
    });
  }

  /* --- Smooth Hover on Service Cards --- */
  document.querySelectorAll('.service-card, .service-detail-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', function() {
      this.style.willChange = '';
    });
  });

  /* --- Page Transition (subtle) --- */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href.startsWith('#') &&
      !href.startsWith('mailto') &&
      !href.startsWith('tel') &&
      !href.startsWith('http') &&
      !link.hasAttribute('target')
    ) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.25s ease';
        setTimeout(() => {
          window.location.href = target;
        }, 260);
      });
    }
  });

  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  /* --- Parallax on Hero (subtle) --- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }, { passive: true });
  }

});
