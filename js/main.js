/**
 * Sakthi MultiCare Clinic - Main JavaScript
 * Features: Navbar, Symptom Checker, Chat Assistant,
 *           Contact Form, Toast, Active Nav Highlight
 */

/* ================================================================
   NAVBAR — Hamburger toggle + active link on scroll
================================================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
    });
  });
}

// Highlight active nav link based on scroll position
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const allSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
  let current = '';
  allSections.forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 90) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(function (a) {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
});

/* ================================================================
   SYMPTOM CHECKER
================================================================ */
/*
  Logic:
  - Fever OR Headache        → General Physician
  - Skin rash                → Dermatologist
  - Tooth pain               → Dentist
  - Joint pain               → Orthopedic Specialist
  - Multiple symptoms        → List all relevant doctors
*/

const symptomRules = [
  {
    symptoms: ['fever', 'headache'],
    doctor: 'General Physician',
    match: 'any'   // any one of these triggers this rule
  },
  {
    symptoms: ['skin_rash'],
    doctor: 'Dermatologist',
    match: 'any'
  },
  {
    symptoms: ['tooth_pain'],
    doctor: 'Dentist',
    match: 'any'
  },
  {
    symptoms: ['joint_pain'],
    doctor: 'Orthopedic Specialist',
    match: 'any'
  }
];

const checkBtn    = document.getElementById('check-symptom-btn');
const resultBox   = document.getElementById('symptom-result-box');

if (checkBtn && resultBox) {
  checkBtn.addEventListener('click', function () {
    // Collect checked symptoms
    const checked = Array.from(
      document.querySelectorAll('.symptom-cb:checked')
    ).map(function (cb) { return cb.value; });

    if (checked.length === 0) {
      resultBox.innerHTML = 'Please select at least one symptom.';
      resultBox.classList.add('visible');
      return;
    }

    // Find matching doctors
    const recommended = [];
    symptomRules.forEach(function (rule) {
      const matched = rule.symptoms.some(function (s) {
        return checked.includes(s);
      });
      if (matched && !recommended.includes(rule.doctor)) {
        recommended.push(rule.doctor);
      }
    });

    if (recommended.length === 0) {
      resultBox.innerHTML = 'No specific recommendation found. Please visit the clinic for a general checkup.';
    } else if (recommended.length === 1) {
      resultBox.innerHTML = '<strong>Recommended:</strong> ' + recommended[0];
    } else {
      resultBox.innerHTML =
        '<strong>Recommended:</strong> ' + recommended.join(', ');
    }

    resultBox.classList.add('visible');
  });
}

/* ================================================================
   CHAT ASSISTANT
================================================================ */
/*
  Keyword-based response map.
  Keys are lowercase keywords; values are reply strings.
*/
const chatReplies = {
  'doctor':      'We have specialists available. Please visit the Doctors section.',
  'appointment': 'You can book an appointment using the Book Appointment button.',
  'timing':      'Clinic is open from 9 AM to 8 PM, Monday to Saturday.',
  'time':        'Clinic is open from 9 AM to 8 PM, Monday to Saturday.',
  'hours':       'Clinic is open from 9 AM to 8 PM, Monday to Saturday.',
  'location':    'We are located in Chennai. Check the Contact section for the map.',
  'address':     'We are located in Chennai, Tamil Nadu. See the Contact section.',
  'fever':       'Please consult a General Physician for fever.',
  'headache':    'Please consult a General Physician for headache.',
  'rash':        'Please consult a Dermatologist for skin rash.',
  'tooth':       'Please consult our Dentist for tooth-related issues.',
  'joint':       'Please consult our Orthopedic Specialist for joint pain.',
  'phone':       'You can reach us at +91 98765 43210.',
  'contact':     'Phone: +91 98765 43210 | Email: sakthiclinic@email.com',
  'email':       'Our email is sakthiclinic@email.com.',
  'hello':       'Hello! How can I help you today?',
  'hi':          'Hi there! How can I assist you?',
  'help':        'You can ask me about doctors, appointments, timings, location, or symptoms.'
};

const DEFAULT_REPLY = 'Please contact the clinic for more information. Phone: +91 98765 43210.';

function getBotReply(userMsg) {
  const lower = userMsg.toLowerCase();
  for (const keyword in chatReplies) {
    if (lower.includes(keyword)) {
      return chatReplies[keyword];
    }
  }
  return DEFAULT_REPLY;
}

// DOM references
const chatHeader    = document.getElementById('chat-header');
const chatBody      = document.getElementById('chat-body');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatMessages  = document.getElementById('chat-messages');
const chatInput     = document.getElementById('chat-input');
const chatSendBtn   = document.getElementById('chat-send-btn');

// Toggle open/close
if (chatHeader) {
  chatHeader.addEventListener('click', function () {
    chatBody.classList.toggle('open');
    chatToggleBtn.textContent = chatBody.classList.contains('open') ? '▼' : '▲';

    // Show welcome message on first open
    if (chatBody.classList.contains('open') && chatMessages.children.length === 0) {
      appendMsg('Hello! I am the Clinic Assistant. Ask me about doctors, timings, appointments, or symptoms.', 'bot');
    }
  });
}

function appendMsg(text, sender) {
  const div = document.createElement('div');
  div.className = 'chat-msg ' + sender;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  if (!chatInput) return;
  const msg = chatInput.value.trim();
  if (!msg) return;
  appendMsg(msg, 'user');
  chatInput.value = '';
  // Slight delay so it feels like a response
  setTimeout(function () {
    appendMsg(getBotReply(msg), 'bot');
  }, 300);
}

if (chatSendBtn) {
  chatSendBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
  });
}

/* ================================================================
   CONTACT FORM
================================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('Thank you! We will get back to you within 24 hours.');
    contactForm.reset();
  });
}

/* ================================================================
   APPOINTMENT FORM (if present)
================================================================ */
const apptForm = document.getElementById('appt-form');
if (apptForm) {
  // Set min date to today
  const dateInput = document.getElementById('appt-date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  apptForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('appt-name').value.trim();
    const phone = document.getElementById('appt-phone').value.trim();
    if (!name || !phone) {
      showToast('Please fill in all required fields.');
      return;
    }
    showToast('Appointment request received for ' + name + '. We will confirm via call.');
    apptForm.reset();
  });
}

/* ================================================================
   TOAST NOTIFICATION
================================================================ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 4000);
}
