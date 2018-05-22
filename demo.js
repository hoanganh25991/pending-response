const express = require('express');
const app = express();
const opener = require('opener');
const Pending = require('./pending');

const PORT = 3000;
// Fake heavy task "importEmail"
const importEmail = () => new Promise(resolve => setTimeout(() => resolve({ inserted: 6765434 }), 300000));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/import', async (req, res) => {
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
