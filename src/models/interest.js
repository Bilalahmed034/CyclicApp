
module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define('interests', {
      // Model attributes are defined here
      interest: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
      }
    }, {
      // Other model options go here
    });
    // Interest.sync({ })
    Interest.sync().then(() => {
      console.log("table Intrests is created!!!")
    }).catch((error) => console.log(error))
    return Interest;
    // `sequelize.define` also returns the model
    console.log(Interest === sequelize.models.Interest); // true
  }