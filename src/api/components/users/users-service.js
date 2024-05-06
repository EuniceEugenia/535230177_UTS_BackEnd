const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users with pagination
 * @param {number} page_number - Current page number
 * @param {number} page_size - Number of users per page
 * @param {string} search - Search keyword
 * @param {string} sort - Sorting field and direction
 * @returns {Object} Result with pagination details and user data
 */
async function getUsers(
  page_number = '',
  page_size = '',
  search = '',
  sort = ''
) {
  const offset = (page_number - 1) * page_size; // Calculate offset for pagination

  // Check parameters
  console.log('Parameters:', { page_number, page_size, search, sort });

  // Get total count and users with pagination
  const { count, users } = await usersRepository.getUsers(
    offset,
    page_size,
    search,
    sort
  );

  // Verify the returned data
  console.log('Returned data:', { count, users });

  const total_pages = Math.ceil(count / page_size); // Calculate total pages

  const results = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
  }));

  return {
    page_number,
    page_size,
    count,
    total_pages,
    has_previous_page: page_number > 1, // Check if there is a previous page
    has_next_page: page_number < total_pages, // Check if there is a next page
    data: users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    })),
  };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  return user ? true : false; // Check if email is registered
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  if (!user) {
    return false; // User not found
  }

  return passwordMatched(password, user.password); // Check if password matches
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password); // Hash the new password

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null; // If password change fails
  }

  return true; // Successful password change
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
