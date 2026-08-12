// ===== Category chips: smooth scroll + scrollspy highlight =====
const chips = document.querySelectorAll(".mp-chip");
const chipBar = document.getElementById("chips");
const sections = [...chips].map((chip) =>
  document.querySelector(chip.getAttribute("href"))
);

function activateChip(id) {
  chips.forEach((chip) => {
    const active = chip.getAttribute("href") === `#${id}`;
    chip.classList.toggle("active", active);
    // keep the active chip visible in the horizontally scrollable bar
    if (active) chip.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  });
}

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activateChip(entry.target.id);
    });
  },
  { rootMargin: "-15% 0px -75% 0px" }
);
sections.forEach((section) => section && spy.observe(section));

// ===== Back to top =====
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 600);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
