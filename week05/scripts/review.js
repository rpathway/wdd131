const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = document.lastModified;


let reviewCount = parseInt(localStorage.getItem("reviewCount") || "0");
const urlParams = new URLSearchParams(window.location.search);
const summaryDiv = document.getElementById("reviewSummary");
const productName = urlParams.get("productName");
const rating = urlParams.get("rating");
const installDate = urlParams.get("installDate");
const features = urlParams.getAll("features");
const review = urlParams.get("review");
const userName = urlParams.get("userName");


reviewCount++;
localStorage.setItem("reviewCount", reviewCount);
document.getElementById("reviewCount").textContent = reviewCount;


if (productName) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Product:</strong> ${productName}</div>`;
}

if (rating) {
  const stars = '\u2605'.repeat(parseInt(rating)) + '\u2606'.repeat(5 - parseInt(rating));
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Rating:</strong> ${stars}</div>`;
}

if (installDate) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Installation Date:</strong> ${installDate}</div>`;
}

if (features.length > 0) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Useful Features:</strong> ${features.join(', ')}</div>`;
}

if (review) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Review:</strong> ${review}</div>`;
}

if (userName) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Reviewer:</strong> ${userName}</div>`;
}
