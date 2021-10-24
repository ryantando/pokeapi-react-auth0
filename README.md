# React PokeAPI with Auth0

## Project setup

Use `yarn` to install the project dependencies:

```bash
yarn install
```

## Features
- Backend
- Auth with auth0
- Frontend Home get random pokemon
- Frontend Pokemon detail
- Frontend Profile
- Mobile responsive

## Configuration

### Demo
[Demo URL](https://d16y4al5cr2osd.cloudfront.net)
- Demo Backend uses: AWS EC2
- Demo Frontend uses: AWS S3 and Cloudfront

[Video Preview](https://www.loom.com/share/e6c9f5a6f1c345299d04f0799a1b3aa2)

### Create an API

For the ["call an API"](https://auth0.com/docs/quickstart/spa/react/02-calling-an-api) page to work, you will need to [create an API](https://auth0.com/docs/apis) using the [management dashboard](https://manage.auth0.com/#/apis). This will give you an API identifier that you can use in the `audience` configuration field below.

If you do not wish to use an API or observe the API call working, you should not specify the `audience` value in the next step. Otherwise, you will receive a "Service not found" error when trying to authenticate.


### Configure credentials

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.
Fill `src/auth_config.json` with the values with your own Auth0 application credentials, and optionally the base URLs of your application and API:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "audience": "{YOUR AUTH0 API_IDENTIFIER}",
  "appOrigin": "{OPTIONAL: THE BASE URL OF YOUR APPLICATION (default: http://localhost:3000)}",
  "apiOrigin": "{OPTIONAL: THE BASE URL OF YOUR API (default: http://localhost:3001)}"
}
```

**Note**: Do not specify a value for `audience` here if you do not wish to use the API part of the sample.

## Run the sample

### Compile and hot-reload for development

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
yarn dev
```

## Deployment

### Compiles and minifies for production

```bash
yarn build
```

### Run your tests

```bash
npm run test
```


## Attribution
- Pokeball gif from https://dribbble.com/shots/2832850-Pok-mon-Go
- [Auth0](https://auth0.com)
