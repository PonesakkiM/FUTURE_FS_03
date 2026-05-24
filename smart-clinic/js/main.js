/**
 * Smart Clinic Website - Main JavaScript
 * Features: Dark Mode, Language Toggle, FAQ, Symptom Checker,
 *           Voice Input, Chatbot, Appointment Crowd Indicator,
 *           Floating Buttons, Loading Spinner, Toast Notifications
 */

/* ============================================================
   LOADING SPINNER
   ============================================================ */
window.addEventListener('load', function () {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 600);
  }
});

/* ============================================================
   DARK MODE TOGGLE
   ============================================================ */
const darkToggle = document.getElementById('dark-toggle');
const body = document.body;

// Restore saved preference
if (localStorage.getItem('darkMode') === 'on') {
  body.classList.add('dark-mode');
  if (darkToggle) darkToggle.textContent = '☀';
}

if (darkToggle) {
  darkToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    darkToggle.textContent = isDark ? '☀' : '☾';
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
  });
}

/* ============================================================
   LANGUAGE TOGGLE (English / Tamil)
   ============================================================ */
const translations = {
  en: {
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-services': 'Services',
    'nav-doctors': 'Doctors',
    'nav-appointment': 'Appointment',
    'nav-contact': 'Contact',
    'nav-admin': 'Admin',
    'hero-title': 'Your Health, <span>Our Priority</span>',
    'hero-subtitle': 'Smart Clinic provides expert medical care with modern technology. Book appointments, check symptoms, and consult our specialists — all in one place.',
    'hero-cta': 'Book Appointment',
    'hero-cta2': 'Our Doctors',
    'services-title': 'Our Services',
    'doctors-title': 'Our Doctors',
    'appointment-title': 'Book an Appointment',
    'symptom-title': 'Symptom Checker',
    'contact-title': 'Contact Us',
    'tips-title': 'Health Tips',
    'faq-title': 'Frequently Asked Questions',
    'testimonials-title': 'Patient Testimonials',
    'about-title': 'About Smart Clinic',
    'check-btn': 'Check Symptoms',
    'book-btn': 'Book Appointment',
    'lang-btn': 'தமிழ்'
  },
  ta: {
    'nav-home': 'முகப்பு',
    'nav-about': 'எங்களை பற்றி',
    'nav-services': 'சேவைகள்',
    'nav-doctors': 'மருத்துவர்கள்',
    'nav-appointment': 'சந்திப்பு',
    'nav-contact': 'தொடர்பு',
    'nav-admin': 'நிர்வாகம்',
    'hero-title': 'உங்கள் ஆரோக்கியம், <span>எங்கள் முன்னுரிமை</span>',
    'hero-subtitle': 'ஸ்மார்ட் கிளினிக் நவீன தொழில்நுட்பத்துடன் சிறந்த மருத்துவ சேவை வழங்குகிறது. சந்திப்புகளை பதிவு செய்யுங்கள், அறிகுறிகளை சரிபாருங்கள்.',
    'hero-cta': 'சந்திப்பு பதிவு',
    'hero-cta2': 'மருத்துவர்கள்',
    'services-title': 'எங்கள் சேவைகள்',
    'doctors-title': 'எங்கள் மருத்துவர்கள்',
    'appointment-title': 'சந்திப்பு பதிவு செய்யுங்கள்',
    'symptom-title': 'அறிகுறி சரிபார்ப்பு',
    'contact-title': 'தொடர்பு கொள்ளுங்கள்',
    'tips-title': 'ஆரோக்கிய குறிப்புகள்',
    'faq-title': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'testimonials-title': 'நோயாளி கருத்துகள்',
    'about-title': 'ஸ்மார்ட் கிளினிக் பற்றி',
    'check-btn': 'அறிகுறிகளை சரிபார்',
    'book-btn': 'சந்திப்பு பதிவு',
    'lang-btn': 'English'
  }
};

