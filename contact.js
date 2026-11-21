// CONTACT FORM VALIDATION
const form = document.querySelector("#contact-form");
const successMessage = document.querySelector("#success-message");

// Shows (or clears) the error text under one field. Returns true when there is no error.
function setError(fieldId, message) {
  document.querySelector(`#${fieldId}-error`).textContent = message;
  document.querySelector(`#${fieldId}`).setAttribute("aria-invalid", message ? "true" : "false");
  return message === "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  // Read what the user typed
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#message").value.trim();
  const consent = document.querySelector("#consent").checked;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // text@text.text

  // Check every field (each line returns true if the field is OK)
  const results = [
    setError("name", name.length < 3 ? "Name must be at least 3 characters." : ""),
    setError("email", emailPattern.test(email) ? "" : "Please enter a valid email address."),
    setError("subject", subject === "" ? "Please choose a subject." : ""),
    setError("message", message.length < 20 ? `Message must be at least 20 characters (you have ${message.length}).` : ""),
    setError("consent", consent ? "" : "Please tick the box to continue."),
  ];

  // If any field failed: hide success, jump to the first wrong field, and stop
  if (results.includes(false)) {
    successMessage.hidden = true;
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  // Everything is valid
  successMessage.textContent = `Thank you, ${name}! Your message has been received.`;
  successMessage.hidden = false;
  form.reset();
});
