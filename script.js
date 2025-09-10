const toggle = document.getElementById('darkModeToggle');
const body = document.body;

// Cargar el modo oscuro desde localStorage
if(localStorage.getItem('darkMode') === 'enabled'){
  body.classList.add('dark');
}

// Cambiar modo oscuro
toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  if(body.classList.contains('dark')){
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});
