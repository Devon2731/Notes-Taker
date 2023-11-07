const express = require('express');

//import modular routers for notes.js
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;