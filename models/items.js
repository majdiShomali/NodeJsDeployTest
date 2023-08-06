const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//1- Create a new schema 
const itemSchema = new Schema({   
    Name: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    image:{
        type : String,
        required : true,
    },
    fav: {
        type : Array,
        required : false
    },
    rate: {
        type : Array,
        required : false
    },
    totalRate: {
        type : String,
        required : false
    },
    price:{
        type : String,
        required : true,
    },
    quantity:{
        type : Number,
        required : false,
        default : 0
    },
    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('Item',itemSchema);




    