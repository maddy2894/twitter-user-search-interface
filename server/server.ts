import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Twitter from 'twitter';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();
import { config } from './config/secrets-config';

const app = express();

const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/api/users/search', async function (req, res) {
  const { search, page } = req.query;
  let response;
  if (search === '') {
    return res.status(500).send({ message: 'Search term cannot be empty' });
  }
  try {
    response = await client.get('users/search.json', {
      q: search,
      count: 10,
      page,
    });
  } catch (e) {
    return res.status(500).send({ message: 'Invalid search.' });
  }
  return res.status(200).send({ response });
});

app.get('/api/user', async function (req, res) {
  let response;
  let tweets;
  const { userId } = req.query;
  if (userId === '') {
    return res.status(500).send({ message: 'UserId cannot be empty' });
  }
  try {
    const {
      name,
      screen_name,
      followers_count,
      profile_image_url_https,
    } = await client.get('users/show.json', {
      user_id: userId,
    });
    tweets = await client.get('statuses/user_timeline.json', {
      user_id: req.query.userId,
      count: 5,
    });
    response = {
      name,
      screen_name,
      followers_count,
      profile_image_url_https,
      tweets,
    };
  } catch (e) {
    return res.status(500).send({ message: 'User not found' });
  }
  return res.status(200).send({ response });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), {
    etag: false,
  });
});

app.listen(4000, function () {
  console.log('App is lstening on port 4000!');
});
