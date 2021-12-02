
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('locations', {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cordinates: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('cordinates'));
      },
      set: function (value) {
        this.setDataValue('cordinates', JSON.stringify(value));
      },
    }
  }, {
    // Other model options go here
  });
  // Location.sync({ })
  Location.sync().then(() => {
    console.log("table locations is created!!!")
  }).catch((error) => console.log(error))
  return Location;
  // `sequelize.define` also returns the model
  console.log(Location === sequelize.models.Location); // true
}