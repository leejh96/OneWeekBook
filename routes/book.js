const express = require('express');
const router = express.Router();

router.get('/search', async (req, res, next) => {
    try {
        const { query } = req.query;
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        const api_url = 'https://openapi.naver.com/v1/search/book_json?query=' + encodeURI(query); // json 결과
        // const request = require('request');
        const axios = require('axios');
        const options = {
            url: api_url,
            headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
            method: 'get',
        };

        const response = await axios(options);
        if (response.status === 200) {
            res.json(response.data.items);
        } else {
            res.status(response.status).end();
            console.log('error = ' + response.status);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/review/:isbn', async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
});
module.exports = router;