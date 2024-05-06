const marketplaceService = require('./marketplace-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createReview(req, res, next) {
  try {
    const { productId, userId, rating, comment } = req.body;

    const review = await marketplaceService.createReview(
      productId,
      userId,
      rating,
      comment
    );

    return res.status(201).json(review); // Status 201 untuk POST
  } catch (error) {
    return next(error); // Tangani error dengan next()
  }
}

// Ulasan berdasarkan produk
async function getReviewsByProduct(req, res, next) {
  try {
    const { productId } = req.params;

    const reviews = await marketplaceService.getReviewsByProduct(productId);

    return res.status(200).json(reviews); // Status 200 untuk GET
  } catch (error) {
    return next(error);
  }
}

// Perbarui ulasan
async function updateReview(req, res, next) {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await marketplaceService.updateReview(
      reviewId,
      rating,
      comment
    );

    if (!review) {
      return res.status(404).json({ error: 'Review not found' }); // Tangani jika tidak ditemukan
    }

    return res.status(200).json(review);
  } catch (error) {
    return next(error);
  }
}

// Hapus ulasan
async function deleteReview(req, res, next) {
  try {
    const { reviewId } = req.params;

    const success = await marketplaceService.deleteReview(reviewId);

    if (!success) {
      return res.status(404).json({ error: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review deleted' }); // Status 200 untuk DELETE
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
};
