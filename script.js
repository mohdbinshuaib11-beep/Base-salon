/**
 * BAS SALON — Main Interactive JavaScript
 * Standalone vanilla JS compatible with GitHub Pages
 */

/* ==========================================================================
   1. Centralized Configuration
   ========================================================================== */
const SALON_CONFIG = {
  name: "BAS SALON",
  // International WhatsApp number (country code + number without spaces or '+')
  whatsappNumber: "919895014575",
  phoneNumber: "+91 98950 14575",
  googleMapsUrl: "https://maps.app.goo.gl/YcxcJFjoY9m1UB8YA",
  address: "Kannur - Kuthuparamba Rd, Thayatheru, Thana, Kannur, Kerala 670002",
  hours: "Monday – Sunday: 9:00 AM – 9:00 PM"
};

/* ==========================================================================
   2. Helper Utilities
   ========================================================================== */
function sanitizePhone(phone) {
  return (phone || '').replace(/[^0-9]/g, '');
}

function showToast(message, duration = 4000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D9A52E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function openWhatsAppChat(customMessage = '') {
  const number = sanitizePhone(SALON_CONFIG.whatsappNumber);
  if (!number || number === 'REPLACE_WITH_VERIFIED_NUMBER') {
    showToast('WhatsApp number not yet configured. Please set whatsappNumber in script.js.');
    return;
  }
  const defaultMsg = `Hello ${SALON_CONFIG.name}, I would like to enquire about your salon services and booking an appointment.`;
  const text = encodeURIComponent(customMessage || defaultMsg);
  window.open(`https://wa.me/${number}?text=${text}`, '_blank', 'noopener,noreferrer');
}

function callSalonPhone() {
  const phone = SALON_CONFIG.phoneNumber;
  if (!phone || phone.includes('REPLACE')) {
    showToast('Telephone number not configured. Please set phoneNumber in script.js.');
    return;
  }
  window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
}

function openDirections() {
  window.open(SALON_CONFIG.googleMapsUrl, '_blank', 'noopener,noreferrer');
}

/* ==========================================================================
   3. Mobile Hamburger Navigation
   ========================================================================== */
function setupNavigation() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !drawer || !backdrop) return;

  function toggleMenu(open) {
    const isOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburgerBtn.addEventListener('click', () => toggleMenu());
  backdrop.addEventListener('click', () => toggleMenu(false));

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   4. Gallery Filtering and Lightbox
   ========================================================================== */
function setupGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');

  if (!galleryItems.length) return;

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // Lightbox Implementation
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    return Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  function showLightboxIndex(index) {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;

    if (index < 0) index = visibleItems.length - 1;
    if (index >= visibleItems.length) index = 0;

    currentIndex = index;
    const targetItem = visibleItems[currentIndex];
    const img = targetItem.querySelector('img');
    const title = targetItem.querySelector('.gallery-title')?.textContent || 'Salon Style';
    const tag = targetItem.querySelector('.gallery-tag')?.textContent || 'Hair Craft';

    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = `${tag} • BAS SALON Portfolio`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      visibleItems = getVisibleItems();
      const index = visibleItems.indexOf(item);
      showLightboxIndex(index !== -1 ? index : 0);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showLightboxIndex(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showLightboxIndex(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxIndex(currentIndex - 1);
    if (e.key === 'ArrowRight') showLightboxIndex(currentIndex + 1);
  });

  // Touch swipe support for mobile lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showLightboxIndex(currentIndex - 1);
      } else {
        showLightboxIndex(currentIndex + 1);
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   5. Appointment Enquiry Form Handling
   ========================================================================== */
function setupEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  // Set min date to today for date picker
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasErrors = false;

    // Helper to validate and display errors
    function validateField(id, errorId, condition, msg) {
      const field = document.getElementById(id);
      const errorEl = document.getElementById(errorId);
      if (condition) {
        field?.classList.add('error');
        if (errorEl) {
          errorEl.textContent = msg;
          errorEl.classList.add('visible');
        }
        hasErrors = true;
      } else {
        field?.classList.remove('error');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('visible');
        }
      }
    }

    const name = document.getElementById('clientName')?.value.trim() || '';
    const phone = document.getElementById('clientPhone')?.value.trim() || '';
    const service = document.getElementById('serviceSelect')?.value || '';
    const date = document.getElementById('preferredDate')?.value || '';
    const timeSlot = document.getElementById('timeSlotSelect')?.value || 'Flexible';
    const notes = document.getElementById('clientNotes')?.value.trim() || '';

    validateField('clientName', 'nameError', name.length < 2, 'Please enter your full name (at least 2 letters)');
    validateField('clientPhone', 'phoneError', sanitizePhone(phone).length < 7, 'Please enter a valid telephone or WhatsApp number');
    validateField('serviceSelect', 'serviceError', !service, 'Please select a salon service');
    validateField('preferredDate', 'dateError', !date, 'Please choose a preferred appointment date');

    if (hasErrors) {
      showToast('Please complete all required fields.');
      const firstError = form.querySelector('.form-control.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Build the prefilled WhatsApp message
    const messageLines = [
      `*Appointment Enquiry — ${SALON_CONFIG.name}*`,
      ``,
      `• *Client Name:* ${name}`,
      `• *Contact Number:* ${phone}`,
      `• *Requested Service:* ${service}`,
      `• *Preferred Date:* ${date}`,
      `• *Preferred Time:* ${timeSlot}`,
    ];

    if (notes) {
      messageLines.push(`• *Notes / Requests:* ${notes}`);
    }

    messageLines.push(``);
    messageLines.push(`Hello BAS SALON team, please check your schedule availability for this appointment enquiry. Thank you!`);

    const formattedMessage = messageLines.join('\n');
    openWhatsAppChat(formattedMessage);
  });
}

