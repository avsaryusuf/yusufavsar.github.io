// =====================================
// MOBILE MENU
// =====================================
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// =====================================
// THEME SWITCH (DARK / LIGHT)
// =====================================
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  localStorage.setItem("theme", theme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = localStorage.getItem("theme") === "light" ? "dark" : "light";
    applyTheme(newTheme);
  });
}

applyTheme(localStorage.getItem("theme") || "dark");

// =====================================
// LANGUAGE SYSTEM (TR/EN)
// =====================================
const langToggle = document.getElementById("langToggle");

async function setLang(lang) {
  try {
    const res = await fetch(`assets/lang/${lang}.json`);
    const langData = await res.json();

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (langData[key]) el.innerHTML = langData[key];
    });

    localStorage.setItem("lang", lang);
  } catch (err) {
    console.error("Dil yüklenemedi:", err);
  }
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const newLang = localStorage.getItem("lang") === "en" ? "tr" : "en";
    setLang(newLang);
  });
}

setLang(localStorage.getItem("lang") || "tr");

// =====================================
// DYNAMIC BLOG
// =====================================
const blogContainer = document.getElementById("blogContainer");

if (blogContainer) {
  fetch("assets/js/blog.json")
    .then(res => res.json())
    .then(data => {
      const lang = localStorage.getItem("lang") || "tr";

      blogContainer.innerHTML = data.map(post => `
        <a href="${post.link}"
           class="border border-primary/30 p-6 rounded-lg hover:border-primary transition block">
          <h3 class="text-xl font-semibold text-primary">${
            lang === "en" ? post.title_en : post.title_tr
          }</h3>
          <p class="text-gray-300 text-sm mt-2">${
            lang === "en" ? post.desc_en : post.desc_tr
          }</p>
        </a>
      `).join("");
    });
}
