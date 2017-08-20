// Modules
const express = require('express');

// Routes
const apiRoute = require('./api');
const dashboardRoute = require('./dashboard');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const registerRoute = require('./register');
const projectRoute = require('./project');

const loginMiddleware = require('../middleware/login.js');

// Code
const router = new express.Router();

// Any other GET request returns to main
router.use('/api', loginMiddleware, apiRoute);
router.use('/login', loginMiddleware, loginRoute);
router.use('/logout', loginMiddleware, logoutRoute);
router.use('/register', loginMiddleware, registerRoute);
router.use('/project', loginMiddleware, projectRoute);
router.use('/', loginMiddleware, dashboardRoute);

// Any other requests returns an error message
router.all('*', (req, res) => res.status(400).send({error: true, errorMessage: 'Invalid operation'}));

// Return the router
module.exports = router;