let currentLang = 'en';

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', function () {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    applyTranslations(currentLang);
    langToggle.textContent = translations[currentLang]['lang-btn'];
  });
}

function applyTranslations(lang) {
  const t = translations[lang];
  Object.keys(t).forEach(function (key) {
    const el = document.getElementById(key);
    if (el) {
      el.innerHTML = t[key];
    }
  });
}

/* ============================================================
   NAVBAR - Hamburger + Active Link
   ============================================================ */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  let current = '';
  sections.forEach(function (sec) {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });
  navAnchors.forEach(function (a) {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
});

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const answer = this.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(function (a) {
      a.classList.remove('open');
    });
    document.querySelectorAll('.faq-question').forEach(function (q) {
      q.classList.remove('active');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      answer.classList.add('open');
      this.classList.add('active');
    }
  });
});

/* ============================================================
   SYMPTOM CHECKER
   ============================================================ */
const symptomData = {
  fever: { dept: 'General Physician', note: 'May indicate infection or viral illness.' },
  cough: { dept: 'Pulmonologist / General Physician', note: 'Could be respiratory infection or allergy.' },
  headache: { dept: 'Neurologist / General Physician', note: 'May be tension, migraine, or hypertension.' },
  rash: { dept: 'Dermatologist', note: 'Skin conditions require dermatology evaluation.' },
  chest_pain: { dept: 'Cardiologist', note: 'Chest pain requires urgent cardiac evaluation.' },
  stomach_pain: { dept: 'Gastroenterologist', note: 'Could be gastritis, ulcer, or appendicitis.' },
  joint_pain: { dept: 'Orthopedic / Rheumatologist', note: 'May indicate arthritis or injury.' },
  eye_irritation: { dept: 'Ophthalmologist', note: 'Eye conditions need specialist care.' },
  fatigue: { dept: 'General Physician', note: 'Fatigue can have many causes; general checkup advised.' },
  sore_throat: { dept: 'ENT Specialist', note: 'Throat infections or tonsillitis may be the cause.' }
};

const checkBtn = document.getElementById('check-symptoms-btn');
if (checkBtn) {
  checkBtn.addEventListener('click', function () {
    const checked = document.querySelectorAll('.symptom-checkbox:checked');
    const resultEl = document.getElementById('symptom-result');

    if (checked.length === 0) {
      resultEl.innerHTML = '<strong>Please select at least one symptom.</strong>';
      return;
    }

    let depts = new Set();
    let notes = [];

    checked.forEach(function (cb) {
      const key = cb.value;
      if (symptomData[key]) {
        depts.add(symptomData[key].dept);
        notes.push('• ' + symptomData[key].note);
      }
    });

    resultEl.innerHTML =
      '<strong>Suggested Department(s):</strong> ' + Array.from(depts).join(', ') +
      '<br><br><strong>Notes:</strong><br>' + notes.join('<br>') +
      '<br><br><em>This is a general suggestion. Please consult a doctor for proper diagnosis.</em>';
  });
}

/* ============================================================
   VOICE INPUT (Speech Recognition API)
   ============================================================ */
const voiceBtn = document.getElementById('voice-input-btn');
const voiceTarget = document.getElementById('voice-symptom-input');

if (voiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', function () {
    if (voiceBtn.classList.contains('listening')) {
      recognition.stop();
      voiceBtn.classList.remove('listening');
      voiceBtn.textContent = '🎤 Voice';
    } else {
      recognition.start();
      voiceBtn.classList.add('listening');
      voiceBtn.textContent = '⏹ Stop';
    }
  });

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    if (voiceTarget) voiceTarget.value = transcript;

    // Auto-check matching symptoms
    document.querySelectorAll('.symptom-checkbox').forEach(function (cb) {
      const label = cb.nextSibling ? cb.nextSibling.textContent.toLowerCase() : '';
      if (transcript.includes(cb.value.replace('_', ' ')) || transcript.includes(label.trim())) {
        cb.checked = true;
      }
    });

    voiceBtn.classList.remove('listening');
    voiceBtn.textContent = '🎤 Voice';
    showToast('Voice input captured: "' + transcript + '"');
  };

  recognition.onerror = function () {
    voiceBtn.classList.remove('listening');
    voiceBtn.textContent = '🎤 Voice';
    showToast('Voice recognition error. Please try again.');
  };
} else if (voiceBtn) {
  voiceBtn.style.display = 'none';
}

