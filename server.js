// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var path = require("path")
// *** Dependencies
// =============================================================
var bodyParser = require("body-parser");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));


// Routes =============================================================
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(PORT, function() {
  console.log(`Server running http://localhost:${PORT}, Ctrl + c to stop`);
});