import fs from 'fs';
import express from 'express';
import path from 'path';

const file = fs.openSync(path.join(__dirname, '../dist/env.js'), 'w');
fs.writeFileSync(file, `window.env = ${JSON.stringify({ API_HOST: process.env.API_HOST })};`, { encoding: 'utf8' });
fs.closeSync(file);

const app = express();
const port = process.env.PORT || 3000;

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.use(express.static(path.join(__dirname, '../dist'))).listen(port);
