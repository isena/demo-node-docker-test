
`require` in node runs synchronously. Besides that, the data (cities) here will be chached, since it is static and it will not be changed during the server lifetime, this is not recommended due to performance degradation:
```
const cities = require('./city.list.json')
```

Although the formula is not complex (see Haversine formula: https://en.wikipedia.org/wiki/Haversine_formula), there are robust libraries, like the following, that already abstract the calculations. "Why would we reinvent the wheel?".
