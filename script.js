/**
 * HackHeist 2026 - Landing Page JavaScript
 * Organized by GDG on Campus MIET
 * Simple, robust, human-written vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCountdownTimer();
  initModalHandling();
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Subtle border shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
    });

    // Close menu on link click
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
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${id}"]`);

      if (activeLink) {
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Real-Time Countdown Timer to HackHeist 2026
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // HackHeist 2026 target date
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
    document.body.style.overflow = 'hidden';
  }
}

function closeRegistrationModal() {
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Reset view after closing
    setTimeout(() => {
      if (regForm && successState) {
        regForm.style.display = 'flex';
        successState.style.display = 'none';
        regForm.reset();
      }
    }, 250);
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

  // Local storage simulation
  const registrant = { fullName, email, college, year, track, date: new Date().toISOString() };
  try {
    const list = JSON.parse(localStorage.getItem('hackheist_registrants') || '[]');
    list.push(registrant);
    localStorage.setItem('hackheist_registrants', JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }

  // Display confirmation view
  if (regForm && successState) {
    regForm.style.display = 'none';
    successState.style.display = 'block';
  }
}

function initModalHandling() {
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeRegistrationModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeRegistrationModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeRegistrationModal();
    }
  });
}
