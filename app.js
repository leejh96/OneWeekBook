const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const app = express();

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('mongoDB connected ...')
    })
    .catch((err) => {
        console.error(err);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('server on...')
});