/* ==========================================================================
   6. Global Action Button Handlers
   ========================================================================== */
function setupGlobalActions() {
  // Service-specific WhatsApp enquiry buttons
  document.querySelectorAll('[data-service-enquiry]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-enquiry') || 'Salon Service';
      const msg = `Hello ${SALON_CONFIG.name}, I would like to enquire about details, duration, and availability for: *${serviceName}*. Could you please assist me?`;
      openWhatsAppChat(msg);
    });
  });

  // Price enquiry buttons
  document.querySelectorAll('[data-price-enquiry]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.getAttribute('data-price-enquiry') || 'Service Pricing';
      const msg = `Hello ${SALON_CONFIG.name}, could you please provide the latest price and consultation quote for: *${item}*?`;
      openWhatsAppChat(msg);
    });
  });

  // Direct WhatsApp links
  document.querySelectorAll('.action-whatsapp').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsAppChat();
    });
  });

  // Direct Call links
  document.querySelectorAll('.action-call').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      callSalonPhone();
    });
  });

  // Direct Directions links
  document.querySelectorAll('.action-directions').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDirections();
    });
  });

  // Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   7. Smooth Page Transitions & Scroll Reveals
   ========================================================================== */
function setupPageTransitions() {
  let bar = document.getElementById('pageTransitionBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'pageTransitionBar';
    bar.className = 'page-progress-bar';
    document.body.prepend(bar);
  }

  // Intercept internal page navigation for smooth transition
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore external links, new tabs, modifier keys, protocols, and anchors
    if (
      link.target === '_blank' ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      href.startsWith('#') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('javascript:') ||
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      return;
    }

    if (href.endsWith('.html') || href === '/' || href === 'index.html') {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const targetPath = href.split('/').pop() || 'index.html';

      if (currentPath === targetPath) {
        return;
      }

      e.preventDefault();

      bar.classList.add('active');
      document.body.classList.add('page-exiting');

      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  });

  // Handle browser back/forward cache restore cleanly
  window.addEventListener('pageshow', () => {
    if (bar) bar.classList.remove('active');
    document.body.classList.remove('page-exiting');
  });
}

function setupScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const revealTargets = document.querySelectorAll(
    '.service-card, .gallery-item, .pricing-category, .highlight-item, .contact-detail-block'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealTargets.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

/* ==========================================================================
   8. Initialize on DOM Ready
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupPageTransitions();
  setupScrollAnimations();
  setupNavigation();
  setupGallery();
  setupEnquiryForm();
  setupGlobalActions();
});
