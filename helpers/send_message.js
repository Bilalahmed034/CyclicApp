// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info and set the environment variables.
// See http://twil.io/secure
module.exports = sendMessage;
async function sendMessage(message ,phone_no , otp) {
    console.log("in send message to send otp "+otp+" on "+phone_no)
  const accountSid = "AC4b4e52b107dce614ce3397cdb344e1f3"
  const authToken ="9df8f82a7588fd4986827b56d2bcbdb0"
  const client = require('twilio')(accountSid, authToken);

  client.messages
      .create({
         contentSid: 'HX421aae9d933d8bdf37fb6cd71264cdaa',
         from: 'MG4f49fc6e83965f08aa5ca59fe9197193',
         contentVariables: JSON.stringify({
           1: otp.toString()
         }),
         to: 'whatsapp:'+phone_no
       })
      .then(message => console.log(message.sid))
      .catch(error=>console.error(error));

  // client.messages
  //   .create({ body: message, from: 'Viahop', to:  phone_no})
  //   .then((message) => console.log(message.sid+"========tiwilio sid"))
  //   .catch((message)=>console.log(message))
}
