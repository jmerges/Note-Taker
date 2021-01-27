var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes;

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
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// ==============================

app.listen(PORT, function() {
    console.log("App listening on PORT "+PORT);
});