const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productModel = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    dateCreated: { 
        type: Date, 
        default: Date.now ,
    },
})

productModel.set('collection', 'products');

module.exports = mongoose.model("productModel", productModel);