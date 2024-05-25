jest.mock('../../db/dbConfig', () => ({
    query: jest.fn((sql, params, callback) => callback(null, {
        affectedRows: 1,
        insertId: 1
    }))
}));

const db = require('../../db/dbConfig');
const { createRecord, updateRecord, deleteRecord } = require('../../models/recordsModel');

describe('recordsModel', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('should insert a record into the database', () => {
        const record = {
            patient_name: "Test Patient",
            patient_age: 30,
            patient_dob: "1993-01-01",
            patient_gender: "Male",
            visit_date: "2024-04-24",
            purpose: "Test purpose",
            diagnosis: "Test diagnosis",
            prescription: "Test prescription",
            record_status: "Pending",
            doctor_id: 1
        };

        const callback = jest.fn();
        db.query.mockImplementation((sql, params, cb) => cb(null, { insertId: 1 }));

        createRecord(record, callback);

        expect(db.query).toHaveBeenCalledWith(
            `INSERT INTO record (patient_name, patient_age, patient_dob, patient_gender, visit_date, purpose, diagnosis, prescription, record_status, doctor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            expect.any(Function)
        );
        expect(callback).toHaveBeenCalledWith(null, { insertId: 1 });
    });

    test('should update a record in the database', () => {
        const record = {
            visit_date: "2024-05-24",
            purpose: "Updated purpose",
            diagnosis: "Updated diagnosis",
            prescription: "Updated prescription",
            record_status: "Complete"
        };
        const doctor_id = 1;
        const record_id = 1;
        const callback = jest.fn();

        db.query.mockImplementation((sql, params, cb) => cb(null, { affectedRows: 1 }));

        updateRecord(doctor_id, record_id, record, callback);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE record SET'),
            [
                record.visit_date,
                record.purpose,
                record.diagnosis,
                record.prescription,
                record.record_status,
                doctor_id,
                record_id
            ],
            expect.any(Function)
        );
        expect(callback).toHaveBeenCalledWith(null, { affectedRows: 1 });
    });

    test('should return error if update fails', () => {
        const record = {
            visit_date: "2024-05-24",
            purpose: "Updated purpose",
            diagnosis: "Updated diagnosis",
            prescription: "Updated prescription",
            record_status: "Complete"
        };
        const doctor_id = 1;
        const record_id = 1;
        const callback = jest.fn();
        const error = new Error("Database error");

        db.query.mockImplementation((sql, params, cb) => cb(error, null));

        updateRecord(doctor_id, record_id, record, callback);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE record SET'),
            [
                record.visit_date,
                record.purpose,
                record.diagnosis,
                record.prescription,
                record.record_status,
                doctor_id,
                record_id
            ],
            expect.any(Function)
        );
        expect(callback).toHaveBeenCalledWith(error, null);
    });

    test ('should delete a record in the database', () => {
        const doctor_id = 1;
        const record_id = 1;
        const callback = jest.fn();
        const error = new Error("Database error");

        db.query.mockImplementation((sql, params, cb) => cb(null,  { affectedRows: 1}));

        deleteRecord(doctor_id, record_id, callback);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('DELETE FROM record'),
            [
                doctor_id,
                record_id
            ],
            expect.any(Function),
        );
        expect(callback).toHaveBeenCalledWith(null, { affectedRows: 1 });
    });

    test('should return error if delete fails', () => {
        const doctor_id = 1;
        const record_id = 1;
        const callback = jest.fn();
        const error = new Error("Database error");

        db.query.mockImplementation((sql, params, cb) => cb(error, null));

        deleteRecord(doctor_id, record_id, callback);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('DELETE FROM record'),
            [
                doctor_id,
                record_id
            ],
            expect.any(Function),
        );
        expect(callback).toHaveBeenCalledWith(error, null);
    });
});