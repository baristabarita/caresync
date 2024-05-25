const { generateTokens, register, login, refreshToken, logout } = require('../../controllers/authController');
const UserModel = require('../../models/userModel');

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

jest.mock('../../models/userModel');  

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

});