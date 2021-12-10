import express from 'express';
import cros from 'cors';
import path from 'path';
import { py } from './python/ivt';

export const server = () => {
  const app = express();

  app.use(express.static('data'));
  app.use(cros());

  const port = 4000;

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/data', (req, res) => {
    res.sendFile(path.resolve(__dirname, './data', 'data.csv'));
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
