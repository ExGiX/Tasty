const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    houseNumber: { type: String, required: true },
    street: { type: String, required: true },
    flatNumber: { type: String },
    note: { type: String },
    shipping : {type : Number , required : true},
    discount : {type : Number },
    totalPrice : {type : Number , required : true},
    orderCreated : {type : String , required : true},
    status: { type: String , required : true },
    orderedProducts: [],
})

module.exports = mongoose.model('order', orderModel);