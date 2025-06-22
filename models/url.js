const mongoose= require('mongoose');

const URLSchema = new mongoose.Schema({
    shorURL:{
        type:String,
        required:true,
        unique:true,
    },
    originalURL:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }

});

const URL=mongoose.model('url',URLSchema);;

module.exports=URL;
// This code defines a Mongoose schema for a URL shortening service.