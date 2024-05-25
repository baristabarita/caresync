const RecordsModel = require('../models/recordsModel');
const db = require('../db/dbConfig');

const addRecord = (req, res) => {
    RecordsModel.createRecord(req.body, (error, results) => {
        if (error) {
            res.status(500).json({ message: "Error adding record", error });
        } else {
            res.status(201).json({ message: "Record added successfully", results });
        }
    });
};

const viewRecords = (req, res) => {
    RecordsModel.getAllRecords((error, results) => {
        if (error) {
            res.status(500).json({ message: "Error fetching records", error });
        } else {
            res.status(200).json(results);
        }
    });
};

const viewRecordById = (req, res) => {
    const { doctor_id, record_id } = req.params;
    RecordsModel.getRecordById(doctor_id, record_id, (error, results) => {
        if (error) {
            res.status(500).json({ message: "Error fetching record", error });
        } else {
            // It's important to handle the case where no record is found
            if (results.length === 0) {
                res.status(404).json({ message: "Record not found" });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
};

const viewRecordsByDoctorId = (req, res) => {
    const { doctor_id } = req.params;
    RecordsModel.getRecordsByDoctorId(doctor_id, (error, results) => {
        if (error) {
            res.status(500).json({ message: "Error fetching records for doctor", error });
        } else {
            res.status(200).json(results);
        }
    });
};

const editRecord = (req, res) => {
    const { doctor_id, record_id } = req.params;
    console.log(req.params)
    RecordsModel.updateRecord(doctor_id, record_id, req.body, (error, results) => {
        
        if (error) {
            res.status(500).json({ message: "Error updating record", error });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "Record not found or no update made" });
            } else {
                res.status(200).json({ message: "Record updated successfully" });
            }
        }
    });
};
const deleteRecord = (req, res) => {
    const { doctor_id, record_id } = req.params;
    RecordsModel.deleteRecord(doctor_id, record_id, (error, results) => {
        if (error) {
            res.status(500).json({ message: "Error deleting record", error });
        } else {
            // Check if the record was actually found and deleted
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "Record not found" });
            } else {
                res.status(200).json({ message: "Record deleted successfully", results });
            }
        }
    });
};

module.exports = {
    addRecord,
    viewRecords,
    viewRecordById,
    viewRecordsByDoctorId,
    editRecord,
    deleteRecord
};
