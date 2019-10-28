# pdq-full-stack

PDQ Full Stack homework assignment here: https://github.com/pdq/PDQ-Hiring-Public

## Backend

- Starting point created with [Express Application Generator](https://expressjs.com/en/starter/generator.html)
- Tests done with Jest
- Communication to frontend with socket.io
- Env variables
  - FRONTEND: allowed CORS origin. (Only localhost by default). Also used to redirect to front if you hit backend endpoint
  - FRONTENDPORT: Automatic redirect to frontend if you hit backend endpoint
  - PORT: port of backend endpoint

## Frontend

- Starting point created with [create-react-app](https://github.com/facebook/create-react-app)
- Communication to backend with socket.io-client
- Styled with [material-ui](https://material-ui.com/)
- Env variables
  - BACKEND: backend endpoint
  - BACKENDPORT: backend endpoint port
