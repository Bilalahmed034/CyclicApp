const { logger } = require('../../utils/logger');
const { truncateDB: truncateDBQuery } = require('../queries');
const db = require('../../config/db.config');
// const tables = ['country_managers', 'payment_formulas','pricings','supports'];
const tables = ['employees'];
const sendMessage = require('../../../helpers/send_message');

(async () => {
    const accountSid = "AC4b4e52b107dce614ce3397cdb344e1f3"
    const authToken = "9df8f82a7588fd4986827b56d2bcbdb0"
    const client = require('twilio')(accountSid, authToken);

    // client.messages
    //   .create({
    //      contentSid: 'HX421aae9d933d8bdf37fb6cd71264cdaa',
    //      from: 'MG4f49fc6e83965f08aa5ca59fe9197193',
    //      contentVariables: JSON.stringify({
    //        1: '65465'
    //      }),
    //      to: 'whatsapp:+923004526367'
    //    })
    //   .then(message => console.log(message.sid));


    // client.verify.v2.services
    // .create({friendlyName: 'Viahop Verification'})
    // .then(service => console.log(service.sid))
    // .catch((error)=>console.log(error))
    // client.verify.v2.services('MG4f49fc6e83965f08aa5ca59fe9197193')
    //                 .verifications
    //                 .create({to: '+923146799604', channel: 'whatsapp'})
    //                 .then(verification => console.log(verification.accountSid))
    //                 .catch((error)=>console.log(error))
    // client.messages
    //     .create({
    //         body: 'Verify your phone number with your one-time-passport 1234 and let the Viahop journey begin!',
    //         from: 'whatsapp:+15617944732',
    //         to: 'whatsapp:+923116325116'
    //     })
    //     .then(message => console.log(message.sid))
    //     .done();
    // await client.messages('SMc04fc43e3acd34fc25979f01806f9906').remove();
    // var otp = 123;
    // var phone_no = "+923146799604";
    // var message = `hello test message`;
    // await sendMessage(message, phone_no, otp)
    // tables.map((index)=>{
    //     db.query('DROP TABLE '+index, (err, _) => {
    //         if (err) {
    //             console.error(err.message);
    //             return;
    //         }
    //         console.info('Table '+index +' dropped!');

    //     });
    // })
    db.query('Select * from ratings', (err, _) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                console.info(JSON.stringify(_));

            });
})();

// const crypto = require("crypto");

// const privateKey = crypto.randomBytes(32).toString("hex");
// console.log(privateKey);