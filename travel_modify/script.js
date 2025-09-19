//NAV ACTIVE
document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

//PACKAGES
const packages = [
  { id: 1, destination: "Maldives", durationDays: 7, basePrice: 1200, season: "high" },
  { id: 2, destination: "Nepal", durationDays: 10, basePrice: 1500, season: "mid" },
  { id: 3, destination: "Paris", durationDays: 5, basePrice: 1000, season: "high" },
  { id: 4, destination: "Dubai", durationDays: 4, basePrice: 800, season: "low" },
  { id: 5, destination: "Japan", durationDays: 8, basePrice: 1400, season: "high" },
  { id: 6, destination: "Canada Rockies", durationDays: 9, basePrice: 1600, season: "mid" },
  { id: 7, destination: "Bali", durationDays: 6, basePrice: 1100, season: "mid" },
  { id: 8, destination: "Egypt", durationDays: 7, basePrice: 1300, season: "low" }
];

function calculateFinalPrice(pkg) {
  let multiplier = 1;
  switch (pkg.season) {
    case "high": multiplier = 1.2; break;
    case "mid": multiplier = 1.1; break;
    case "low": multiplier = 1; break;
  }
  return pkg.basePrice * multiplier;
}

function renderPackages() {
  const table = document.querySelector(".packages-table");
  if (!table) return;
  table.innerHTML = `
    <tr>
      <th>Package</th>
      <th>Destination</th>
      <th>Duration</th>
      <th>Base Price</th>
      <th>Final Price</th>
    </tr>
  `;
  packages.forEach(pkg => {
    const finalPrice = calculateFinalPrice(pkg);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.id}</td>
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>$${pkg.basePrice}</td>
      <td>$${finalPrice.toFixed(2)}</td>
    `;
    table.appendChild(row);
  });
}
renderPackages();

//BOOKING ESTIMATOR
function estimatePrice() {
  const packageSelect = document.querySelector("#package");
  const guestsInput = document.querySelector("#guests");
  const checkIn = document.querySelector("#checkin");
  const checkOut = document.querySelector("#checkout");
  const promo = document.querySelector("#promo");
  const totalField = document.querySelector("#total");

  if (!packageSelect || !guestsInput || !checkIn || !checkOut) return;

  const pkg = packages[packageSelect.selectedIndex - 1];
  if (!pkg) {
    totalField.textContent = "Select a package";
    return;
  }

  const nights = (new Date(checkOut.value) - new Date(checkIn.value)) / (1000 * 60 * 60 * 24);
  if (isNaN(nights) || nights <= 0) {
    totalField.textContent = "Invalid dates";
    return;
  }

  let total = calculateFinalPrice(pkg) * nights;

  const guests = parseInt(guestsInput.value) || 1;
  if (guests > 2) total *= 1.2;

  switch (promo.value.trim().toUpperCase()) {
    case "EARLYBIRD": total *= 0.9; break;
    case "FAMILY": total *= 0.85; break;
  }

  totalField.textContent = `$${total.toFixed(2)}`;
}

document.querySelectorAll("#package, #guests, #checkin, #checkout, #promo")
  .forEach(el => el?.addEventListener("input", estimatePrice));

//GALLERY MODAL
const galleryImages = document.querySelectorAll(".gallery-grid img");
if (galleryImages.length) {
  const modal = document.createElement("div");
  modal.className = "modal hidden";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img id="modal-img" src="" alt="">
      <p id="modal-caption"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = document.getElementById("modal-img");
  const caption = document.getElementById("modal-caption");
  const closeBtn = modal.querySelector(".close");

  galleryImages.forEach(img => {
    img.setAttribute("data-large", img.src);
    img.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modalImg.src = img.dataset.large;
      modalImg.alt = img.alt;
      caption.textContent = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}
