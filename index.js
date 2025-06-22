const express= require('express');
const app = express();
const connectDB = require('./connect');
const urlRoute=require('./routes/url');


connectDB('mongodb+srv://khanlaraib13:Lb7007573539@cluster0.8dgrbiv.mongodb.net/URL_SHORTNER');

app.use("/url",urlRoute);
const port = 8001;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})