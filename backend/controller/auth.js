const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const authConfig = require('../../src/auth_config.json');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
});

const checkJwtResponse = (req, res) => {
  res.send({
    msg: 'Your access token was successfully validated!',
  });
};

module.exports = {
  checkJwt,
  checkJwtResponse,
};
