
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('checkins', {
    // Model attributes are defined here
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
      // allowNull defaults to true
    },
    checkInTime: {
      type: DataTypes.DATE
    },
    checkOutTime: {
      type: DataTypes.DATE
    },
    isCheckedOut: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    // Other model options go here
  });
  // Checkin.sync({ })
  Checkin.sync().then(() => {
    console.log("table checkins is created!!!")
  }).catch((error) => console.log(error))
  return Checkin;
  // `sequelize.define` also returns the model
  console.log(Checkin === sequelize.models.Checkin); // true
}