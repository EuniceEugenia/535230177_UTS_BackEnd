const { User } = require('../../../models');

/**
 * Get a list of users
 * @param {number} offset - Offset for pagination
 * @param {number} limit - Limit for pagination
 * @param {string} search - Search keyword
 * @param {string} sort - Sorting field and direction
 * @returns {Promise}
 */
// Penambahan pagination: parameter offset dan limit
async function getUsers(offset, limit, search = '', sort = '') {
  const query = {}; // Query untuk filter

  if (search && search.trim() !== '') {
    const regex = new RegExp(search.split(':')[1], 'i');
    const sc = new RegExp(search.split(':')[0], 'i'); // Case-insensitive regex

    if (sc == '/email/i') {
      query.email = { $regex: regex };
      console.log('SC:', sc);
      console.log('Ini Email');
    } else if (sc == '/name/i') {
      query.name = { $regex: regex };
      console.log('SC:', sc);
      console.log('ini name');
    }
  }

  const sortOption = {}; // Sorting option
  if (sort) {
    const [field, order] = sort.split(':'); // Memisahkan field dan urutan
    sortOption[field] = order === 'desc' ? -1 : 1; // Descending atau Ascending
  }

  console.log('Query:', query); // Tambahkan ini untuk menampilkan nilai query
  console.log('Sort Option:', sortOption); // Tambahkan ini untuk menampilkan nilai sortOption
  console.log('Offset:', offset); // Tambahkan ini untuk menampilkan nilai offset
  console.log('Limit:', limit); // Tambahkan ini untuk menampilkan nilai limit
  console.log('Regex:', new RegExp(search, 'i'));

  const users = await User.find(query)
    .skip(offset)
    .limit(limit)
    .sort(sortOption);

  const count = await User.countDocuments(query);

  return { count, users }; // Pengembalian objek dengan total count dan daftar pengguna
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id); // -
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  }); // -
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  ); // -
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id }); // -
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email }); // -
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } }); // -
}

// ... Perubahan pada fungsi getUsers dengan pagination
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
