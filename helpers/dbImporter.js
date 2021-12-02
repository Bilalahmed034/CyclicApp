const sqEI = require('sequelize-import-export');
const db = require('../src/models/index');
const path = require('path');
// create a new object and pass the sequelize model(s) in array you want to import from the file
let dbex = new sqEI([db.user]);

let options = { // optional parameter
    overwrite: true // if set to true destroyes / truncates the table and then inserts the data
}

// call the Import function with the path parameter to import and insert file in database.
dbex.import(path.resolve()+"/backups/databaseexport.sequelize", options).then((path) => {
    console.log(`Imported Data Successfully.`);
}).catch(err => {
    console.log("got ERROR", err);
})