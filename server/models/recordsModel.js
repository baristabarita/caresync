// Import the database configuration to enable connections to the database
const db = require('../db/dbConfig');

/**
 * Inserts a new record into the database.
 * @param {Object} record - The record object containing all necessary record fields.
 * @param {Function} callback - A callback function that handles the response or error.
 */
const createRecord = (record, callback) => {
    const sql = `INSERT INTO record (patient_name, patient_age, patient_dob, patient_gender, visit_date, purpose, diagnosis, prescription, record_status, doctor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
        sql,
        [
            record.patient_name,
            record.patient_age,
            record.patient_dob,
            record.patient_gender,
            record.visit_date,
            record.purpose,
            record.diagnosis,
            record.prescription,
            record.record_status,
            record.doctor_id
        ],
        callback
    );
};

/**
 * Retrieves all records from the database.
 * @param {Function} callback - A callback function that handles the database response or error.
 */
const getAllRecords = (callback) => {
    const sql = `SELECT * FROM record`;
    db.query(sql, callback);
};

/**
 * Retrieves a specific record by its ID and associated doctor's ID.
 * @param {number} doctor_id - The ID of the doctor associated with the record.
 * @param {number} record_id - The ID of the record to retrieve.
 * @param {Function} callback - A callback function to handle the response or error.
 */
const getRecordById = (doctor_id, record_id, callback) => {
    const sql = `SELECT * FROM record WHERE doctor_id = ? AND record_id = ?`;
    db.query(sql, [doctor_id, record_id], callback);
};

/**
 * Retrieves all records for a specific doctor, ordered by the visit date in descending order.
 * @param {number} doctor_id - The ID of the doctor whose records to retrieve.
 * @param {Function} callback - A callback function to handle the response or error.
 */
const getRecordsByDoctorId = (doctor_id, callback) => {
    const sql = `SELECT * FROM record WHERE doctor_id = ? ORDER BY visit_date DESC`;
    db.query(sql, [doctor_id], callback);
};

/**
 * Updates a specific record in the database.
 * @param {number} doctor_id - The ID of the doctor associated with the record.
 * @param {number} record_id - The ID of the record to update.
 * @param {Object} record - The updated values for the record.
 * @param {Function} callback - A callback function to handle the response or error.
 */
const updateRecord = (doctor_id, record_id, record, callback) => {
    const sql = `UPDATE record SET 
        visit_date = ?, 
        purpose = ?, 
        diagnosis = ?, 
        prescription = ?, 
        record_status = ? 
        WHERE doctor_id = ? AND record_id = ?`;

    db.query(
        sql,
        [
            record.visit_date,
            record.purpose,
            record.diagnosis,
            record.prescription,
            record.record_status,
            doctor_id,
            record_id
        ],
        callback
    );
};

/**
 * Deletes a specific record from the database.
 * @param {number} doctor_id - The ID of the doctor associated with the record to be deleted.
 * @param {number} record_id - The ID of the record to delete.
 * @param {Function} callback - A callback function to handle the deletion response or error.
 */
const deleteRecord = (doctor_id, record_id, callback) => {
    const sql = `DELETE FROM record WHERE doctor_id = ? AND record_id = ?`;
    db.query(sql, [doctor_id, record_id], callback);
};

// Export all functions to be used in other parts of the application
module.exports = {
    createRecord,
    getAllRecords,
    getRecordById,
    getRecordsByDoctorId,
    updateRecord,
    deleteRecord
};
