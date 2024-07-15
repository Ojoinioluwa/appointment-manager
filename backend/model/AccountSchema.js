const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    id: String, 
    name: {
        type: String,
        required: [true, 'name field cannot be empty'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Email must be provided'],
        unique: true
    },

    password: {
        type: String
    },

    role: {
        type: String,
        enum: ['doctor', 'patient'],
        required: true
    },

    schedules: [
        {
            title: String,
            date: {type: Date, default: new Date},
            duration: String,
            patientName: String
        }
    ],
    prescriptions: [
        {
            diagnosis: String,
            patientName: String,
            prescription: String
        }
    ]
})

module.exports = mongoose.model('Account', AccountSchema)