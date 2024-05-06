const Review = require('../../../models/review'); // Mengimpor model ulasan

// Buat ulasan baru
async function createReview(productId, userId, rating, comment) {
  const review = new Review({
    productId,
    userId,
    rating,
    comment,
  });

  await review.save();
  return review;
}

// Dapatkan semua ulasan untuk produk tertentu
async function getReviewsByProduct(productId) {
  return Review.find({ productId });
}

// Perbarui ulasan
async function updateReview(reviewId, rating, comment) {
  const review = await Review.findById(reviewId);

  if (!review) {
    return null;
  }

  review.rating = rating;
  review.comment = comment;

  await review.save();
  return review;
}

// Hapus ulasan
async function deleteReview(reviewId) {
  const result = await Review.findByIdAndDelete(reviewId);

  return !!result;
}

module.exports = {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
};
