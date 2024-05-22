// Import necessary modules
const express = require('express');
// Create a new router object to handle routes
const router = express.Router();
// Import the authentication controllers that handle the logic for registering, logging in, and logging out
const { register, login, refreshToken, logout } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../validations/authValidation');

// Define the POST route for user registration. This route will use the register function from the authController.
router.post('/register', validateRegistration, register);

// Define the POST route for user login. This route will use the login function from the authController.
router.post('/login', validateLogin, login);

router.post('/refresh', refreshToken);

// Define the POST route for user logout. This route will use the logout function from the authController.
router.post('/logout', logout);

// Export the router to be used by other parts of the application, such as the main Express app.
module.exports = router;
