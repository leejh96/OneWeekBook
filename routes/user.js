const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User } = require('../models');
let codeNumber;
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
router.post('/emailcode', async (req, res, next) => {
    try {
        const { code } = req.body;
        if (parseInt(code) === codeNumber) {
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    } catch (error) {
        next(error);
    }
});
router.post('/email', async (req, res, next) => {
    const { email } = req.body;
    try {
        const mailconfig = {
            service: 'Gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD
            }
        }
        codeNumber = Math.floor(Math.random() * 10000)
        const message = {
            from: `${process.env.SENDER_EMAIL}`,
            to: email,
            subject: '이메일 인증 요청',
            html:
                `<div align="center">
                    <p>아래 인증코드를 입력하세요</p>
                    <br>
                    <span>${codeNumber}</span>
                </div>
                `
        }

        const transporter = nodemailer.createTransport(mailconfig);
        await transporter.sendMail(message)
        await transporter.close();
        res.json({
            success: true
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