const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const notes = require('./Develop/db/db');
// const db = require('./Develop/db/db')

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// require('./routes/apiRoutes');
// require('./routes/htmlRoutes');

app.get('/api/db', (req, res) => {
  
    // res.send("this is working now!")
});

// display notes from db.json
app.get('/api/notes', (req, res) => {
    res.json(notes);
    // res.send("come on please work")
    // res.sendFile(path.join(__dirname, './Develop/db/db'))
});

// add new notes to db.json
app.post('/api/notes', (req, res) => {
  
        const note = JSON.parse(fs.readFileSync('./Develop/db/db'));
        const newNote = require.body;
        newNote.id = 
        notesArray.push(newNote);
        fs.writeFileSync(
            path.join(__dirname, '..Develop/db/db.json'),
            JSON.stringify({notesArray} , null, 2)
        );
        
    });



app.delete('/api/notes/:id' , (req, res) => {

});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
