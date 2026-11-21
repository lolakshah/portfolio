// DARK MODE TOGGLE (runs on every page)
const root = document.documentElement;       // the <html> element
const toggle = document.querySelector("#theme-toggle");

// 1. If the user chose a theme before, use it
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;           // adds data-theme="dark" or "light"
}

// 2. Find out which theme is showing right now
function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// 3. Show the right text on the button
function updateButton() {
  toggle.textContent = currentTheme() === "dark" ? "Light mode" : "Dark mode";
}

// 4. When the button is clicked: switch theme and remember it
toggle.addEventListener("click", () => {
  const newTheme = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  updateButton();
});

updateButton();
