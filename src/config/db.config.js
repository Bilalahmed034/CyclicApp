const mysql = require('mysql');
const config = require('../../config.json');
var database ;
if (config.environment == 'development') {
   database = config.databaseDevelopment
}else{
   database = config.databaseProduction
}
const connection = mysql.createPool({
    host: database.host,
    user: database.user,
    password: database.password,
    port: database.port,
    database: database.database,
});

connection.getConnection((err) => {
    if (err) console.error(err.message);
    else console.info('Database connected')
});

module.exports = connection;