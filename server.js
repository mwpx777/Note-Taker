// dependencies
const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./Develop/db/db');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// display notes from db.json
app.get('/api/notes', (req, res) => {
    res.json(notes);
    // res.send("notes endpoint working")
    // res.sendFile(path.join(__dirname, './Develop/db/db'))
    
});

// add new notes to db.json
app.post('/api/notes', (req, res) => {

    const note = JSON.parse(fs.readFileSync('./Develop/db/db'));
    const newNote = require.body;
    newNote.id =
        noteListItems.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '..Develop/db/db.json'),
        JSON.stringify({ noteListItems }, null, 2)
    );

});


// delete note from db
app.delete('/api/notes/:id', (req, res) => {

});

// port listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
