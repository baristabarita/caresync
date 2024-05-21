require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbConfig.js')
const cors = require('cors');

const PORT = process.env.PORT || 7000;

const app = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET","POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get('/', (req,res)=>{
    res.json({
        successful: true,
        data:[1,2,3],
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
