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

// phần tìm kiếm sản phẩm
const searchInput = document.getElementById("searchInput");

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

// Bài 5
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const overlay = document.getElementById("overlay");
const closeFormBtn = document.getElementById("closeFormBtn");
const closeFormBtnTop = document.getElementById("closeFormBtnTop");
const searchBtn = document.getElementById("searchBtn");
const productContainer = document.querySelector(".product-container");


// ------------------ LOCAL STORAGE ------------------
// Lấy danh sách sản phẩm từ localStorage hoặc khởi tạo rỗng
let products = JSON.parse(localStorage.getItem("products")) || [];

// Hàm hiển thị sản phẩm ra giao diện
function renderProducts() {
  productContainer.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="badge ${p.status === "Còn hàng" ? "instock" : "soldout"}">
        ${p.status}
      </div>
      <img src="${p.img || "./assets/default.jpg"}" alt="${p.name}" />
      <div class="product-info">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <div class="price">
          <span class="new">${p.priceNew}</span>
          <span class="old">${p.priceOld || ""}</span>
        </div>
      </div>
    `;
    productContainer.prepend(card);
  });
}

// Khi tải trang → hiển thị sản phẩm có trong localStorage
window.addEventListener("load", renderProducts);

// ✅ Mở & đóng form
function openForm() {
  addProductForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeForm() {
  addProductForm.classList.add("hidden");
  overlay.classList.add("hidden");
  addProductForm.reset();
}

addProductBtn.addEventListener("click", openForm);
closeFormBtn.addEventListener("click", closeForm);
closeFormBtnTop.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);

// ✅ Bắt sự kiện submit form
addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Lấy dữ liệu từ form
  const img = document.getElementById("productImg").value.trim();
  const name = document.getElementById("productName").value.trim();
  const desc = document.getElementById("productDesc").value.trim();
  const status = document.getElementById("productStatus").value.trim();
  const priceNew = document.getElementById("productPriceNew").value.trim();
  const priceOld = document.getElementById("productPriceOld").value.trim();

  // ✅ Validate dữ liệu
  if (!name || !desc || !priceNew) {
    alert("Vui lòng nhập đầy đủ tên, mô tả và giá sản phẩm!");
    return;
  }

  const priceNum = parseFloat(priceNew.replace(/[^\d]/g, ""));
  if (isNaN(priceNum) || priceNum <= 0) {
    alert("Giá mới phải là số hợp lệ và lớn hơn 0!");
    return;
  }

  // ✅ Tạo đối tượng sản phẩm mới
  const newProduct = { img, name, desc, status, priceNew, priceOld };

  // ✅ Lưu vào mảng và localStorage
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  // ✅ Hiển thị lại danh sách
  renderProducts();

  // ✅ Reset và ẩn form
  addProductForm.reset();
  closeForm();
});

// ✅ Chức năng tìm kiếm
function updateSearchList() {
  let query = searchInput.value.trim().toLowerCase();
  const allProducts = document.querySelectorAll(".product-card");

  allProducts.forEach((card) => {
    const name = card.querySelector(".product-info h4").textContent.toLowerCase();
    const desc = card.querySelector(".product-info p").textContent.toLowerCase();
    card.style.display = name.includes(query) || desc.includes(query) ? "block" : "none";
  });
}

searchBtn.addEventListener("click", updateSearchList);
searchInput.addEventListener("input", updateSearchList);
