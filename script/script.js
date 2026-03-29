
 
    //about section read more
    // Scroll reveal logic
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    for (let el of reveals) {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) {
        el.classList.add('active');
      }
    }
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  //last section read more
   // Trigger animations on scroll
    const animatedElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      // Apply stagger to up animations
      if (el.classList.contains('animate-up')) {
        const index = Array.from(el.parentNode.children).indexOf(el);
        el.style.animationDelay = `${index * 0.2}s`;
      }
      observer.observe(el);
    });

   
  // Apply inline slide-in animation for .reveal elements
  const applyRevealAnimation = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'all 0.8s ease';
    });

    const revealHandler = () => {
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', revealHandler);
    revealHandler();
  };

  applyRevealAnimation();

// ---------- STICKY NAV ----------
const nav = document.querySelector('.main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('sticky', window.scrollY > 50);
  });
}

// ---------- DROPDOWNS (guarded) ----------
const servicesToggle = document.getElementById('services-toggle');
const servicesDropdown = document.getElementById('services-dropdown');
const pagesToggle = document.getElementById('pages-toggle');
const pagesDropdown = document.getElementById('pages-dropdown');

if (servicesToggle && servicesDropdown) {
  servicesToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const show = servicesDropdown.style.display !== 'block';
    servicesDropdown.style.display = show ? 'block' : 'none';
    if (pagesDropdown) pagesDropdown.style.display = 'none';
  });
}

if (pagesToggle && pagesDropdown) {
  pagesToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const show = pagesDropdown.style.display !== 'block';
    pagesDropdown.style.display = show ? 'block' : 'none';
    if (servicesDropdown) servicesDropdown.style.display = 'none';
  });
}

// close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (servicesDropdown && !e.target.closest('#services-dropdown') && !e.target.closest('#services-toggle')) {
    servicesDropdown.style.display = 'none';
  }
  if (pagesDropdown && !e.target.closest('#pages-dropdown') && !e.target.closest('#pages-toggle')) {
    pagesDropdown.style.display = 'none';
  }
});

// ---------- MOBILE MENU TOGGLE (guarded + accessible) ----------
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.setAttribute('role', 'button');
  menuToggle.setAttribute('tabindex', '0');
  menuToggle.setAttribute('aria-expanded', 'false');

  const toggleMenu = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    const isActive = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(!!isActive));
  };

  menuToggle.addEventListener('click', toggleMenu);
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}


