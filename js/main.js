/* =============================
// -----------------------------
// HAMBURGER MENU
// -----------------------------
function toggleMenu() {
const nav = document.getElementById("nav-menu");
nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}


// Menü linkine tıklayınca otomatik kapanır (mobil için)
const navLinks = document.querySelectorAll('#nav-menu a');
navLinks.forEach(link => {
link.addEventListener('click', () => {
const nav = document.getElementById('nav-menu');
if (window.innerWidth <= 768) nav.style.display = 'none';
});
});


// -----------------------------
// DARK MODE
// -----------------------------
function toggleTheme() {
const html = document.documentElement;
const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
html.setAttribute("data-theme", newTheme);
localStorage.setItem("theme", newTheme);
}


// Sayfa açıldığında önceki tema yüklensin
(function applySavedTheme() {
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
})();


// -----------------------------
// SMOOTH SCROLL (Profesyonel)
// -----------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior: 'smooth'
});
});
});


// -----------------------------
// FADE-IN ANIMATIONS
// -----------------------------
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fade-in');
}
});
});


document.querySelectorAll('.section, .service-box, .portfolio-item').forEach(elem => {
observer.observe(elem);
});
