Project to demonstrate a small [REST-based](https://en.wikipedia.org/wiki/Representational_state_transfer) service to retrieve weather information in different cities using the following technologies:

* [Node.js](https://nodejs.org);
* [Docker](https://www.docker.com/) (including [Docker Compose](https://docs.docker.com/compose/));
* [Unit tests](./app/tests) (in the same context of REST-based service);
* [Integration tests](./integration) (in a separated container).

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

The weather endpoint uses data from [openweathermap.org]. Go to [openweathermap.org/api], subscribe (for free) and get an API Key to replace `<<<API_KEY_VALUE_HERE>>>` in the following command:

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

### Install

In `integration` directory:

```
npm install
```

### Set environment variable

When running locally, set `APP_HOST`:
```
export APP_HOST="localhost"
```

### Run

With the [service](#start) running, run the following command:

```
npm test
```

To monitor changes and restart automatically:

```
npm run test:watch
```

# Docker Compose

This may be the **simplest way** to run the project. After [setting the environment variables](#set-environment-variables), just run the following command:

```
docker-compose up
```

and the [service](./app) will be started and the [integration](./integration) tests will be executed.

# Docker (without compose)

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

# Routes

## `GET /cities?lat={latitude}&lng={longitude}`

* `HTTP 200 Ok` with body:
```
➜  ~ curl http://localhost:5000/cities\?lat\=49.48\&lng\=8.46
[{"id":2864869,"name":"Neuhofen","country":"DE","coord":{"lon":8.42472,"lat":49.42778}},...]
```

* `HTTP 400 Bad Request` if parameters are missing:
```
➜  ~ curl http://localhost:5000/cities\?lat\=\&lng\=
{"status":"error","message":"lat/lng required","code":"BadRequestError"}
```

## `GET /cities/{city_id}`

* `HTTP 200 Ok` with body:
```
➜  ~ curl http://localhost:5000/cities/2873891
{"id":2873891,"name":"Mannheim","country":"DE","coord":{"lon":8.46472,"lat":49.488331}}
```

* `HTTP 404 Not Found` if the `city_id` was not found:
```
➜  ~ curl http://localhost:5000/cities/99999999
{"status":"error","message":"not found","code":"NotFoundError"}
```

## `GET /cities/{city_id}/weather`

* `HTTP 200 Ok` with body:
```
➜  ~ curl http://localhost:5000/cities/2867310/weather
{"coord":{"lon":8.36,"lat":49.44},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":288.15,"pressure":1017,"humidity":87,"temp_min":285.93,"temp_max":290.37},"visibility":10000,"wind":{"speed":3.6,"deg":210},"clouds":{"all":0},"dt":1565567145,"sys":{"type":1,"id":1265,"message":0.0076,"country":"DE","sunrise":1565583171,"sunset":1565635839},"timezone":7200,"id":2867310,"name":"Mutterstadt","cod":200}
```

* `HTTP 404 Not Found` if the `city_id` was not found:
```
➜  ~ curl http://localhost:5000/cities/99999999/weather
{"status":"error","message":"not found","code":"NotFoundError"}
```

# ToDo

* Enable security protocol ([TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security));
* Cover with more unit tests (and measure [code coverage](https://en.wikipedia.org/wiki/Code_coverage));
* Add a tool for endpoint documentation/specification (e.g. [Swagger](https://swagger.io/));
* Load cities dynamically. The current code loads the cities through a [local json file](./app/resources/city.list.json) and uses `require` that runs synchronously;
* Add [semantic versioning](https://semver.org/);
* Node.js: handle multiple CPUs;
* Docker: use [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/).

# Main dependencies

* [restify](http://restify.com/):  web service framework for building RESTful web services;
* [winston](https://www.npmjs.com/package/winston): logging library;
* [joi](https://github.com/hapijs/joi): Object schema validation;
* [standard](https://www.npmjs.com/package/standard): JavaScript style guide, linter, and formatter;
* [dotenv](https://www.npmjs.com/package/dotenv): module that loads environment variables from a `.env` file into `process.env`;
* [cucumber](https://cucumber.io/): tool for running automated tests written in plain language. We use here for integration tests;
* [jest](https://jestjs.io): JavaScript testing framework. Used here for unit testing;
* [geolib](https://www.npmjs.com/package/geolib): Library to provide basic geospatial operations. Although the formula used to measure the distance between two geospatial coordinates is not complex (see Haversine formula: https://en.wikipedia.org/wiki/Haversine_formula), this robust library already abstract the calculations. "Why would we reinvent the wheel?".

# License

[ISC](./LICENSE.txt)
