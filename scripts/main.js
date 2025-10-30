const filterForm = document.getElementById("project-filter-form");
const projectCards = document.querySelectorAll(".project-card");

filterForm.addEventListener("change", (e) => {
  const category = e.target.value;

  projectCards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
