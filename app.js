const form = document.querySelector("#application-form");
const list = document.querySelector("#application-list");
const STORAGE_KEY = "job-tracker:applications";
const STATUS_TEXT = {
  applied: "已投递",
  viewed: "已查看",
  interview: "面试中",
  offer: "Offer",
  rejected: "已挂",
};

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
    .map((item) => `<li data-id="${item.id}"><strong>${item.company}</strong> · ${item.position} · ${item.appliedAt} · ${STATUS_TEXT[item.status] || "已投递"} <button class="delete-btn">删除</button></li>`)

    .join("");
}

list.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-btn")) return;

  const id = event.target.closest("li").dataset.id;
  applications = applications.filter((item) => item.id !== id);

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


