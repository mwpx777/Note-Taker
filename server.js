// dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const { notes } = require('./Develop/db/db.json')
// const uuidv4 = require("uuid");
// const shortid = require('shortid');



// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// display notes from db.json
app.get('/api/notes', (req, res) => {
    res.json(notes);
    // res.send("notes endpoint working")
    // res.sendFile(path.join(__dirname, './Develop/db/db'))

});

function createNewNote(body, notesArray) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    // console.log(body);
    return note;
}

// add new notes to db.json
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();   
    
    const newNote = createNewNote(req.body, notes);
    // res.json(req.body)
    res.json(newNote);


});


// this displays index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));

});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

});

// delete note from db
app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
    const deleteNote = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
});



// port listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
