const express = require('express');
const app = express();
const opener = require('opener');
const Pending = require('./pending');

const PORT = 3000;
const PENDING_TIME = 300000;

// Fake heavy task "importEmail"
const importEmail = () => new Promise(resolve => setTimeout(() => resolve({ inserted: 654321 }), PENDING_TIME));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/import', async (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  res.writeHead(200, {
    // 'Content-Length': 10000000,
    'Content-Type': 'text/plain'
  });

  const pending = Pending(res);
  const result = await importEmail();
  pending.stop();

  res.write(JSON.stringify(result));
  res.end();
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('Running', url);
  opener(url);
});
