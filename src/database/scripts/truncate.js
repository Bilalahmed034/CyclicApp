// const { logger } = require('../../utils/logger');
const {  truncateDB:truncateDBQuery } = require('../queries');
const db = require('../../config/db.config')
const tables = ['users' ,'forGotPasswords' ,'travelerOffers' ,'senderOffers' ,'acceptedSenderOffers' ,'acceptedTravelerOffers','counterSenderOffers','counterTravelerOffers','cities','country_managers','zone_prices','zones','ratings' , 'payment_formulas','pricings','supports','chats'];

(() => {
    tables.map((index)=>{
        db.query('TRUNCATE TABLE '+index, (err, _) => {
            if (err) {
                console.error(err.message);
                return;
            }
            console.info('Table '+index +' truncated!');
        });
    })
})();