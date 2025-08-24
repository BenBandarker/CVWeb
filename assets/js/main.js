
// ===== ScrollReveal for sections =====
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (!isMobile && window.ScrollReveal) {
    ScrollReveal().reveal("section", {
      distance: "50px",
      duration: 800,
      easing: "ease-out",
      origin: "bottom",
      interval: 150
    });
  }
});

// ===== Contact form handler (Netlify function) =====
const formEl = document.getElementById("contact-form");
const statusEl = document.getElementById("contact-status");
const sendBtn  = document.getElementById("contact-submit");

// Basic email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let statusTimer;
function showStatus(msg, type = "info") {
  clearTimeout(statusTimer);
  statusEl.textContent = msg;
  statusEl.className = `contact-status ${type}`;
  statusTimer = setTimeout(() => {
    statusEl.textContent = "";
    statusEl.className = "contact-status";
  }, 8000);
}

formEl?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name    = (document.getElementById("name") || {}).value?.trim() || "";
  const email   = (document.getElementById("email") || {}).value?.trim() || "";
  const message = (document.getElementById("message") || {}).value?.trim() || "";
  // Honeypot:
  const bot     = (document.getElementById("bot-field") || {}).value?.trim() || "";

  if (bot) {
    return showStatus("❌ Bot detected.", "error");
  }
  if (!name || !email || !message) {
    return showStatus("❌ Please fill all fields.", "error");
  }
  if (!emailRegex.test(email)) {
    return showStatus("❌ Please enter a valid email address.", "error");
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";

  try {
    const res = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, bot_field: bot }),
    });
    const data = await res.json();

    if (res.ok && data.ok) {
      showStatus("✅ Message sent successfully! Thanks, I’ll get back to you soon.", "success");
      formEl.reset();
    } else {
      showStatus("❌ " + (data.error || "Failed to send email."), "error");
    }
  } catch (err) {
    showStatus("❌ Network error. Please try again.", "error");
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Submit Message";
  }
});