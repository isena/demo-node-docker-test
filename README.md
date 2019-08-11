
Note about how to get the API_KEY

`require` in node runs synchronously. Besides that, the data (cities) here will be chached, since it is static and it will not be changed during the server lifetime, this is not recommended due to performance degradation:
```
const cities = require('./city.list.json')
```

Although the formula is not complex (see Haversine formula: https://en.wikipedia.org/wiki/Haversine_formula), there are robust libraries, like the following, that already abstract the calculations. "Why would we reinvent the wheel?".


## Docker Compose

```
export APP_WEATHER_API_KEY="<<<API_KEY_VALUE_HERE>>>"
```

```
docker-compose up
```


## Docker

### App

```
cd app
```

#### Build

```
docker build -t demo-weather:0.0.1 .
```

#### Run

```
export APP_WEATHER_API_KEY="<<<API_KEY_VALUE_HERE>>>"
export APP_HOST="demo-weather-api"

docker run \
  --env APP_WEATHER_API_KEY=$APP_WEATHER_API_KEY \
  -p 5000:5000 \
  --name $APP_HOST \
  -ti --rm  demo-weather:0.0.1
```

### Integration tests

```
cd integration
```

#### Build

```
docker build -t demo-weather-integration-tests:0.0.1 .
```

#### Run

```
export APP_HOST="demo-weather-api"

docker run \
  --env APP_HOST=$APP_HOST \
  --env APP_PORT=$APP_PORT \
  --name integration \
  --link $APP_HOST:integration \
  -ti  --rm  demo-weather-integration-tests:0.0.1
```

## Tests

`cd app`  or `cd integration` and then:

```
npm test
```
or 

```
npm run test:watch
```

to monitor changes and restart automatically.


```
export APP_WEATHER_API_KEY="<<<API_KEY_VALUE_HERE>>>"
docker-compose up
```
