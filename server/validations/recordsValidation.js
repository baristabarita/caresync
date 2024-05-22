const Joi = require('joi');

// Validation schema for creating a new record
const recordSchema = Joi.object({
    patient_name: Joi.string().trim().required(),
    patient_age: Joi.number().integer().min(0).required(),
    patient_dob: Joi.date().less('now').required(),
    patient_gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    visit_date: Joi.date().required(), // Allow any date; remove .less('now') if appointments can be in the future
    purpose: Joi.string().trim().required(),
    diagnosis: Joi.string().trim().required(),
    prescription: Joi.string().trim().required(),
    record_status: Joi.string().valid('Pending', 'Ongoing', 'Complete', 'Cancelled').required(),
    doctor_id: Joi.number().integer().optional() // Ensure it's optional if it's being passed via URL
});

// Validation schema for updating a record
const updateRecordSchema = Joi.object({
    visit_date: Joi.date().required(),
    purpose: Joi.string().trim().required(),
    diagnosis: Joi.string().trim().required(),
    prescription: Joi.string().trim().required(),
    record_status: Joi.string().valid('Pending', 'Ongoing', 'Complete', 'Cancelled').required()
});

// Validate creating a new record
const validateRecord = (req, res, next) => {
    const { error } = recordSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ message: "Validation error", errors: errorMessage });
    }

    next();
};

// Validate updating a record
const validateUpdateRecord = (req, res, next) => {
    const { error } = updateRecordSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ message: "Validation error", errors: errorMessage });
    }

    next();
};

module.exports = {
    validateRecord,
    validateUpdateRecord
};
