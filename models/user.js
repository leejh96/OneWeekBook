const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        default: `랜덤${Math.floor(Math.random * 1000)}`,
        required: true
    },
    state: {
        type: Number,
        required: true,
        default: 0 // 0:회원, 1:회원탈퇴한 회원
    },
    status: {
        type: Number,
        required: true,
        default: 0 // 0: 일반회원 1: 관리자
    },
    createTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifyTime: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = userSchema;