(() => {
  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const logo = document.getElementById('logo'); // Logo
const logoImg = document.querySelector('#logo img'); // seleccionamos el <img> dentro del div logo

  // Función para actualizar logo según modo
  const actualizarLogo = () => {
    if(body.classList.contains('dark')) {
      logoImg.src = './images/logoTipoBlanco.png'; // ruta del logo oscuro
    } else {
      logoImg.src = './images/logoTipoazul.png'; // ruta del logo claro
    }
  }

  // Cargar modo oscuro
  if(localStorage.getItem('darkMode') === 'enabled' || 
     (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark');
    toggle.textContent = '☀️';
    actualizarLogo()
  } else {
    toggle.textContent = '🌙';
    actualizarLogo()
  }

  // Cambiar modo oscuro
  toggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    toggle.textContent = isDark ? '☀️' : '🌙';
    actualizarLogo()
  });

  // Menú hamburguesa
  hamburger.addEventListener('click', () => {
    const expanded = navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  // Animar timeline
  const items = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 70; // altura del header sticky
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});


  items.forEach(item => observer.observe(item));
})();
