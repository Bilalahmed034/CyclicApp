
module.exports = (sequelize, DataTypes) => {
    const Prefrence = sequelize.define('prefrences', {
      // Model attributes are defined here
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      interestId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // allowNull defaults to true
      }
    }, {
      // Other model options go here
    });
    // Prefrence.sync({ })
    Prefrence.sync().then(() => {
      console.log("table prefrences is created!!!")
    }).catch((error) => console.log(error))
    return Prefrence;
    // `sequelize.define` also returns the model
    console.log(Prefrence === sequelize.models.Prefrence); // true
  }