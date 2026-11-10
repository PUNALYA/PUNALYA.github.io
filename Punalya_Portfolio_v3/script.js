/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* Mobile menu */
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.classList.toggle("open", open);
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
}
document.querySelectorAll(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });

/* Active nav link */
const navLinks = document.querySelectorAll(".nav-links a");
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.style.color = link.getAttribute("href") === "#" + entry.target.id ? "var(--ink)" : "";
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });
document.querySelectorAll("section[id]").forEach((s) => navObserver.observe(s));

/* Footer year */
const footerYear = document.querySelector(".footer-year");
if (footerYear) footerYear.textContent = "© " + new Date().getFullYear() + " Punalya Nakkeeran";

/* Tiles and panes: tap to open on touch devices */
if (window.matchMedia("(hover: none)").matches) {
  document.querySelectorAll(".tile, .pane").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("open"));
  });
}

/* Strengths: click to show where each one showed up */
const strengthBtns = document.querySelectorAll(".strength");
const strengthPanel = document.querySelector(".strength-panel");
strengthBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const wasOpen = btn.getAttribute("aria-expanded") === "true";
    strengthBtns.forEach((b) => b.setAttribute("aria-expanded", "false"));
    if (wasOpen) {
      strengthPanel.textContent = "Pick a strength to see where it showed up.";
      return;
    }
    btn.setAttribute("aria-expanded", "true");
    strengthPanel.textContent = btn.dataset.text;
    strengthPanel.classList.remove("pop");
    void strengthPanel.offsetWidth;
    strengthPanel.classList.add("pop");
  });
});

/* Skills marquee: duplicate the list for a seamless loop */
const track = document.querySelector(".track");
if (track && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  Array.from(track.children).forEach((li) => {
    const copy = li.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);
  });
}
