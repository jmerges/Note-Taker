var express = require('express');
var fs = require('fs');
const { resolve } = require('path');
var path = require('path');
const { nextTick } = require('process');

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = JSON.parse(fs.readFileSync('./db/db.json'));

console.log(notes);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// This get ensures that all the links to files work
app.get("/assets/:folder/:file", function(req, res) {
    console.log(req.params.folder);
    res.sendFile(path.join(__dirname, `./public/assets/${req.params.folder}/${req.params.file}`));
});

app.get("/api/notes", function(req, res) {
    // res.sendFile(path.join(__dirname, "./db/db.json"));
    return res.json(notes);
});

app.delete("/api/notes/:id", function(req, res) {
    console.log("delete started on "+req.params.id);
    notes.splice(req.params.id-1, 1);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log("db.json written");
    });
    console.log("delete request end");
    res.send("complete");
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log("db.json written");
    });
    res.send();
});

// ==============================

app.listen(PORT, function() {
    console.log("App listening on PORT "+PORT);
});