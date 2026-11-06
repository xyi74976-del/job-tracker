const form = document.querySelector("#application-form");
const list = document.querySelector("#application-list");

let applications = [];

function render() {
  list.innerHTML = applications
    .map((item) => `<li><strong>${item.company}</strong> · ${item.position} · ${item.appliedAt}</li>`)
    .join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  applications.push(data);

  render();
  form.reset();
});

render();


