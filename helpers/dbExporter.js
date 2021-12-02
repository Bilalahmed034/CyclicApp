const sqEI = require('sequelize-import-export');
const db = require('../src/models/index');
const path = require('path');
// create a new object and pass the sequelize model(s) in array you want to export or you can also pass an object containing the models
let dbex = new sqEI(db); // or let dbex = new sqEI([db.Product, db.Stock]);

// call the export function with the path parameter to place file.
dbex.export(path.resolve()+"/backups/databaseexport.sequelize").then((path) => {
    console.log(`exported successfully to "${path}!"`);
}).catch(err => {
    console.log("got ERROR", err);
})