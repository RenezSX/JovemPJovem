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

// Seleciona todos os corações
const favoritos = document.querySelectorAll(".curso-favorito");

// Carrega favoritos do localStorage
let favoritosSalvos = JSON.parse(localStorage.getItem("cursosFavoritos")) || [];

// Marca os que já estavam salvos
favoritos.forEach((btn, index) => {
  if (favoritosSalvos.includes(index)) {
    btn.classList.add("favorito-ativo");
    btn.innerHTML = "&#9829;"; // coração cheio
  }

  // Ao clicar, alterna
  btn.addEventListener("click", () => {
    btn.classList.toggle("favorito-ativo");

    if (btn.classList.contains("favorito-ativo")) {
      btn.innerHTML = "&#10084;";
      favoritosSalvos.push(index);
    } else {
      btn.innerHTML = "&#9825;";
      favoritosSalvos = favoritosSalvos.filter((i) => i !== index);
    }

    localStorage.setItem("cursosFavoritos", JSON.stringify(favoritosSalvos));
  });
});
