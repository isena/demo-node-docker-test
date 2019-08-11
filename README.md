Project to demonstrate a small [REST-based](https://en.wikipedia.org/wiki/Representational_state_transfer) service to retrieve weather information in different cities using the following technologies:

* [Node.js](https://nodejs.org);
* [Docker](https://www.docker.com/) (including [Docker Compose](https://docs.docker.com/compose/));
* [Unit tests](./app/tests) (in the same context of REST-based service);
* [Integration tests](./integration) (in a separate container).

Main project structure:
```
.
├── app
│   ├── Dockerfile
│   ├── configs
│   ├── controllers
│   ├── lib
│   ├── resources
│   ├── routes
│   ├── services
│   ├── tests
│   │   └── unit
│   └── validations
├── docker-compose.yml
└── integration
    ├── Dockerfile
    └── features
```

# Install

```
git clone https://github.com/isena/demo-node-docker-test.git
```

In `app` directory:
```
npm install
```

## Set environment variables

### .env

```
cp .env.example .env
```

### API Key

The weather endpoint uses data from openweathermap.org. Go to openweathermap.org/api, subscribe (for free) and get an API Key to replace `<<<API_KEY_VALUE_HERE>>>` in the following command:

```
export APP_WEATHER_API_KEY="<<<API_KEY_VALUE_HERE>>>"
```

## Start
```
npm start
```

To monitor changes and restart automatically:

```
npm run start:watch
```
And you are ready! Visit some city to check, e.g., http://localhost:5000/cities/2873891

# Test

## Unit

In `app` directory:

```
npm test
```

To monitor changes and restart automatically:

```
npm run test:watch
```

## Integration

When running locally, set `APP_HOST`:
```
export APP_HOST="localhost"
```

In `integration` directory:

```
npm test
```

To monitor changes and restart automatically:

```
npm run test:watch
```

# Docker Compose

You can also use `docker-compose`:

```
docker-compose up
```

# Docker

In `app` directory:

* Build:

```
docker build -t demo-weather:0.0.1 .
```

* Run

```
export APP_WEATHER_API_KEY="<<<API_KEY_VALUE_HERE>>>"
export APP_HOST="demo-weather-api"

docker run \
  --env APP_WEATHER_API_KEY=$APP_WEATHER_API_KEY \
  -p 5000:5000 \
  --name $APP_HOST \
  -ti --rm  demo-weather:0.0.1
```

## Integration tests

In `integration` directory:

* Build:

```
docker build -t demo-weather-integration-tests:0.0.1 .
```

* Run

```
export APP_HOST="demo-weather-api"

docker run \
  --env APP_HOST=$APP_HOST \
  --name integration \
  --link $APP_HOST:integration \
  -ti  --rm  demo-weather-integration-tests:0.0.1
```

# ToDo

* Enable Security Protocol (TLS);
* Cover with more unit tests (and measure code coverage);
* Add a tool for endpoint documentation/specification (e.g. Swagger);
* Load cities dynamically. The current code loads the cities through a local json file and uses `require` that runs synchronously.

# Main dependencies

* [restify](http://restify.com/):  web service framework for building RESTful web services;
* [winston](https://www.npmjs.com/package/winston): logging library;
* [joi](https://github.com/hapijs/joi): Object schema validation;
* [dotenv](https://www.npmjs.com/package/dotenv): module that loads environment variables from a `.env` file into `process.env`;
* [cucumber](https://cucumber.io/): tool for running automated tests written in plain language. We use here for integration tests;
* [jest](https://jestjs.io): JavaScript testing framework. Used here for unit testing;
* [geolib](https://www.npmjs.com/package/geolib): Library to provide basic geospatial operations. Although the formula used to measure the distance between two geospatial coordinates is not complex (see Haversine formula: https://en.wikipedia.org/wiki/Haversine_formula), this robust library already abstract the calculations. "Why would we reinvent the wheel?".

# License

ISC
