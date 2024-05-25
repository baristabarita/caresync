const { addRecord, viewRecords, viewRecordById, editRecord, deleteRecord } = require('../../controllers/recordsController');
const RecordsModel = require('../../models/recordsModel');

//mocking the database
jest.mock('../../db/dbConfig', () => ({
    getConnection: jest.fn().mockImplementation((callback) => {
        callback(null, {
            query: jest.fn((sql, params, callback) => {
                callback(null, { affectedRows: 1, insertId: 1, rows:[] });  // Simulate successful function operation
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
    test('should view all records and return 200 status', async () => {
        const mockRecords = [
            { id: 1, patient_name: "Test Patient", patient_age: 30 },
            { id: 2, patient_name: "Test Patient 2", patient_age: 25 }
        ];
        RecordsModel.getAllRecords.mockImplementation((callback) => callback(null, mockRecords));

        await viewRecords(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRecords)
    });

    // test('view record by ID w/ status 200', () => {
    //     const mockRecord = { id: 1, patient_name: "Test Patient", patient_age: 30, doctor_id: 1 };
    //     function callback(error, data) {
    //         if (error) {
    //           done(error);
    //           return;
    //         }
    //         try {
    //           expect(data).toBe(
    //             mockRecord
    //           );
    //           done();
    //         } catch (error) {
    //           done(error);
    //         }
    //       }
        
    //       viewRecordById(callback);
    //     });


    test('should view a record by ID and return 200 status', async () => {
        // Mock req object with params
        const req = { params: { record_id: 1, doctor_id: 1} };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn()
        };


        const mockRecord = { id: 1, patient_name: "Test Patient", patient_age: 30, doctor_id: 1};
    
        // Mock RecordsModel.getRecordById function
        RecordsModel.getRecordById.mockImplementation((id, callback) => {
            expect(id).toBe(1);  
            callback(null, mockRecord);
        });
    
        // Call viewRecordById with req and res
        await viewRecordById(req, res);
    
        // Assert that status and json methods are called with correct values
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRecord);
    });
});
