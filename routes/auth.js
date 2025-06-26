const express = require('express');
const router = express.Router();
const {handleauthSignup }= require('../controllers/auth');
const {handleauthLogin} = require('../controllers/auth');


router.post('/signup',handleauthSignup);
router.post('/login', handleauthLogin);

module.exports = router;