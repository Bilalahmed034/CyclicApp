
module.exports = (sequelize, DataTypes) => {
  const ForGotPassword = sequelize.define('forGotPassword', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
  // ForGotPassword.sync({ })
  ForGotPassword.sync().then(() => {
    console.log("table Forgot password is created!!!")
  }).catch((error) => console.log(error))
  return ForGotPassword;
  // `sequelize.define` also returns the model
  console.log(ForGotPassword === sequelize.models.ForGotPassword); // true
}