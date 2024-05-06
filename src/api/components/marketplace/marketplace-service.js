const reviewRepository = require('./marketplace-repository');

// Buat ulasan baru
async function createReview(productId, userId, rating, comment) {
  return await reviewRepository.createReview(
    productId,
    userId,
    rating,
    comment
  );
}

// Dapatkan semua ulasan untuk produk tertentu
async function getReviewsByProduct(productId) {
  return await reviewRepository.getReviewsByProduct(productId);
}

// Perbarui ulasan
async function updateReview(reviewId, rating, comment) {
  return await reviewRepository.updateReview(reviewId, rating, comment);
}

// Hapus ulasan
async function deleteReview(reviewId) {
  return await reviewRepository.deleteReview(reviewId);
}

module.exports = {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
};