/* ============================================================
   SMART APPOINTMENT CROWD INDICATOR
   ============================================================ */
// Predefined crowd levels per time slot
const crowdData = {
  '09:00': 'low',
  '10:00': 'high',
  '11:00': 'high',
  '12:00': 'medium',
  '14:00': 'low',
  '15:00': 'medium',
  '16:00': 'high',
  '17:00': 'medium',
  '18:00': 'low'
};

const crowdLabels = {
  low: '🟢 Low',
  medium: '🟡 Medium',
  high: '🔴 High'
};

// Render crowd slots
const crowdContainer = document.getElementById('crowd-slots');
if (crowdContainer) {
  Object.keys(crowdData).forEach(function (time) {
    const level = crowdData[time];
    const slot = document.createElement('div');
    slot.className = 'slot ' + level;
    slot.innerHTML = '<div>' + time + '</div><div>' + crowdLabels[level] + '</div>';
    crowdContainer.appendChild(slot);
  });
}

// Update crowd indicator when time is selected
const timeSelect = document.getElementById('appt-time');
const crowdResult = document.getElementById('crowd-result');

if (timeSelect && crowdResult) {
  timeSelect.addEventListener('change', function () {
    const val = this.value;
    if (crowdData[val]) {
      const level = crowdData[val];
      crowdResult.textContent = 'Expected crowd at ' + val + ': ' + crowdLabels[level].replace(/[🟢🟡🔴]/g, '').trim();
      crowdResult.className = 'slot ' + level;
      crowdResult.style.padding = '8px 12px';
      crowdResult.style.marginTop = '8px';
      crowdResult.style.display = 'block';
    }
  });
}

/* ============================================================
   APPOINTMENT FORM SUBMISSION
   ============================================================ */
const apptForm = document.getElementById('appointment-form');
if (apptForm) {
  apptForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('appt-name').value.trim();
    const phone = document.getElementById('appt-phone').value.trim();
    const date = document.getElementById('appt-date').value;
    const time = document.getElementById('appt-time').value;
    const doctor = document.getElementById('appt-doctor').value;

    if (!name || !phone || !date || !time || !doctor) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Simulate booking confirmation
    showToast('Appointment booked for ' + name + ' on ' + date + ' at ' + time + '. We will confirm via SMS.');
    apptForm.reset();
    if (crowdResult) crowdResult.style.display = 'none';
  });
}

// Set minimum date to today
const apptDate = document.getElementById('appt-date');
if (apptDate) {
  const today = new Date().toISOString().split('T')[0];
  apptDate.setAttribute('min', today);
}

/* ============================================================
   CHATBOT WIDGET
   ============================================================ */
