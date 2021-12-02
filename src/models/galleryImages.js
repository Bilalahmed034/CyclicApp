
module.exports = (sequelize, DataTypes) => {
    const GalleryImage = sequelize.define('galleryImages', {
      // Model attributes are defined here
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      galleryImageTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
      }
    }, {
      // Other model options go here
    });
    // GalleryImage.sync({ })
    GalleryImage.sync().then(() => {
      console.log("table locations is created!!!")
    }).catch((error) => console.log(error))
    return GalleryImage;
    // `sequelize.define` also returns the model
    console.log(GalleryImage === sequelize.models.GalleryImage); // true
  }