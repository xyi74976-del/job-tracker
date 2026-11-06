const form = document.querySelector("#application-form");
const list = document.querySelector("#application-list");
const STORAGE_KEY = "job-tracker:applications";

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

let applications = load();      // 原来是 = []


function render() {
  list.innerHTML = applications
    .map((item) => `<li><strong>${item.company}</strong> · ${item.position} · ${item.appliedAt}</li>`)
    .join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  applications.push(data);
  save(); 

  render();
  form.reset();
});

render();


