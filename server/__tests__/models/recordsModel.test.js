jest.mock('../../db/dbConfig', () => ({
    query: jest.fn((sql, params, callback) => callback(null, {
        affectedRows: 1,
        insertId: 1
    }))
}));

const db = require('../../db/dbConfig');
const { createRecord } = require('../../models/recordsModel');

describe('recordsModel', () => {
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

        expect(db.query).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(null, { insertId: 1 });
    })
    //insert the other functions adn test scenarios

});