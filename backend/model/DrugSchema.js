const mongoose = require('mongoose')


const DrugSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required :[true, 'name field cannot be empty']
    },

    price: {
        type: Number,
        required :[true, 'product price must be provided']
    },

    qty: {
        type: Number,
        required: [true, 'product quantity must be provided'],
        default: 1
    },

    last_restock: {
        type: Date,
        default: new Date()
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Drug', DrugSchema)