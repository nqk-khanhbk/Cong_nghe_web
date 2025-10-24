// bắt sự kiện click qua các intro khác
const slides = document.querySelectorAll(".intro-item");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(index);
  });
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

setInterval(nextSlide, 5000);

// bắt sự kiện click qua các intro khác

// phần tìm kiếm sản phẩm và thêm sản phẩm mới
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const productContainer = document.querySelector(".product-container");

// 🔍 Lọc sản phẩm theo từ khóa
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase().trim();
  let hasResult = false;

  productCards.forEach((card) => {
    const name = card.querySelector(".product-info h4").textContent.toLowerCase();
    const desc = card.querySelector(".product-info p").textContent.toLowerCase();
    if (name.includes(keyword) || desc.includes(keyword)) {
      card.style.display = "block";
      hasResult = true;
    } else {
      card.style.display = "none";
    }
  });

  // Nếu không tìm thấy sản phẩm
  let noResult = document.getElementById("noResult");
  if (!noResult) {
    noResult = document.createElement("p");
    noResult.id = "noResult";
    noResult.style.textAlign = "center";
    noResult.style.color = "#888";
    noResult.style.marginTop = "10px";
    addProductForm.insertAdjacentElement("afterend", noResult);
  }

  noResult.textContent = hasResult ? "" : "Không tìm thấy sản phẩm nào.";
});

// ➕ Ẩn/hiện form thêm sản phẩm
addProductBtn.addEventListener("click", () => {
  addProductForm.classList.toggle("hidden");
});
