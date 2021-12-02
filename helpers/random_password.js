var generatedTempPassword = ""
const generateTempPassword= ()=>{
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var generatedTempPasswordLength = 8;
    
    for (var i = 0; i <= generatedTempPasswordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        generatedTempPassword += chars.substring(randomNumber, randomNumber +1);
       }
}
generateTempPassword();
module.exports = generatedTempPassword;
