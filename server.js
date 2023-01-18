const express = require('express');
const path = require('path');
const { clog } = require('./src/middleware/clog');
const api = require('./src/routes/api.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/src/views/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/src/views/notes.html'))
);

// Wildcard route to direct users back to homepage
// TODO: fix "Uncaught SyntaxError: Unexpected token '<' (at index.js:1:1)"
// likely because it directs to html, and not js page?
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/src/views/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
