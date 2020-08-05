import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

import { routes } from './routes';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../client/build')));

routes(app);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), {
    etag: false,
  });
});

app.listen(4000, function () {
  console.log('App is lstening on port 4000!');
});
