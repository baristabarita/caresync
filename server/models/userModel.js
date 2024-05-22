const db = require('../db/dbConfig');

// Function to find a user by email
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM doctor WHERE email_address = ?';
        db.query(sql, [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
};

const insertUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO doctor (fname, lname, profession, contact_number, email_address, password) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [user.fname, user.lname, user.profession, user.contact_number, user.email_address, user.password], (error, results) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(results.insertId); // Resolve the promise with the insert ID
            }
        });
    });
};


module.exports = {
    findUserByEmail,
    insertUser
};
