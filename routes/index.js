const express = require('express');

//Import our modular routers for notesApiRouter
const notesApiRouter = require('./notesAPIRouter.js');
const app = express();

app.use('/api/notes', notesApiRouter);

module.exports = app;