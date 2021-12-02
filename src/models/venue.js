
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('venues', {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coverImage: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.TEXT,
      get: function () {
        const value = this.getDataValue('location');
        return value ? JSON.parse(value) : null;
        //return JSON.parse(this.getDataValue('location'));
      },
      set: function (value) {
        this.setDataValue('location', JSON.stringify(value));
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    totalRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    area: {
      type: DataTypes.STRING,
    },
    prefrences: {
      type: DataTypes.STRING,
      get: function () {
        const value = this.getDataValue('prefrences');
        return value ? JSON.parse(value) : null;
        // return JSON.parse(this.getDataValue('prefrences'));
      },
      set: function (value) {
        this.setDataValue('prefrences', JSON.stringify(value));
      },
    },
    businessHours: {
      type: DataTypes.TEXT,
      get: function () {
        const value = this.getDataValue('businessHours');
        return value ? JSON.parse(value) : null;
        // return JSON.parse(this.getDataValue('businessHours'));
      },
      set: function (value) {
        this.setDataValue('businessHours', JSON.stringify(value));
      },
    },
  }, {
    // Other model options go here
  });
  // Venue.sync({ })
  Venue.sync().then(() => {
    console.log("table venues is created!!!")
  }).catch((error) => console.log(error))
  return Venue;
  // `sequelize.define` also returns the model
  console.log(Venue === sequelize.models.Venue); // true
}