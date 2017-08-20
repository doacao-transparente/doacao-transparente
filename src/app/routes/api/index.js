// Modules
const express = require('express');

// Routes
const cityRoute = require('./city');
const stateRoute = require('./state');

// Code
const router = new express.Router();

// Any other GET request returns to main
router.use('/city', cityRoute);
router.use('/state', stateRoute);

// Return the router
module.exports = router;
