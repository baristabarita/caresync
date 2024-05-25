jest.mock('../../db/dbConfig', () => ({
    query: jest.fn((sql, params, callback) => callback(null, {
        affectedRows: 1,
        insertId: 1
    }))
}));

const db = require('../../db/dbConfig');
const { findUserByEmail, insertUser } = require('../../models/userModel');

describe('userModel', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

});