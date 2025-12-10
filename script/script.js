
 
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


