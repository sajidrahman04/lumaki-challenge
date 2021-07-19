// Pull packages
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/ErrorHandler');
require('dotenv').config();
require('./db/config');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// for CRUD/REST api endpoints
const userRouter = require('./routes/user');
const postingRouter = require('./routes/posting');

app.use('/user', userRouter);
app.use('/posting/', postingRouter);

app.use(errorHandler);

// start express server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;
