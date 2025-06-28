const Auth= require('../models/auth');
const { v4: uuidv4 } = require('uuid');
const { setMapdata ,getMapdata }=require('../services/auth');
const cookieParser = require('cookie-parser');




async function handleauthSignup(req,res){
    const body = req.body;
    if (!body.username || !body.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    await Auth.create({
        username: body.username,
        email:body.email,
        password: body.password,
        createdAt: new Date(),
    });

    return res.redirect('/');

}

async function handleauthLogin(req,res)
{
    const email = req.body.email;
    const password = req.body.password;

    const user=await Auth.findOne({ email: email, password: password });
    console.log(user);
    if (!user) {
        return res.redirect('/login');
    }

    const sessionId=uuidv4();
    console.log('sessionId:', sessionId);
    setMapdata(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect('/'); // Redirect to home page on successful login


}

module.exports = {
    handleauthSignup,
    handleauthLogin,
};