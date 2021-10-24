import configJson from './auth_config.json';

// eslint-disable-next-line import/prefer-default-export
export function getConfig() {
  const audience = configJson.audience && configJson.audience !== 'YOUR_API_IDENTIFIER'
    ? configJson.audience
    : null;

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
  };
}
