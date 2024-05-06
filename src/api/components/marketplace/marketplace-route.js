const express = require('express');
const marketplaceControllers = require('./marketplace-controller');
const marketplaceValidator = require('./marketplace-validator');
const { celebrate } = require('../../../core/celebrate-wrappers');

const route = express.Router();

module.exports = (app) => {
  app.use('/api', route); // Prefix '/api'

  route.post(
    '/review', // Endpoint untuk POST review
    celebrate(marketplaceValidator.createReview), // Jika menggunakan validasi
    marketplaceControllers.createReview
  );

  route.get(
    '/review/:productId', // Endpoint untuk GET reviews berdasarkan productId
    marketplaceControllers.getReviewsByProduct
  );

  route.put(
    '/review/:reviewId', // Endpoint untuk update review berdasarkan reviewId
    celebrate(marketplaceValidator.updateReview), // Validasi jika diperlukan
    marketplaceControllers.updateReview
  );

  route.delete(
    '/review/:reviewId', // Endpoint untuk delete review berdasarkan reviewId
    marketplaceControllers.deleteReview
  );
};

service:
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