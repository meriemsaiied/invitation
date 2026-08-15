const config = window.WEDDING_CONFIG;

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value;
  });
};

const initials = `${config.bride?.[0] || ""}${config.groom?.[0] || ""}`;

setText("[data-bride]", config.bride);
setText("[data-groom]", config.groom);
setText("[data-date]", config.displayDate);
setText("[data-time]", config.time);
setText("[data-venue]", config.venue);
setText("[data-dresscode]", config.dressCode);
setText("[data-monogram]", initials);

document.title = `${config.bride} & ${config.groom} — Wedding Invitation`;

// Celebrations (fall back to a single wedding if none are configured)
const celebrations = (Array.isArray(config.celebrations) ? config.celebrations : [])
  .map((c) => ({ ...c, dateObj: new Date(c.date) }))
  .filter((c) => !isNaN(c.dateObj));

const grid = document.getElementById("celebrationsGrid");
if (grid && celebrations.length) {
  grid.innerHTML = celebrations.map((c) => `
    <article class="celebration-card">
      <div class="celebration-icon">${c.icon || "✦"}</div>
      <h3>${c.name}</h3>
      <p class="celebration-date">${c.displayDate}</p>
      <p class="celebration-weekday">${c.dateObj.toLocaleDateString("en-US", { weekday: "long" })} · ${c.time}</p>
      <p>${c.venue}</p>
    </article>
  `).join("");
}

// Count down to the next upcoming celebration (last one if all have passed)
const now = new Date();
const upcoming = celebrations.filter((c) => c.dateObj > now);
const countdownTarget = upcoming[0] || celebrations[celebrations.length - 1] || {
  dateObj: new Date(config.weddingDate),
  displayDate: config.displayDate
};

const countdownDateEl = document.getElementById("countdownDate");
const countdownWeekdayEl = document.getElementById("countdownWeekday");
if (countdownDateEl) countdownDateEl.textContent = countdownTarget.displayDate;
if (countdownWeekdayEl) {
  countdownWeekdayEl.textContent = countdownTarget.dateObj.toLocaleDateString("en-US", { weekday: "long" });
}

function updateCountdown() {
  const now = new Date();
  let diff = countdownTarget.dateObj - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("openInvitation").addEventListener("click", () => {
  document.body.classList.add("invitation-open");
  setTimeout(() => {
    document.getElementById("welcome").scrollIntoView({ behavior: "smooth" });
  }, 1200);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");

musicButton.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicIcon.textContent = "❚❚";
    } else {
      music.pause();
      musicIcon.textContent = "♫";
    }
  } catch {
    alert("Add an MP3 file named music.mp3 inside the assets folder.");
  }
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
  }, 450);
});
