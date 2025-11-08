const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = document.lastModified;

const menuButton = document.getElementById('menu-button');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');

  if (nav.classList.contains('open')) {
    menuButton.textContent = 'X'
  } else {
    menuButton.textContent = '☰'
  }
})