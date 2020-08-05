import * as Twitter from 'twitter';
import { config } from '../config/secrets-config';
import { configure, getLogger } from 'log4js';

// Configuring logger
configure({
  appenders: {
    searchRequests: { type: 'file', filename: 'requests-logger.log' },
    selectedProfiles: { type: 'file', filename: 'requests-logger.log' },
  },
  categories: {
    default: {
      appenders: ['searchRequests'],
      level: 'info',
    },
  },
});

// Twitter authentication
const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret,
});

module.exports = function (app) {
  app.get('/api/users/search', searchUsers);
  app.get('/api/user/profile', userProfile);
};

// Search users on twitter based on user input
async function searchUsers(req, res) {
  // To create logs for all search requests
  const logger = getLogger('searchRequests');
  const { search, page } = req.query;
  let response;

  if (search === '') {
    return res.status(500).send({ message: 'Search term cannot be empty' });
  }

  try {
    logger.info(`Searched term is ${search}`);
    response = await client.get('users/search.json', {
      q: search,
      count: 10,
      page,
    });
  } catch (e) {
    return res.status(500).send({ message: 'Invalid search.' });
  }
  return res.status(200).send({ response });
}

// Fetch selected user's profile from twitter
async function userProfile(req, res) {
  // To create logs for selected user profile
  const logger = getLogger('selectedProfiles');

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

    logger.info(
      `Selected user profile belongs to ${name} with userId: ${userId}`
    );

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
}
