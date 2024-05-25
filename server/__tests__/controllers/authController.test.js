const jwt = require('jsonwebtoken');
const { generateTokens, refreshToken, logout} = require('../../controllers/authController');
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
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn()
}));

describe('authController', () => {
    let req, res;
    
    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {},
            cookies: {}
        };
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    test('should correctly generate tokens', () => {
        const userId = 1;
        process.env.ACCESS_TOKEN_SECRET = 'access_secret';
        process.env.REFRESH_TOKEN_SECRET = 'refresh_secret';
        jwt.sign.mockImplementation((payload, secret, options) => `token-${payload.userId}-${options.expiresIn}`);

        const tokens = generateTokens(userId);

        expect(tokens.accessToken).toEqual('token-1-15m');
        expect(tokens.refreshToken).toEqual('token-1-7d');
        expect(jwt.sign).toHaveBeenCalledTimes(2);
        expect(jwt.sign).toHaveBeenNthCalledWith(1, { userId }, 'access_secret', { expiresIn: '15m' });
        expect(jwt.sign).toHaveBeenNthCalledWith(2, { userId }, 'refresh_secret', { expiresIn: '7d' });
    });

    test('should refresh the access token when provided with a valid refresh token', async () => {
        req.cookies.refreshToken = 'valid-refresh-token';
        jwt.verify.mockReturnValue({ userId: 1 });
        jwt.sign.mockReturnValue('new-access-token');

        await refreshToken(req, res);

        expect(jwt.verify).toHaveBeenCalledWith('valid-refresh-token', process.env.REFRESH_TOKEN_SECRET);
        expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        expect(res.json).toHaveBeenCalledWith({ accessToken: 'new-access-token' });
    });

    test('should return an error when refresh token is invalid', async () => {
        req.cookies.refreshToken = 'invalid-refresh-token';
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        await refreshToken(req, res);

        expect(jwt.verify).toHaveBeenCalledWith('invalid-refresh-token', process.env.REFRESH_TOKEN_SECRET);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid or expired refresh token", error: 'Invalid token' });
    });

    test('should handle missing refresh token', async () => {
        req.cookies.refreshToken = undefined; // Ensures no refresh token
        await refreshToken(req, res);

       
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Refresh Token is required" });
    });

    test('should clear refresh token cookie and send 204 status', () => {
        logout(req, res);

        expect(res.cookie).toHaveBeenCalledWith('refreshToken', '', { httpOnly: true, maxAge: 0, sameSite: 'Strict' });
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();  // Ensures this can be called without error
    });
});