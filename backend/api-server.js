const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const authConfig = require('../src/auth_config.json');
const { checkJwt, checkJwtResponse } = require('./controller/auth');
const { getPokemonDetail } = require('./controller/pokemon');

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain
  || !authConfig.audience
  || authConfig.audience === 'YOUR_API_IDENTIFIER'
) {
  console.log(
    'Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values',
  );

  process.exit();
}

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

app.get('/api/external', checkJwt, checkJwtResponse);
app.get('/api/pokemon/:id', checkJwt, getPokemonDetail);
app.get('/', (req, res) => res.send('Welcome'));

app.listen(port, () => console.log(`API Server listening on port ${port}`));
