/*jslint node: true, es6: true,esversion: 6 */

import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    address: String,
    role: String,
    createDate: Date,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
