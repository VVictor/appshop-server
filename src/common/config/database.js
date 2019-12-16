const mysql = require('think-model-mysql');

module.exports = {
    handle: mysql,
    database: 'hiolabsDB',
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: 'as.bluelinkr.com',
    port: '3306',
    user: 'root',
    password: 'Bluelinkr2019!',
    dateStrings: true
};
