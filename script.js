/**
 * HackHeist 2026 - Official Landing Page JavaScript
 * Organized by GDG on Campus MIET
 * Features:
 *  - Countdown Timer to HackHeist 2026
 *  - Responsive Navigation & Active Scroll Spy
 *  - Interactive Registration Modal & Form Handling
 *  - Dynamic Tilt & Hover Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCountdownTimer();
  initModalHandling();
  initCardInteractions();
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Menu Logic
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // Scroll spy to highlight active section
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Real-time Countdown Timer (HackHeist 2026)
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Target Date: HackHeist 2026 (October 24, 2026 at 09:00:00 IST)
  // If current date has passed or for future demo, we calculate precisely
  const targetDate = new Date('2026-10-24T09:00:00+05:30').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   3. Registration Modal & Form Handling
   -------------------------------------------------------------------------- */
const modal = document.getElementById('registrationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const regForm = document.getElementById('registrationForm');
const successState = document.getElementById('modalSuccessState');

function openRegistrationModal() {
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }
}

function closeRegistrationModal() {
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Reset view after modal closes
    setTimeout(() => {
      if (regForm && successState) {
        regForm.style.display = 'flex';
        successState.style.display = 'none';
        regForm.reset();
      }
    }, 350);
  }
}

function handleRegistration() {
  openRegistrationModal();
}

function submitRegistration(event) {
  event.preventDefault();

  const fullName = document.getElementById('regFullName')?.value || '';
  const email = document.getElementById('regEmail')?.value || '';
  const college = document.getElementById('regCollege')?.value || '';
  const year = document.getElementById('regYear')?.value || '';
  const track = document.getElementById('regTrack')?.value || '';

  // Store registration in localStorage for demo persistence
  const applicant = { fullName, email, college, year, track, timestamp: new Date().toISOString() };
  try {
    const existing = JSON.parse(localStorage.getItem('hackheist_registrations') || '[]');
    existing.push(applicant);
    localStorage.setItem('hackheist_registrations', JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage not accessible', err);
  }

  // Switch to success confirmation
  if (regForm && successState) {
    regForm.style.display = 'none';
    successState.style.display = 'block';
  }
}

function initModalHandling() {
  // Bind close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeRegistrationModal);
  }

  // Close on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeRegistrationModal();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeRegistrationModal();
    }
  });

  // Attach modal trigger to any element with #register or hero buttons
  const heroRegisterBtn = document.getElementById('heroRegisterBtn');
  if (heroRegisterBtn) {
    heroRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openRegistrationModal();
    });
  }
}

/* --------------------------------------------------------------------------
   4. Interactive Subtle 3D Card Hover Effect
   -------------------------------------------------------------------------- */
function initCardInteractions() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}
