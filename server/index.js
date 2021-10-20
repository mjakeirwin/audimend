const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const pg = require("pg");
const Pool = require("pg").Pool;
var cors = require("cors");

const result = dotenv.config();

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

let connectionString =
  "postgresql://" +
  POSTGRES_USERNAME +
  ":" +
  POSTGRES_PASSWORD +
  "@" +
  POSTGRES_HOST +
  ":" +
  POSTGRES_PORT +
  "/" +
  POSTGRES_DATABASE;

const pool = new Pool({
  connectionString: connectionString,
});

const app = express(); // create express app

// Avoid cors issues
app.use(cors());

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// create a GET route for Similarity Table
app.get("/similarity", function (req, res) {
  pool.query("SELECT * FROM similarity;", function (err, result) {
    if (result) {
      res.send(result.rows);
    } else {
      console.log("similarity endpoint error", err, POSTGRES_HOST);
    }
  });
});

// create a GET route for searching
app.get("/search/:query", function (req, res) {
  let { query } = req.params;
  console.log("query", query);

  let sqlQuery = `SELECT * FROM similarity WHERE LOWER(title) LIKE '%${query.toLowerCase()}%'`;

  pool.query(sqlQuery, function (err, result) {
    if (result) {
      res.send(result.rows);
    } else {
      console.log("similarity endpoint error", err, POSTGRES_HOST);
    }
  });
});


// create a GET route for Audiobook Table
app.get("/audiobooks/:index", function (req, res) {
  let { index } = req.params;

  pool.query(
    `SELECT similarity.uuid, link, image_google, similarity.title, author,rating_google, text_snippet, categories_google, description_google FROM similarity,audiobooks WHERE similarity.uuid=audiobooks.uuid 
    AND 
    index > ${Number(index) - 20} AND index < ${Number(index) + 20}`,
    function (err, result) {
      if (result) {
        res.send(result.rows);
      } else {
        console.log("audiobooks endpoint error", err);
      }
    }
  );
});

// start express server on port 5000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
