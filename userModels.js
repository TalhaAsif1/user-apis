const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        first_name :  { type: String },

        last_name:    { type: String },

        username:     { type: String, required: true, unique: true },

        age:          { type: Number },

        phone_number: { type: String, required: true, unique: true },

        email:        { type: String, required: true, unique: true },

    })

module.exports = mongoose.model('user', UserSchema)