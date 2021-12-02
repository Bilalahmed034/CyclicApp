module.exports = (sequelize, DataTypes) => {
    const GalleryImageType = sequelize.define('galleryImageTypes', {
      // Model attributes are defined here
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
      }
    }, {
      // Other model options go here
    });
    // GalleryImageType.sync({ })
    GalleryImageType.sync().then(() => {
      console.log("table galleryImageTypes is created!!!")
    }).catch((error) => console.log(error))
    return GalleryImageType;
    // `sequelize.define` also returns the model
    console.log(GalleryImageType === sequelize.models.GalleryImageType); // true
  }