const express= require('express');
const app = express();
const connectDB = require('./connect');
const urlRoute=require('./routes/url');
const path = require('path');
const staticRoutes = require('./routes/staticRoutes');
const auth = require('./routes/auth');
const {restricToLoggedinUserOnly, authUserOnly}=require('./middleware/auth');
const cookieParser = require('cookie-parser');




connectDB('mongodb+srv://khanlaraib13:Lb7007573539@cluster0.8dgrbiv.mongodb.net/URL_SHORTNER').then(()=>{console.log('Connected to MongoDB')}).catch((err)=>{console.error('Error connecting to MongoDB:', err)});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/url",restricToLoggedinUserOnly,urlRoute);
app.use("/",authUserOnly,staticRoutes);
app.use("/user",auth);
const port = 8001;
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})