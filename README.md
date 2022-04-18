## SnowFlake rest api

Sample rest api for querying snowflake tables with given column names and values

### Configuration

Set snowflake connection options from <b>common/config/env.config.js</b>
```javascript
module.exports = {
    "account":"<account-locator>.<region>", //ex ve0XXXX.eu-central-1
    "user":"<username>",
    "password":"<password>",
    "pool":{
        "max_connections" : 10,
        "min_connections" : 0
    },
    "port":8080
};
```

### Installation

```shell
  npm install
```

### Usage

Start rest server

```shell
   npm start
```

#### Sample request

```shell
curl --location --request POST 'localhost:8080/query' \
--header 'Content-Type: application/json' \
--data-raw '{
    "table": "snowflake_sample_data.weather.daily_14_total",
    "columnValues": [
        {
            "column": "v:city.country",
            "value": "TR"
        },
         {
            "column": "t",
            "value": "2017-07-17T22:18:45Z"
        }
    ]
}'
```
