 
    // Sticky Navbar
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('sticky', window.scrollY > 50);
    });

    // Dropdowns
    const servicesToggle = document.getElementById('services-toggle');
    const servicesDropdown = document.getElementById('services-dropdown');
    const pagesToggle = document.getElementById('pages-toggle');
    const pagesDropdown = document.getElementById('pages-dropdown');

    servicesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      servicesDropdown.style.display = servicesDropdown.style.display === 'block' ? 'none' : 'block';
      pagesDropdown.style.display = 'none';
    });

    pagesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      pagesDropdown.style.display = pagesDropdown.style.display === 'block' ? 'none' : 'block';
      servicesDropdown.style.display = 'none';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-link')) {
        servicesDropdown.style.display = 'none';
        pagesDropdown.style.display = 'none';
      }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
 
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

