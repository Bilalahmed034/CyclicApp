// const { logger } = require('../../utils/logger');
const {  truncateDB:truncateDBQuery } = require('../queries');
const db = require('../../config/db.config')
// const tables = ['users'  ,'super_admins' ,'tab_users' ,'admins' ,'subcategories' ,'categories','services','allowed_categories' , 'allowed_resturants'];
// const tables = ['orders','order_details'];
const verified = `
UPDATE users SET ? WHERE email = ?
`;

const verification = [{
    is_email_verified:1,
      is_phone_verified:1,
      is_id_verified:1

},'naumanasif1190@gmail.com'];
(() => {
    
        db.query(verified,verification, (err, _) => {
            if (err) {
                console.error(err.message);
                return;
            }
            console.info('Verified');
            
        });
   
})();