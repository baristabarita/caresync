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

    test('edit record and return 200 status', async () => {
        req.params = {
            doctor_id: 1,
            record_id: 1
        };

        req.body = {
            visit_date: "2024-01-01",
            purpose: "Update purpose", 
            diagnosis: "Update diagnosis", 
            prescription: "Update prescription", 
            record_status: "Complete"
        };

        RecordsModel.updateRecord.mockImplementation((doctor_id, record_id, data, callback) => callback (null, { affectedRows: 1 }));

        await editRecord(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Record updated successfully"
        });
    })

    test('should return 404 status if record to edit is not found', async () => {
        req.params = {
            doctor_id: 1,
            record_id: 1
        };
        req.body = {
            visit_date: "2024-05-24",
            purpose: "Updated purpose",
            diagnosis: "Updated diagnosis",
            prescription: "Updated prescription",
            record_status: "Complete"
        };

        RecordsModel.updateRecord.mockImplementation((doctor_id, record_id, data, callback) => callback(null, { affectedRows: 0 }));

        await editRecord(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Record not found or no update made"
        });
    });

    test('delete record and return 200 status',  async () => {
        req.params = {
            doctor_id: 1,
            record_id: 1
        };

        RecordsModel.deleteRecord.mockImplementation((doctor_id, record_id, callback) => callback (null, { affectedRows: 1}));

        await deleteRecord(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Record deleted successfully",
            results: {
                affectedRows: 1,
            },
        });
    });

    test('should return 404 status if record to delete is not found', () => {
        req.params = {
            doctor_id: 1,
            record_id: 1
        };

        RecordsModel.deleteRecord.mockImplementation((doctor_id, record_id, callback) => callback (null, { affectedRows: 0}));

        deleteRecord(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Record not found",
        })
    });
});
