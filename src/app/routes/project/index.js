// Modules
const express = require('express');

// Routes
const createRoute = require('./create');
const viewRoute = require('./view');

// Code
const router = new express.Router();

// Any other GET request returns to main
router.use('/create', createRoute);
router.use('/view', viewRoute);

// Return the router
module.exports = router;
