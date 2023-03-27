const dotenv = require("dotenv");
const app = require('./app');
const Twitter = require("twitter-lite");

/**
 * Load the environment variables from the .env file
 */
dotenv.config();
// Create an instance of the API client using the consumer keys for your app
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
});

// Use the previous client to fetch the bearer token
// This method gives you an application-only token specifically for read-only access to public information.
client.getBearerToken().then(bearer => {
// Create a new twitter client with this token.
// We assign this client to a global variable so we can access it in the api module
  globalThis.TwitterClient = new Twitter({
    bearer_token: bearer.access_token,
  });
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
}).catch(err => {
  console.error('TwitterClient Error', err);
});