const chatToggle = document.getElementById('fab-chat');
const chatWidget = document.getElementById('chat-widget');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// Bot knowledge base
const botResponses = {
  hello: 'Hello! Welcome to Smart Clinic. How can I help you today?',
  hi: 'Hi there! How can I assist you?',
  timing: 'Our clinic is open Monday to Saturday, 9:00 AM – 7:00 PM. Sunday: 9:00 AM – 1:00 PM.',
  hours: 'Clinic hours: Mon–Sat 9AM–7PM, Sunday 9AM–1PM.',
  doctor: 'We have specialists in General Medicine, Cardiology, Dermatology, Orthopedics, Pediatrics, and ENT. Would you like to book an appointment?',
  appointment: 'You can book an appointment using our online form on this page, or call us at +91 98765 43210.',
  contact: 'Phone: +91 98765 43210 | Email: info@smartclinic.com | Address: 12 Health Street, Chennai.',
  emergency: 'For emergencies, please call 108 (ambulance) or visit the nearest hospital immediately.',
  fee: 'Consultation fees vary by specialist. General Physician: ₹300, Specialist: ₹500–₹800. Please call for exact details.',
  location: 'We are located at 12 Health Street, Anna Nagar, Chennai – 600040.',
  parking: 'Free parking is available at our clinic premises.',
  insurance: 'We accept most major health insurance plans. Please bring your insurance card.',
  default: 'I am not sure about that. Please call us at +91 98765 43210 or use the contact form for more help.'
};

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  for (const key in botResponses) {
    if (key !== 'default' && lower.includes(key)) {
      return botResponses[key];
    }
  }
  return botResponses.default;
}

function addChatMessage(text, sender) {
  const div = document.createElement('div');
  div.className = 'chat-msg ' + sender;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatToggle && chatWidget) {
  chatToggle.addEventListener('click', function () {
    chatWidget.classList.toggle('open');
    if (chatWidget.classList.contains('open') && chatMessages.children.length === 0) {
      setTimeout(function () {
        addChatMessage('Hello! I am the Smart Clinic Assistant. Ask me about doctors, timings, appointments, or contact info.', 'bot');
      }, 300);
    }
  });
}

if (chatClose) {
  chatClose.addEventListener('click', function () {
    chatWidget.classList.remove('open');
  });
}

function sendChatMessage() {
  if (!chatInput) return;
  const msg = chatInput.value.trim();
  if (!msg) return;
  addChatMessage(msg, 'user');
  chatInput.value = '';
  setTimeout(function () {
    addChatMessage(getBotReply(msg), 'bot');
  }, 500);
}

if (chatSend) {
  chatSend.addEventListener('click', sendChatMessage);
}

if (chatInput) {
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendChatMessage();
  });
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 4000);
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('Thank you for your message. We will get back to you within 24 hours.');
    contactForm.reset();
  });
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      if (navLinks) navLinks.classList.remove('open');
    }
  });
});

/* ============================================================
   ADMIN DASHBOARD - Simple Chart (CSS-based bar chart)
   ============================================================ */
const peakData = [
  { time: '9AM', count: 12 },
  { time: '10AM', count: 28 },
  { time: '11AM', count: 35 },
  { time: '12PM', count: 20 },
  { time: '2PM', count: 15 },
  { time: '3PM', count: 22 },
  { time: '4PM', count: 30 },
  { time: '5PM', count: 18 },
  { time: '6PM', count: 10 }
];

const chartContainer = document.getElementById('peak-chart');
if (chartContainer) {
  const maxCount = Math.max(...peakData.map(function (d) { return d.count; }));
  chartContainer.style.cssText = 'display:flex;align-items:flex-end;gap:8px;height:120px;padding:10px 0;border-bottom:2px solid #ccc;';

  peakData.forEach(function (d) {
    const barWrap = document.createElement('div');
    barWrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;flex:1;';

    const bar = document.createElement('div');
    const heightPct = Math.round((d.count / maxCount) * 100);
    bar.style.cssText = 'width:100%;background-color:#1565c0;height:' + heightPct + '%;min-height:4px;';

    const label = document.createElement('div');
    label.style.cssText = 'font-size:0.7rem;color:#444;margin-top:4px;text-align:center;';
    label.textContent = d.time;

    const num = document.createElement('div');
    num.style.cssText = 'font-size:0.7rem;color:#1565c0;font-weight:700;';
    num.textContent = d.count;

    barWrap.appendChild(num);
    barWrap.appendChild(bar);
    barWrap.appendChild(label);
    chartContainer.appendChild(barWrap);
  });
}
