const form = document.querySelector("#application-form");
const list = document.querySelector("#application-list");
const stats = document.querySelector("#stats");

const STORAGE_KEY = "job-tracker:applications";
const STATUS_TEXT = {
  applied: "已投递",
  viewed: "已查看",
  interview: "面试中",
  offer: "Offer",
  rejected: "已挂",
};
const STATUS_ORDER = Object.keys(STATUS_TEXT);

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

let applications = load();      // 原来是 = []

function updateStats() {
  const total = applications.length;
  const interviewing = applications.filter((a) => a.status === "interview").length;
  const offers = applications.filter((a) => a.status === "offer").length;

  stats.innerHTML = `总投递 <strong>${total}</strong> · 面试中 <strong>${interviewing}</strong> · Offer <strong>${offers}</strong>`;
}

function render() {
  list.innerHTML = applications
    .map((item) => `<li data-id="${item.id}"><strong>${item.company}</strong> · ${item.position} · ${item.appliedAt} · <span class="status-btn">${STATUS_TEXT[item.status] || "已投递"}</span>
 <button class="delete-btn">删除</button></li>`)

    .join("");
    updateStats();

}
list.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-btn")) return;

  const id = event.target.closest("li").dataset.id;
  applications = applications.filter((item) => item.id !== id);

  save();
  render();
});

list.addEventListener("click", (event) => {
  if (!event.target.classList.contains("status-btn")) return;

  const id = event.target.closest("li").dataset.id;
  const item = applications.find((a) => a.id === id);

  const next = (STATUS_ORDER.indexOf(item.status) + 1) % STATUS_ORDER.length;
  item.status = STATUS_ORDER[next];

  save();
  render();
});



form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  data.id = crypto.randomUUID();
  data.status = "applied";

  applications.push(data);
  save(); 

  render();
  form.reset();
});

render();


