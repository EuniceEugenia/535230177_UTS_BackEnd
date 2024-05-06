const Joi = require('joi');

const createReview = {
  body: Joi.object({
    productId: Joi.string().required(),
    userId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().allow(''), // Komentar tidak wajib
  }),
};

const updateReview = {
  params: Joi.object({
    reviewId: Joi.string().required(), // Pastikan ID ada di params
  }),
  body: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().allow(''), // Komentar bisa kosong
  }),
};

module.exports = {
  createReview,
  updateReview,
};
