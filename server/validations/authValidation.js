const Joi = require('joi');

// Define the registration validation schema
const registerSchema = Joi.object({
  fname: Joi.string().min(2).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters long'
  }),
  lname: Joi.string().min(2).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters long'
  }),
  profession: Joi.string().required().messages({
    'string.empty': 'Profession is required'
  }),
  email_address: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required'
  }),
  contact_number: Joi.string().pattern(new RegExp('^[0-9]+$')).required().messages({
    'string.pattern.base': 'Contact number must be a valid phone number',
    'string.empty': 'Contact number is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required'
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Enter a valid email address',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password cannot be empty'
  })
});

// Validation middleware functions
const validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin
};
