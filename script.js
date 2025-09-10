const toggle = document.getElementById('darkModeToggle');
const body = document.body;

// Cargar el modo oscuro desde localStorage
if(localStorage.getItem('darkMode') === 'enabled'){
  body.classList.add('dark');
  toggle.textContent = '☀️';
} else {
  toggle.textContent = '🌙';
}

// Cambiar modo oscuro y actualizar ícono
toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  if(body.classList.contains('dark')){
    localStorage.setItem('darkMode', 'enabled');
    toggle.textContent = '☀️';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    toggle.textContent = '🌙';
  }
});
