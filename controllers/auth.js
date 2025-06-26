const Auth= require('../models/auth');


async function handleauthSignup(req,res){
    const body = req.body;
    if (!body.username || !body.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    await Auth.create({
        username: body.username,
        email:body.email,
        password: body.password,
        createdAt: new Date()
    });

    return res.redirect('/');

}

async function handleauthLogin(req,res)
{
    const email = req.body.email;
    const password = req.body.password;

    const result=await Auth.findOne({ email: email, password: password });
    console.log(result);
    if (!result) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    return res.redirect('/'); // Redirect to home page on successful login


}

module.exports = {
    handleauthSignup,
    handleauthLogin,
};