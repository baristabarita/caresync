// Import the express library to create router instances
const express = require('express');

// Import functions from the records controller which handle the business logic for record operations
const { 
    addRecord, 
    viewRecords, 
    viewRecordById, 
    viewRecordsByDoctorId, 
    editRecord, 
    deleteRecord 
} = require('../controllers/recordsController');

// Import validation middleware functions that check the integrity and correctness of incoming data for records
const { 
    validateRecord, 
    validateUpdateRecord 
} = require('../validations/recordsValidation');

// Create a router object to define routes for record-related operations
const router = express.Router();

// POST route to add a new record, with incoming data validated by validateRecord middleware before handling by addRecord
router.post('/add', validateRecord, addRecord);

// GET route to view all records, handled by the viewRecords controller function
router.get('/view', viewRecords);

// GET route to view a specific record by its ID and related doctor's ID, handled by the viewRecordById controller function
router.get('/view/doctor/:doctor_id/record/:record_id', viewRecordById);

// GET route to view all records associated with a specific doctor, using the doctor's ID, handled by the viewRecordsByDoctorId function
router.get('/view/doctor/:doctor_id', viewRecordsByDoctorId);

// PUT route to update a specific record identified by doctor and record ID, with data validated by validateUpdateRecord before editing via editRecord
router.put('/edit/:doctor_id/:record_id', validateUpdateRecord, editRecord);

// DELETE route to remove a specific record identified by doctor and record ID, handled by the deleteRecord function
router.delete('/delete/:doctor_id/:record_id', deleteRecord);

// Export the router to be mounted by the main Express application
module.exports = router;
