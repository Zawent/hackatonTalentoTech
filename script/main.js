
const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Opcional: cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links li').forEach(link =>
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    })
);



// ---------------------------------------------------------------

const slides = document.querySelectorAll('.slide');
const container = document.querySelector('.slides-container');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let current = 0;

function updateCarousel() {
  const offset = -current * 100;
  container.style.transform = `translateX(${offset}%)`;

  slides.forEach((_, i) => dots[i].classList.toggle('active', i === current));
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateCarousel();
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    current = i;
    updateCarousel();
  });
});


// ---------------------------------------------------


document.querySelectorAll('.tab-link').forEach(button => {
  button.addEventListener('click', () => {
    const tabsContainer = button.closest('#tabs-6');
    const targetTab = button.getAttribute('data-tab');

    // Cambiar botones activos
    tabsContainer.querySelectorAll('.tab-link').forEach(btn => {
      btn.classList.toggle('active', btn === button);
      btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
    });

    // Mostrar contenido activo
    tabsContainer.querySelectorAll('.tab-pane').forEach(tabPane => {
      tabPane.classList.toggle('active', tabPane.id === targetTab);
      tabPane.setAttribute('aria-hidden', tabPane.id !== targetTab ? 'true' : 'false');
    });
  });
});

// Seleccionar la primera pestaña al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const tabsContainer = document.querySelector('#tabs-6');
  if (!tabsContainer) return;

  const firstButton = tabsContainer.querySelector('.tab-link');
  if (firstButton) {
    firstButton.click();
  }
});










































// -----------------------------------------------------

const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('close-chatbot');
const sendBtn = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatbotBody = document.getElementById('chatbot-body');

// Mostrar chatbot
chatbotIcon.addEventListener('click', () => {
  chatbotContainer.classList.remove('hidden');
});

// Cerrar chatbot
closeBtn.addEventListener('click', () => {
  chatbotContainer.classList.add('hidden');
});

// Enviar mensaje
sendBtn.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message !== '') {
    mostrarMensajeUsuario(message);
    responderBot(message);
    userInput.value = '';
  }
});

function mostrarMensajeUsuario(msg) {
  const div = document.createElement('div');
  div.classList.add('user-message');
  div.textContent = msg;
  chatbotBody.appendChild(div);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function responderBot(msg) {
  const respuesta = obtenerRespuesta(msg);
  const div = document.createElement('div');
  div.classList.add('bot-message');
  div.textContent = respuesta;
  chatbotBody.appendChild(div);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
  hablar(respuesta);
}

function obtenerRespuesta(mensaje) {
  const texto = mensaje.toLowerCase();
  if (texto.includes('inscripción') || texto.includes('matrícula')) {
    return 'Para inscripciones, dirígete a la Secretaría Académica o visita la página de servicios.';
  } else if (texto.includes('pqr') || texto.includes('queja')) {
    return 'Para peticiones, quejas o reclamos, selecciona Secretaría General y elige PQR.';
  } else {
    return 'Gracias por tu mensaje. En breve te responderé con más detalles.';
  }
}

// Función para hablar (voz femenina)
function hablar(texto) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = texto;
  speech.lang = 'es-ES';
  speech.pitch = 1;
  speech.rate = 1;
  speech.volume = 1;
  const voces = speechSynthesis.getVoices();
  speech.voice = voces.find(voz => voz.name.includes('Google') && voz.name.includes('español')) || null;
  speechSynthesis.speak(speech);
}