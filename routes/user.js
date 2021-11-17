const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            //유저 존재o
            const tf = await bcrypt.compare(password, user.password);
            if (tf) {
                //비밀번호 o
                return res.json({
                    success: true,
                    user
                })
            }
            return res.json({
                //비밀번호 x
                success: false,
            })
        }
        return res.json({
            // 유저 존재 x
        })
    } catch (error) {
        next(error);
    }
});


router.post('/signup', async (req, res, next) => {
    try {
        const saltRounds = parseInt(process.env.SALTROUNDS);
        const { email, username, password, nickname } = req.body;
        const fUser = await User.findOne({ email });
        if (!fUser) {
            //이메일이 없을 때
            const hash = await bcrypt.hash(password, saltRounds);
            const user = await User.create({
                email,
                username,
                password: hash,
                nickname
            })
            return res.json({
                success: true
            })
        }
        // 이미 존재하는 이메일
        return res.json({
            success: false
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;