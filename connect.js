const mongoose = require('mongoose');

async function connectDB(url){
    return mongoose.connect(url);
}

moduel.exports = connectDB;;
