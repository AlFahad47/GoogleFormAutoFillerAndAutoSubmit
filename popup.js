const toggle = document.getElementById("toggleAutoSubmit");
const formDataDiv = document.getElementById("formData");
const addFieldBtn = document.getElementById("addField");

function createFieldRow(label = "", value = "") {
  const row = document.createElement("div");
  row.className = "row";

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.placeholder = "Field Label";
  labelInput.value = label;

  const valueInput = document.createElement("input");
  valueInput.type = "text";
  valueInput.placeholder = "Answer";
  valueInput.value = value;

  row.appendChild(labelInput);
  row.appendChild(valueInput);
  formDataDiv.appendChild(row);
}

function saveData() {
  const pairs = Array.from(formDataDiv.querySelectorAll(".row")).map(row => {
    const [labelInput, valueInput] = row.querySelectorAll("input");
    return [labelInput.value.trim(), valueInput.value.trim()];
  }).filter(([key, val]) => key && val);

  const answers = Object.fromEntries(pairs);
  chrome.storage.sync.set({ formAnswers: answers });
}

addFieldBtn.addEventListener("click", () => {
  createFieldRow();
});

formDataDiv.addEventListener("input", saveData);

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ autoSubmitEnabled: toggle.checked });
});

// Load saved state
chrome.storage.sync.get(["autoSubmitEnabled", "formAnswers"], (data) => {
  toggle.checked = data.autoSubmitEnabled || false;
  const answers = data.formAnswers || {};
  Object.entries(answers).forEach(([label, value]) => createFieldRow(label, value));
});

//footer
// document.getElementById("donateBtn").addEventListener("click", () => {
//   chrome.tabs.create({ url: "https://www.buymeacoffee.com/fahadmolla" });
// });
document.getElementById("githubBtn").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://github.com/AlFahad47" });
});
document.getElementById("bkashBtn").addEventListener("click", () => {
  const number = "01686891618";
  navigator.clipboard.writeText(number)
    .then(() => alert("Copied: " + number))
    .catch((err) => console.error("Clipboard error:", err));
});