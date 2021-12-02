const mysql = require('mysql');


const connection = mysql.createConnection({

    host: "host",
    user: "user",
    password: "password",
});

connection.connect((err) => {
    if (err) console.error(err.message);
});

module.exports = connection;