// ===== Sticky header =====
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

// ===== Mobile navigation =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ===== Scrollspy: highlight the nav link of the section in view =====
const spyLinks = document.querySelectorAll("[data-spy]");
const spySections = [...spyLinks].map((link) =>
  document.querySelector(link.getAttribute("href"))
);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      spyLinks.forEach((link) =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        )
      );
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
spySections.forEach((section) => section && spyObserver.observe(section));

// ===== Scroll-reveal animations =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Animated stat counters =====
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

// ===== Menu tabs =====
const menuTabs = document.querySelectorAll(".menu__tab");
const menuPanels = document.querySelectorAll(".menu__panel");

menuTabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    menuTabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    menuPanels.forEach((panel) =>
      panel.classList.toggle("active", panel.dataset.panel === tab.dataset.tab)
    );
  })
);

// ===== 3D tilt on cards =====
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

if (!reduceMotion && hasFinePointer) {
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ===== Hero mouse parallax =====
const heroInner = document.getElementById("heroInner");
const heroGlow = document.getElementById("heroGlow");
const hero = document.getElementById("hero");

if (!reduceMotion && hasFinePointer && hero) {
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    heroInner.style.transform = `translate(${x * -12}px, ${y * -8}px)`;
    heroGlow.style.transform = `translate(${x * 50}px, ${y * 40}px)`;
  });
  hero.addEventListener("mouseleave", () => {
    heroInner.style.transform = "";
    heroGlow.style.transform = "";
  });
}

// ===== Booking modal =====
const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");

// Fill the time dropdown with 30-minute slots from opening (13:00)
// until last seating (01:30, past midnight)
(() => {
  const timeSelect = document.getElementById("timeSelect");
  if (!timeSelect) return;
  const slots = [];
  for (let m = 13 * 60; m < 26 * 60; m += 30) {
    const h = Math.floor(m / 60) % 24;
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  timeSelect.innerHTML = slots
    .map((t) => `<option value="${t}">${t}</option>`)
    .join("");
  timeSelect.value = "20:00";
})();

function openBooking() {
  bookingModal.classList.add("open");
  bookingModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const dateInput = bookingForm.querySelector('input[name="date"]');
  if (!dateInput.value) dateInput.value = new Date().toISOString().split("T")[0];
  dateInput.min = new Date().toISOString().split("T")[0];
}

function closeBooking() {
  bookingModal.classList.remove("open");
  bookingModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open-booking]").forEach((btn) =>
  btn.addEventListener("click", openBooking)
);
document.querySelectorAll("[data-close-booking]").forEach((el) =>
  el.addEventListener("click", closeBooking)
);

// ===== Catering enquiry modal =====
const cateringModal = document.getElementById("cateringModal");
const cateringForm = document.getElementById("cateringForm");

function openCatering() {
  cateringModal.classList.add("open");
  cateringModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const dateInput = cateringForm.querySelector('input[name="date"]');
  dateInput.min = new Date().toISOString().split("T")[0];
}

function closeCatering() {
  cateringModal.classList.remove("open");
  cateringModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open-catering]").forEach((btn) =>
  btn.addEventListener("click", openCatering)
);
document.querySelectorAll("[data-close-catering]").forEach((el) =>
  el.addEventListener("click", closeCatering)
);

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (bookingModal.classList.contains("open")) closeBooking();
  if (cateringModal && cateringModal.classList.contains("open")) closeCatering();
});

if (cateringForm) {
  cateringForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(cateringForm);
    const lines = [
      "Hello Smoky Ocean! I'd like a hookah catering quote.",
      `Name: ${data.get("name")}`,
      `Event: ${data.get("type")}`,
      `Date: ${data.get("date")}`,
      `Guests: ${data.get("guests")}`,
      `Location: ${data.get("location")}`,
      `Hookahs: ${data.get("hookahs")}`,
    ];
    const note = (data.get("note") || "").trim();
    if (note) lines.push(`Note: ${note}`);
    const url = `https://wa.me/35799244895?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    closeCatering();
  });
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const lines = [
    "Hello Smoky Ocean! I'd like to book a table.",
    `Name: ${data.get("name")}`,
    `Guests: ${data.get("guests")}`,
    `Date: ${data.get("date")}`,
    `Time: ${data.get("time")}`,
  ];
  const note = (data.get("note") || "").trim();
  if (note) lines.push(`Note: ${note}`);
  const url = `https://wa.me/35799244895?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener");
  closeBooking();
});

// ===== Open now / closed indicator + highlight today's hours =====
function updateOpenStatus() {
  const status = document.getElementById("openStatus");
  const rows = document.querySelectorAll("#hoursList li");
  if (!status) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const minutes = now.getHours() * 60 + now.getMinutes();

  rows.forEach((row) => {
    const days = row.dataset.days.split(",").map(Number);
    row.classList.toggle("today", days.includes(day));
  });

  // Open 13:00 until 02:00 (Fri/Sat until 03:30 — late-night carries over from previous day)
  const lateClose = (day === 6 || day === 0) ? 210 : 120; // minutes after midnight
  const isOpen = minutes >= 13 * 60 || minutes < lateClose;

  const t = window.SO_I18N ? window.SO_I18N.t : (k) => k;
  status.textContent = isOpen ? t("status.open") : t("status.closed");
  status.classList.remove("open", "closed");
  status.classList.add(isOpen ? "open" : "closed");
}
updateOpenStatus();
document.addEventListener("langchange", updateOpenStatus);

// ===== Back to top =====
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 600);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Hero canvas: drifting smoke + rising embers =====
(() => {
  const canvas = document.getElementById("smokeCanvas");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  const smoke = [];
  const embers = [];
  const SMOKE_COUNT = 24;
  const EMBER_COUNT = 30;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function spawnSmoke(initial) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 80,
      radius: 50 + Math.random() * 110,
      speedY: 0.15 + Math.random() * 0.35,
      driftX: (Math.random() - 0.5) * 0.3,
      alpha: 0.02 + Math.random() * 0.05,
      hue: Math.random() > 0.5 ? "120, 219, 226" : "56, 169, 175",
    };
  }

  function spawnEmber(initial) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      size: 1 + Math.random() * 2.2,
      speedY: 0.4 + Math.random() * 0.9,
      driftX: (Math.random() - 0.5) * 0.5,
      alpha: 0.25 + Math.random() * 0.5,
      flicker: Math.random() * Math.PI * 2,
      warm: Math.random() > 0.6, // some embers glow orange like coals
    };
  }

  for (let i = 0; i < SMOKE_COUNT; i++) smoke.push(spawnSmoke(true));
  for (let i = 0; i < EMBER_COUNT; i++) embers.push(spawnEmber(true));

  let t = 0;
  function frame() {
    t += 0.02;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < smoke.length; i++) {
      const p = smoke[i];
      p.y -= p.speedY;
      p.x += p.driftX;
      if (p.y + p.radius < 0) smoke[i] = spawnSmoke(false);

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, `rgba(${p.hue}, ${p.alpha})`);
      gradient.addColorStop(1, `rgba(${p.hue}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < embers.length; i++) {
      const p = embers[i];
      p.y -= p.speedY;
      p.x += p.driftX + Math.sin(t + p.flicker) * 0.3;
      if (p.y < -10) embers[i] = spawnEmber(false);

      const glow = p.alpha * (0.7 + 0.3 * Math.sin(t * 3 + p.flicker));
      ctx.fillStyle = p.warm
        ? `rgba(255, 130, 70, ${glow})`
        : `rgba(120, 219, 226, ${glow})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
