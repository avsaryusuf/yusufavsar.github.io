// ------- Basit Animasyonlar ------- //
// Scroll olduğunda fade-in efektleri
const elements = document.querySelectorAll('.section, .hero, .service-box, .portfolio-item');

function fadeInOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll(); // Sayfa açıldığında animasyon başlasın

// ------- Mobil Menü (İstersen tasarlayabilirim) ------- //
// Şimdilik boş, istersen hamburger menu ekleriz.

// ------- Smooth Scroll ------- //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
