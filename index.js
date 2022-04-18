const config = require('./common/config/env.config.js');
var snowflake = require('./common/services/snowflake.service');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());

app.post('/query', (req, res) => {
    var reqBody=req.body;

    snowflake.query(reqBody.table, reqBody.columnValues).then((result) =>
        res.json(result)).catch((err) => console.log(err));
});

app.listen(config.port);