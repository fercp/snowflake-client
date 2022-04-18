const snowflake = require('snowflake-sdk');
const config = require('../config/env.config');

const connectionPool = snowflake.createPool(
    // connection options
    {
        account: config.account,
        username: config.user,
        password: config.password
    },
    // pool options
    {
        max: config.pool.max_connections, // specifies the maximum number of connections in the pool
        min: config.pool.min_connections   // specifies the minimum number of connections in the pool
    }
);

exports.query =
    (table, column_values) => {
        return new Promise((resolve, reject) => {
                connectionPool.use(async (clientConnection) => {
                    var sql = 'select v from ' + table + ' where  1=1\n' ;
                    var binds = [];

                    column_values.forEach((column_value) => {
                        sql += 'and ' + column_value.column + '= ? '
                        binds.push(column_value.value)
                    });

                    const statement = await clientConnection.execute({
                        sqlText: sql,
                        binds: binds,
                        complete: function (err, stmt, rows) {
                            err ? reject(err) : resolve(rows);
                        }
                    });
                });
            }
        );
    };
