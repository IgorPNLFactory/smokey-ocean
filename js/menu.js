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

// ===== Photographed menu prices =====
// Keep source prices in menu.html in sync with the photographed menu.
const photographedPrices = {
  // Beer & cider
  "Heineken 0%": "6€",
  "Corona": "7€",
  "Stella": "7€",
  "L'Authentique Cider": "8€",

  // Vodka
  "Belvedere": "12/140€",
  "Grey Goose": "12/140€",

  // Gin
  "Mare": "13/140€",
  "Bombay Premier": "12/140€",
  "Hendrick's": "12/140€",

  // Whiskey
  "Monkey Shoulder": "11/130€",
  "Black Label": "9/110€",

  // Cognac
  "Remy Martin": "14/160€"
};

document.querySelectorAll(".mi").forEach((item) => {
  const nameElement = item.querySelector(".mi__name");
  const priceElement = item.querySelector(".mi__price");
  if (!nameElement || !priceElement) return;

  const name = [...nameElement.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent.trim())
    .find(Boolean);

  if (name && photographedPrices[name]) {
    priceElement.textContent = photographedPrices[name];
  }
});
