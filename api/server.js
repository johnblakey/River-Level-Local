/**
 * Created by jb on 12/16/17.
 * https://devcenter.heroku.com/articles/mean-apps-restful-api
 * TODO implement sqlite3 into example
 */

const express = require("express");
const bodyParser = require("body-parser");
// sqlite3 to connect to db, .verbose() can be removed to reduce the stack trace
const sqlite3 = require("sqlite3").verbose();

let app = express();
app.use(bodyParser.json());

/** open sqlite database from local file */
let dbSource = "../dbRiverLevel/levels.db";
let db = new sqlite3.Database(dbSource, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Open connection to database:', dbSource);

    /* initialize the express app */
    var server = app.listen(process.env.PORT || 3000, function () {
        var port = server.address().port;
        console.log("Express app now running on port:", port);
    });
});

/** Levels API routes below */

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.get("/api/rivers", function(req, res) {
    console.log("accessed /api/rivers");    // debug ============
});

app.get("/api/rivers/:id", function(req, res) {
    console.log("accessed /api/rivers/:id");    // debug ========
});