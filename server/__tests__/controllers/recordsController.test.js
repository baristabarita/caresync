const { addRecord, viewRecords, viewRecordById, editRecord, deleteRecord } = require('../../controllers/recordsController');
const RecordsModel = require('../../models/recordsModel');

//mocking the database
jest.mock('../../db/dbConfig', () => ({
    getConnection: jest.fn().mockImplementation((callback) => {
        callback(null, {
            query: jest.fn((sql, params, callback) => {
                callback(null, { affectedRows: 1, insertId: 1 });  // Simulate successful function operation
            }),
            release: jest.fn()
        });
    })
}));

jest.mock('../../models/recordsModel');  

describe('recordsController', () => {
    let req, res;
    
    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    test('should add a record and return 201 status', async () => {
        req.body = {
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
        RecordsModel.createRecord.mockImplementation((data, callback) => callback(null, { insertId: 1 }));

        await addRecord(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Record added successfully',
            results: { insertId: 1 }
        });
    });

    //insert the other functions and test scenarios
});
