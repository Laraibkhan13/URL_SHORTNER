const express= require('express');
const { handleGeneratedShortURL } = require('../controllers/url');
const { handleGetShortURL} = require('../controllers/url');
const { model } = require('mongoose');
const router = express.Router();

router.post('/',handleGeneratedShortURL);
router.get('/:shortID',handleGetShortURL);


module.exports = router;
// This code sets up an Express router for handling URL shortening requests.
// It imports the necessary modules and defines a POST route that calls the `handleGeneratedShortURL` function from the controller.
// The router is then exported for use in the main application file.
// This code sets up an Express router for handling URL shortening requests.