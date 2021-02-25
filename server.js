// dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
// const { notes } = require('./Develop/db/db.json')
const uuid = require('uuid');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// display notes from db.json
app.get('/api/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, './Develop/db/db.json'))
    const notes = fs.readFileSync('./Develop/db/db.json', 'utf8')
    console.log(notes);
    res.json(JSON.parse(notes));

});

// function to create new note
// function createNewNote(body, notesArray) {
//     const note = body;
//     notes.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, './Develop/db/db.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );
//     return note;
// };

// post to notes array
app.post('/api/notes', (req, res) => {
    let notes = fs.readFileSync('./Develop/db/db.json', 'utf8')
    notes = JSON.parse(notes)
    req.body.id = uuid.v4();
    
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    
   
    res.json(notes);
});

// delete note from db
app.delete('/api/notes/:id', (req, res) => {
    
    const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
    // console.log(notes)
    const removeNote = notes.filter((deleteNote) => deleteNote.id !== req.params.id);
    console.log(removeNote)
    fs.writeFileSync('./Develop/db/db.json', JSON.stringify(removeNote));
    res.json(removeNote);

});

// add new notes to db.json
// app.post('/api/notes', (req, res) => {
//     // creates new id number based on array length
//     req.body.id = notes.length.toString();
//     const newNote = createNewNote(req.body, notes);
//     res.json(newNote);
// });



// app.post('/api/notes', (req, res) => {
//     const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
//     const newNotes = req.body;
//     newNotes.id = uuid.v4();
//     notes.push(newNotes);
//     fs.writeFileSync('./Develop/db/db.json');
//     res.json(notes);
// })



// display notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// display index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// port listener
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});
