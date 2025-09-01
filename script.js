document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  const slideCount = document.querySelectorAll(".slide").length;

  let currentIndex = 0;
  const intervalTime = 5000; // 5 segundos

  function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide();
  }

  setInterval(nextSlide, intervalTime);

  const filtroBtns = document.querySelectorAll(".filtro-btn");
  const cursoCards = document.querySelectorAll(".curso-card");

  filtroBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove classe ativo de todos
      filtroBtns.forEach((b) => b.classList.remove("ativo"));
      this.classList.add("ativo");

      const org = this.getAttribute("data-org");
      cursoCards.forEach((card) => {
        if (org === "todos" || card.getAttribute("data-org") === org) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
