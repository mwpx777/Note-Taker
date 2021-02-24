// dependencies
const { text } = require('express');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const { notes } = require('./Develop/db/db.json')

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// display notes from db.json
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/db/db.json'))
    res.json(notes);

});

function createNewNote(body, notesArray) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
        
    );

    return note;
};

// add new notes to db.json
app.post('/api/notes', (req, res) => {
    // creates new id number based on array length
    req.body.id = notes.length.toString();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

// display index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// display notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// delete note from db
app.delete('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
    const removeNote = notes.filter((deleteNote) => deleteNote.id !== req.params.id);
    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(removeNote));
    res.json(removeNote);
});

// port listener
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}!`);
});
