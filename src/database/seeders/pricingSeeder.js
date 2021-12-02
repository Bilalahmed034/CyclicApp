// const { logger } = require('../../utils/logger');

(() => {    
    require('../../config/db.config').query("insert into pricings (first_mile_pickup,last_mile_delivery,insurance,service_cost , createdAt , updatedAt) values(10,10,10,10, NOW(), NOW())" , (err, _) => {
         if (err) {
             console.error(err.message);
             return;
         }
         console.info('Pricing seeder seed.');
         process.exit(0);
     });
 })();