const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Helper function to generate tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

// Register User
const register = async (req, res) => {
    const { fname, lname, profession, contact_number, email_address, password } = req.body;
    try {
        const userExists = await userModel.findUserByEmail(email_address);
        if (userExists) {
            return res.status(409).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.insertUser({
            fname,
            lname,
            profession,
            contact_number,
            email_address,
            password: hashedPassword
        });
        const { accessToken, refreshToken } = generateTokens(newUser.insertId);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
        res.status(201).json({ message: "User registered", accessToken, user: { fname, lname, profession, contact_number, email_address } });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const { accessToken, refreshToken } = generateTokens(user.doctor_id);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
        res.json({ accessToken, user: { doctorId: user.doctor_id, fname: user.fname, lname: user.lname, profession: user.profession, contactNumber: user.contact_number, emailAddress: user.email_address } });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

// Refresh token
const refreshToken = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token is required" });
    }
    try {
        const userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const { accessToken } = generateTokens(userData.userId);
        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired refresh token", error: error.message });
    }
};

// Logout user
const logout = (req, res) => {
    res.cookie('refreshToken', '', { httpOnly: true, maxAge: 0, sameSite: 'Strict' });
    res.status(204).send();
};

module.exports = {
    generateTokens,
    register,
    login,
    refreshToken,
    logout
};
