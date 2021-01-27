# Note-Taker
application: https://salty-badlands-08672.herokuapp.com/  
<br>
James Merges  
email: jamesmerges1@gmail.com  
github: https://github.com/jmerges  
linkedin: https://www.linkedin.com/in/james-merges-b938401b7/  
<br>
## Description
This app is a note taker I built with express.js. Express is an npm package for setting up servers. This app was a great opportunity for me to get my hands dirty playing around with servers. The app itself is rather simple because the point of the app was to get used to server gets and deletes and posts.  
<br>
## Tools Used
The HTML, CSS, and client side javascript were provided by Berkeley Bootcamp. I wrote my own server side javascript to make the site function correctly.  
<br>
## Code Snippets
I grabbed the notes JSON data from a file:  
```javascript
var notes = JSON.parse(fs.readFileSync('./db/db.json'));
```  
And I was given an index.js page that made some requests to the server that all looked something like this:
```javascript
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};
```  
And they were called like this:  
```javascript
deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
});
```  
So I wrote express.js functions to deal with these requests and give back an appropriate response:  
```javascript
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
```  