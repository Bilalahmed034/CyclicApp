
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('notifications', {
      // Model attributes are defined here
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // allowNull defaults to true
      },
      sentBy: {
        type: DataTypes.INTEGER,
        allowNull: false
        // allowNull defaults to true
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      isRead:{
        type: DataTypes.INTEGER,
        defaultValue:0
      }
    }, {
      // Other model options go here
    });
    // Notification.sync({ })
    Notification.sync().then(() => {
      console.log("table Notification is created!!!")
    }).catch((error) => console.log(error))
    return Notification;
    // `sequelize.define` also returns the model
    console.log(Notification === sequelize.models.Notification); // true
  }