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
let dbSource = "/home/jb/Development/Production/River-Level-Database/dbRiverLevel/levels.db";
let db = new sqlite3.Database(dbSource, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Open connection to database:', dbSource);

    /* initialize the express app */
    let port = "3000";
    const server = app.listen(port, "0.0.0.0", () => {
        var {address, port} = server.address();
        console.log(`Express app running at http://${address}:${port}`);
    });
});

/** Levels API routes below */

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/* return all river levels */
let sql = `SELECT siteName, levelValue, unitCode FROM
            rivers
                INNER JOIN
            levels
            ON levels.riverId = rivers.RiverId
                INNER JOIN
            (SELECT MAX(LevelId) lastLevel FROM levels GROUP BY riverId) maxId
            ON levels.LevelId = maxId.lastLevel;`
app.get("/api/rivers", function(req, res) {
    db.all(sql, function(err, rows) {
        res.json({ "name": rows.siteName, "level": rows.levelValue, "units": rows.unitCode})
    });
});

/* return one river level */
app.get("/api/rivers/:id", function(req, res) {

});
