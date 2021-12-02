// const { logger } = require('../../utils/logger');
const { createDB: createDBQuery } = require('../queries');

(() => {
    require('../../config/db.config.init').query(createDBQuery, (err, _) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.info('DB created!');
        process.exit(0);
    });
})();
