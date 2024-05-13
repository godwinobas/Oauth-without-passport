require('dotenv').config();
const express = require('express');
const port = 4000;
const app = express();
const querystring = require('querystring');

const redirectURI = 'auth/google';
const oauthredirectURI = process.env.CALLBACK_URL;

function getGoogleAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirectURI: oauthredirectURI,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

// Getting login URL
app.get('/auth/google/url', (req, res) => {
  return res.send(getGoogleAuthURL());
});

// gettting user from google with the

function main() {
  app.listen(port, () => {
    console.log(`App listening http://localhost:${port}`);
  });
}

main();
