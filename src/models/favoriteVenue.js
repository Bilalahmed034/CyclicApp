
module.exports = (sequelize, DataTypes) => {
    const FavoriteVenue = sequelize.define('favoriteVenues', {
      // Model attributes are defined here
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // allowNull defaults to true
      },
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // allowNull defaults to true
      }
    }, {
      // Other model options go here
    });
    // FavoriteVenue.sync({ })
    FavoriteVenue.sync().then(() => {
      console.log("table Favorite Venues is created!!!")
    }).catch((error) => console.log(error))
    return FavoriteVenue;
    // `sequelize.define` also returns the model
    console.log(FavoriteVenue === sequelize.models.FavoriteVenue); // true
  }