// const { logger } = require('../../utils/logger');
const { createTableUSers: createTableUSersQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query('select * from ratings', (err, _) => {
        if (err) {
            console.error(err.message);
            process.exit(0);
            return;
        }
        console.info(JSON.stringify(_));
        process.exit(0);
    });
})();
