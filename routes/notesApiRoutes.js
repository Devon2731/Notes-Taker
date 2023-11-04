// Importing the required packeges
const express = require('express');
const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('../helper/uuid');
const requst = require('request');
const axios = require('axios');
const { compileFunction } = require('vm');
require ('dotenv').config();

//Setting up the express middleware
notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));

//GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error reading notes' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});


//POST Route for save the note
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error reading notes' });
            } else {
                const notes = JSON.parse(data);
                notes.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), writeErr => {
                    if (writeErr) {
                        console.error(writeErr);
                        res.status(500).json({ error: 'Error saving note' });
                    } else {
                        const response = {
                            status: 'success',
                            body: newNote
                        };
                        console.log(response);
                        res.status(201).json(response);
                    }
                });
            }
        });
    } else {
        res.status(400).json('Error in posting notes');
    }
});

//DELETE Route to delete the note by id
notes.delete('/:id', (req, res) => {
    console.log('In deleteroute');
    let notesID = req.params.id;
    if (req.body && req.params.id) {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error('are we erroring out' + err);
            } else {
                const parsedNoted4Del = JSON.parse(data);
                let notesFound = parsedNoted4Del.findIndex(note => note.id === notesID);
                console.log ('In delete' + notesFound);
                if (notesFound >=0) {
                    parsedNotes = parsedNoted4Del.splice(notesFound, 1);
                    fs.writeFile('./db/db.json', JSON.stringify(parsedNoted4Del, null, 4), (writeErr) => 
                        writeErr
                            ? console.error(writeErr) 
                            : console.log('Successfully deleted notes!')
                    )
                    res.json(parsedNoted4Del);
                }
            }
        });
    } else {
        console.log('Error in req');
        res.json('invaild request');
    }
})

