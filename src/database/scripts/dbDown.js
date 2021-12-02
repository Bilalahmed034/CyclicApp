// const { logger } = require('../../utils/logger');
const { dropDB: dropDBQuery } = require('../queries');

(() => {
    require('../../config/db.config').query(dropDBQuery, (err, _) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.info('DB Dropped!');
        process.exit(0);
    });
})();