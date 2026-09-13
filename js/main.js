/**
 * Astee Company Limited - Main JavaScript
 * Handles navigation, mobile drawer, accordions, project filtering, modal viewer, and contact inquiries.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initAccordions();
  initProjectFilters();
  initProjectModal();
  initScrollTop();
  initContactForms();
});

/* --------------------------------------------------------------------------
   1. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerClose');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close drawer when clicking nav links
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   2. ACCORDION COMPONENT
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const content = currentItem.querySelector('.accordion-content');
      const isActive = currentItem.classList.contains('active');

      // Optional: close other open items in the same list
      const siblingItems = currentItem.parentElement.querySelectorAll('.accordion-item');
      siblingItems.forEach(item => {
        if (item !== currentItem) {
          item.classList.remove('active');
          const siblingContent = item.querySelector('.accordion-content');
          if (siblingContent) siblingContent.style.maxHeight = null;
        }
      });

      if (!isActive) {
        currentItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        currentItem.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });

  // Open first item by default if exists
  const firstItem = document.querySelector('.accordion-item');
  if (firstItem && !document.querySelector('.accordion-item.active')) {
    firstItem.classList.add('active');
    const content = firstItem.querySelector('.accordion-content');
    if (content) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
}

/* --------------------------------------------------------------------------
   3. PROJECT FILTER TABS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. PROJECT DETAILS MODAL
   -------------------------------------------------------------------------- */
