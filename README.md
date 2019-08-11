
`require` in node runs synchronously. Besides that, the data (cities) here will be chached, since it is static and it will not be changed during the server lifetime, this is not recommended due to performance degradation:
```
const cities = require('./city.list.json')
```

Although the formula is not complex (see Haversine formula: https://en.wikipedia.org/wiki/Haversine_formula), there are robust libraries, like the following, that already abstract the calculations. "Why would we reinvent the wheel?".


## Docker 

### Build

```
docker build -t demo-weather:0.0.1 .
```

### Run
```
docker run --env APP_WEATHER_API_KEY=<<<API_KEY_VALUE_HERE>>> -ti  -p 5000:5000 --rm  demo-weather:0.0.1
```
