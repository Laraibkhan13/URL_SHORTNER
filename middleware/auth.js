const { getMapdata } = require('../services/auth');

async function restricToLoggedinUserOnly(req,res,next)
{
    const sessionId = req.cookies.uid;
    if (!sessionId) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }

    const user = getMapdata(sessionId);
    if (!user) {
        return res.redirect('/login'); // Redirect to login if session is invalid
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
}

async function authUserOnly(req,res,next)
{
    const sessionId = req.cookies.uid;
    

    const user = getMapdata(sessionId);

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
}

module.exports={
    restricToLoggedinUserOnly,
    authUserOnly
}