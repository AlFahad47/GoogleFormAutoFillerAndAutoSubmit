chrome.storage.sync.get(["autoSubmitEnabled", "formAnswers"], (data) => {
  const answers = data.formAnswers || {};
  const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], textarea');

  inputFields.forEach(input => {
    const questionContainer = input.closest('[role="listitem"]');
    const labelText = questionContainer?.innerText?.trim();

    for (const [label, value] of Object.entries(answers)) {
      if (labelText && labelText.includes(label)) {
        input.focus();
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    }
  });

  // Check all checkboxes
  const checkboxes = document.querySelectorAll('[role="checkbox"]');
  checkboxes.forEach((box) => {
    if (box.getAttribute("aria-checked") !== "true") {
      box.click();
    }
  });

  // check Auto-submit slider
  if (!data.autoSubmitEnabled) return;

  // Auto-submit
  const submitButton =
    document.querySelector('div[role="button"][aria-label*="Submit"]') ||
    Array.from(document.querySelectorAll('div[role="button"]'))
      .reverse()
      .find((btn) => btn.innerText.toLowerCase().includes("submit"));

  if (submitButton) {
    submitButton.click();
  }
});
