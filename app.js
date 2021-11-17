const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book');
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
app.use('/api/book', bookRouter);

app.use((req, res, next) => {
    res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
})
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('서버 에러!');
});

const port = process.env.PORT;

app.listen(port || 4040, () => {
    console.log(`${port}server on...`)
});