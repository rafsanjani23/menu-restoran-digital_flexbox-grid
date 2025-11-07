// ========================================
// RESTORAN NUSANTARA - MAIN JAVASCRIPT
// ========================================

// ========= DARK MODE TOGGLE =========
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeText = document.getElementById("darkModeText");
const body = document.body;

// Check localStorage for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  darkModeText.textContent = "Mode Terang ☀️";
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    darkModeText.textContent = "Mode Terang ☀️";
    localStorage.setItem("theme", "dark");
  } else {
    darkModeText.textContent = "Mode Gelap 🌙";
    localStorage.setItem("theme", "light");
  }
});

// ========= STATUS BUKA/TUTUP =========
function updateStatus() {
  const now = new Date();
  const jam = now.getHours();
  const status = document.getElementById("status");

  if (jam >= 10 && jam < 22) {
    status.innerHTML = '<strong style="color: #22c55e;">BUKA 🟢</strong>';
  } else {
    status.innerHTML = '<strong style="color: #ef4444;">TUTUP 🔴</strong>';
  }
}

// Update status immediately on page load
updateStatus();

// Update status every minute (60000 milliseconds)
setInterval(updateStatus, 60000);

// ========= MENU FILTER =========
const filterButtons = document.querySelectorAll(".filter button");
const menuItems = document.querySelectorAll(".item");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    // Add active class to clicked button
    this.classList.add("active");
    this.setAttribute("aria-pressed", "true");

    const category = this.dataset.category;

    // Filter menu items
    menuItems.forEach((item) => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
        // Add smooth fade-in animation
        item.style.animation = "fadeIn 0.5s";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// ========= SMOOTH SCROLL =========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========= LAZY LOADING IMAGES WITH FADE-IN =========
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Set initial opacity to 0
        img.style.opacity = "0";

        // When image loads, fade it in
        img.onload = () => {
          img.style.transition = "opacity 0.5s";
          img.style.opacity = "1";
        };

        // Stop observing this image
        observer.unobserve(img);
      }
    });
  });

  // Observe all menu item images
  document.querySelectorAll(".item img").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ========= CONSOLE MESSAGE =========
console.log(
  "%c🍴 Restoran Nusantara",
  "color: #b22222; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cWebsite loaded successfully!",
  "color: #22c55e; font-size: 14px;"
);
console.log("%cDeveloped with ❤️", "color: #666; font-size: 12px;");

// ========= PAGE LOAD ANIMATION =========
window.addEventListener("load", () => {
  // Add fade-in class to body
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";
  }, 100);
});

// ========= ERROR HANDLING FOR IMAGES =========
document.querySelectorAll(".item img").forEach((img) => {
  img.addEventListener("error", function () {
    // If image fails to load, use a placeholder
    this.src =
      "https://via.placeholder.com/400x300/b22222/ffffff?text=Image+Not+Found";
    this.alt = "Image not available";
  });
});
