(() => {
  const THEME_KEY = "theme";
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    iconSun.classList.toggle("hidden", !isDark);
    iconMoon.classList.toggle("hidden", isDark);
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener("click", () => {
    const next = root.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconBurger = document.getElementById("icon-burger");
  const iconClose = document.getElementById("icon-close");

  function setMenuOpen(open) {
    mobileMenu.classList.toggle("hidden", !open);
    iconBurger.classList.toggle("hidden", open);
    iconClose.classList.toggle("hidden", !open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    setMenuOpen(!isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  const typewriter = document.getElementById("typewriter-text");
  const aboutSection = document.getElementById("about");
  if (typewriter && aboutSection) {
    const text = typewriter.textContent;
    const charCount = text.length;
    typewriter.style.setProperty("--full-width", `${typewriter.scrollWidth}px`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typewriter.style.animation = `typing 2.6s steps(${charCount}, end) forwards, caret-blink 0.9s step-end infinite 2.6s`;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(aboutSection);
  }
})();
