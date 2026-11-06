const form = document.querySelector("#application-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});