const projectData = {
  'wa-bulenga': {
    title: 'Upgrading of Wa - Bulenga - Yaala Road (KM 37.0 - 74.0)',
    category: 'Road & Highway Infrastructure',
    client: 'Ministry of Roads and Highways / Ghana Highway Authority (GHA)',
    location: 'Upper West Region, Ghana',
    contractor: 'Messers Astee Company Limited (P.O. Box AT 244, Achimota, Accra)',
    initiative: 'The Big Push Project - National Infrastructure Development Project',
    engineer: 'Regional Highway Director, Upper West Region',
    desc: 'Extensive upgrading and paving of a critical 37-kilometer arterial trunk road segment (KM 37.0 to 74.0) connecting Wa, Bulenga, and Yaala. The project entails earthworks, sub-base preparation, bituminous surfacing, drainage structures, culverts, and road safety installations. It forms a key pillar under the Government of Ghana’s Big Push infrastructure agenda to boost regional trade, agricultural connectivity, and reduce transit times.',
    image: 'photo_2026-09-12_21-58-41.jpg'
  },
  'urban-pothole': {
    title: 'Routine Maintenance & Pothole Rehabilitation of Municipal Roads',
    category: 'Road Maintenance & Asphalt Works',
    client: 'Ghana Highway Authority / Municipal Assemblies',
    location: 'Greater Accra & Eastern Regions',
    contractor: 'Astee Company Limited',
    initiative: 'National Road Safety & Accessibility Drive',
    engineer: 'Supervising Highway Engineer',
    desc: 'Comprehensive asphalt milling, deep patching, surface resealing, and roadside clearance to restore ride quality and traffic safety along busy commuter and transport corridors.',
    image: 'photo_2026-09-12_21-58-41.jpg'
  },
  'commercial-hall': {
    title: 'Modern Commercial Banking Hall & Office Complex',
    category: 'Building Construction',
    client: 'Commercial Banking & Corporate Clients',
    location: 'Accra Industrial Area, Ghana',
    contractor: 'Astee Company Limited',
    initiative: 'Corporate Facility Development',
    engineer: 'Senior Structural Engineer & Lead Architect',
    desc: 'Turnkey structural concrete works, modern glass curtain walling, MEP installations, high-security financial vaults, modern interior fit-out, and green landscaping designed for long-term commercial performance.',
    image: 'photo_2026-09-12_21-58-41.jpg'
  },
  'solar-water': {
    title: 'Community Mechanised Solar-Powered Water Supply System',
    category: 'Civil & Community Infrastructure',
    client: 'Community Water & Sanitation Agency / Development Partners',
    location: 'Northern & Upper Regions, Ghana',
    contractor: 'Astee Company Limited',
    initiative: 'Rural Infrastructure & Clean Water Program',
    engineer: 'Water & Sanitation Systems Engineer',
    desc: 'Design and construction of deep borehole extraction, high-capacity elevated storage tanks, solar pumping arrays, public distribution standpipes, and automated filtration systems serving rural communities.',
    image: 'photo_2026-09-12_21-58-41.jpg'
  },
  'drainage-culvert': {
    title: 'Reinforced Concrete Storm Drain & Box Culvert Network',
    category: 'Civil Engineering & Drainage',
    client: 'Hydrological Services Department / GHA',
    location: 'Southern Corridor, Ghana',
    contractor: 'Astee Company Limited',
    initiative: 'Flood Mitigation & Resilient Infrastructure',
    engineer: 'Civil Drainage Engineer',
    desc: 'Construction of heavy-duty reinforced concrete U-drains, double-cell box culverts, and erosion control rip-rap along flood-prone arterial networks to safeguard road pavements and adjacent settlements.',
    image: 'photo_2026-09-12_21-58-41.jpg'
  },
  'equipment-logistics': {
    title: 'Plant, Machinery & Bulk Construction Goods Supply',
    category: 'General Supplies & Logistics',
    client: 'Public & Private Contractors',
    location: 'Nationwide Delivery, Ghana',
    contractor: 'Astee Company Limited',
    initiative: 'Plant & Material Support Services',
    engineer: 'Fleet & Logistics Operations Lead',
    desc: 'Supply of heavy civil machinery including hydraulic excavators, motor graders, tandem rollers, dump trucks, and supply of certified quarry aggregates, cement, and bitumen.',
    image: 'logo.jpg'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  const viewBtns = document.querySelectorAll('[data-project-id]');

  if (!modalOverlay || !closeBtn) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      const data = projectData[id];
      if (!data) return;

      document.getElementById('modalImg').src = data.image;
      document.getElementById('modalImg').alt = data.title;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalCategory').textContent = data.category;
      document.getElementById('modalClient').textContent = data.client;
      document.getElementById('modalLocation').textContent = data.location;
      document.getElementById('modalInitiative').textContent = data.initiative || 'Infrastructure Delivery';
      document.getElementById('modalDesc').textContent = data.desc;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORMS & URL PRE-FILLING
   -------------------------------------------------------------------------- */
function initContactForms() {
  // Pre-fill fields from URL params if present (e.g. ?service=Road+Construction)
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const scaleParam = urlParams.get('scale');

  const formServiceField = document.getElementById('contactService');
  const formMessageField = document.getElementById('contactMessage');

  if (formServiceField && serviceParam) {
    for (let i = 0; i < formServiceField.options.length; i++) {
      if (formServiceField.options[i].text.toLowerCase().includes(serviceParam.toLowerCase())) {
        formServiceField.selectedIndex = i;
        break;
      }
    }
  }

  if (formMessageField && serviceParam) {
    formMessageField.value = `Hello Astee Company Limited, I am requesting an official quotation/tender proposal for ${serviceParam}. Please contact me to discuss project details and site inspection.`;
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Inquiry...';

      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 12px; padding: 2rem; text-align: center; color: #065f46;">
            <svg style="width: 48px; height: 48px; color: #10b981; margin: 0 auto 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 style="font-size: 1.4rem; color: #064e3b; margin-bottom: 0.5rem;">Thank You! Your Request Has Been Received</h3>
            <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Our civil engineering and tender management team at Astee Company Limited will review your specifications and contact you promptly at your provided phone / email.
            </p>
            <p style="font-size: 0.85rem; color: #047857;">For urgent inquiries, reach out directly via WhatsApp or call our Achimota office.</p>
          </div>
        `;
      }, 1000);
    });
  }
}
