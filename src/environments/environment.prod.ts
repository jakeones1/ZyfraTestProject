export const environment = {
  production: true,
  REST_URL: 'http://localhost:3000/',
  REST: undefined
};

environment.REST = {
  LANGUAGES: environment.REST_URL + 'languages/'
};