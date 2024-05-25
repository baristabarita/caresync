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

    test('should find user by email', async () => {
        const email = "bocchi@email.com";
        const mockResults = [{ id: 1, email_address: email }];

        db.query.mockImplementation((sql, params, cb) => cb(null, mockResults));

        const result = await findUserByEmail(email);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('SELECT * FROM doctor WHERE email_address = ?'),
            [email],
            expect.any(Function)
        );
        expect(result).toEqual(mockResults[0]);
    });

    test('should return null if no user found', async () => {
        const email = "noonehere@email.com";

        db.query.mockImplementation((sql, params, cb) => cb(null, []));

        const result = await findUserByEmail(email);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('SELECT * FROM doctor WHERE email_address = ?'),
            [email],
            expect.any(Function)
        );
        expect(result).toBeNull();
    });

    test('should insert a user into the database', async () => {
        const user = {
            fname: "Test",
            lname: "User",
            profession: "Doctor",
            contact_number: "1234567890",
            email_address: "testuser@email.com",
            password: "password123"
        };

        db.query.mockImplementation((sql, params, cb) => cb(null, { insertId: 1 }));

        const result = await insertUser(user);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO doctor (fname, lname, profession, contact_number, email_address, password) VALUES (?, ?, ?, ?, ?, ?)'),
            [user.fname, user.lname, user.profession, user.contact_number, user.email_address, user.password],
            expect.any(Function)
        );
        expect(result).toBe(1);
    });

    test('should return error if database query fails', async () => {
        const email = "bocchi@email.com";
        const error = new Error("Database error");

        db.query.mockImplementation((sql, params, cb) => cb(error, null));

        await expect(findUserByEmail(email)).rejects.toThrow("Database error");
    });
});