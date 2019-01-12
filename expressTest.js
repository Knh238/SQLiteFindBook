const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const booksdb = new sqlite3.Database('test.db');

async function findByID(id) {
  const query = `SELECT *
  FROM books
  WHERE IBSN = ?`;
  const resultOfSearch = await booksdb.get(query, [id], function(err, result) {
    if (err) {
      return console.error(err.message);
    }
    console.log(result);
    return result;
  });
  return resultOfSearch;
}

app.get('/:IBSN', (req, res, err) => {
  try {
    const bookID = req.params.IBSN;

    const bookInfo = findByID(bookID);
    res.send(bookInfo);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, function() {
  console.log('Ready');
});
