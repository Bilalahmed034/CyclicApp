const {
    hash: hashPassword,
    compare: comparePassword,
  } = require('../../utils/password');

//   const { logger } = require('../../utils/logger');

(() => {    
    const hashedPassword = hashPassword("12345678")
    require('../../config/db.config').query("insert into users (fullName ,email , password , role , createdAt , updatedAt) values('Super Admin','admin@gmail.com','"+hashedPassword+"','superAdmin', NOW(), NOW())" , (err, _) => {
         if (err) {
             console.error(err.message);
             return;
         }
         console.info('Admin seeder seed.');
         process.exit(0);
     });
 })();