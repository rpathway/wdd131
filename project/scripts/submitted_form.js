let reviewCount = parseInt(localStorage.getItem("reviewCount") || "0");
const urlParams = new URLSearchParams(window.location.search);
const summaryDiv = document.getElementById("reviewSummary");
const review = urlParams.get("review");
const userName = urlParams.get("userName");
const userEmail = urlParams.get("userEmail");
const feedbackType = urlParams.get("feedbackType");
const feedbackCategory = urlParams.get("feedbackCategory");

reviewCount++;
localStorage.setItem("reviewCount", reviewCount);
document.getElementById("reviewCount").textContent = reviewCount;

if (feedbackType) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Type:</strong> ${feedbackType}</div>`;
}

if (feedbackCategory) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Category:</strong> ${feedbackCategory}</div>`;
}

if (userName) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Written by:</strong> ${userName}</div>`;
}

if (userEmail) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Contact Email:</strong> ${userEmail}</div>`;
}

if (review) {
  summaryDiv.innerHTML += `<div class="detail-item"><strong>Review:</strong> ${review}</div>`;
}