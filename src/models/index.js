const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config.json');
var database ;
if (config.environment == 'development') {
   database = config.databaseDevelopment
}else{
   database = config.databaseProduction
}
const sequelize = new Sequelize(database.database, database.user, database.password, {
  host: database.host,
  port: database.port,
  sslmode: "REQUIRED",
  dialect: 'mysql',  /* one of| 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  dialectOptions: {
    connectTimeout: 70000,
  },
  pool: {
    max: 30,
    min: 0,
    acquire: 60000,
    idle: 5000
  }
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./user')(sequelize, DataTypes);
db.forGotPassword = require('./forgotPassword')(sequelize, DataTypes);
db.support = require('./support')(sequelize, DataTypes);
db.interest = require('./interest')(sequelize, DataTypes);
db.prefrence = require('./prefrence')(sequelize, DataTypes);
db.location = require('./location')(sequelize, DataTypes);
db.venue = require('./venue')(sequelize, DataTypes);
db.reveiw = require('./review')(sequelize, DataTypes);
db.galleryImages = require('./galleryImages')(sequelize, DataTypes);
db.favoriteVenue = require('./favoriteVenue')(sequelize, DataTypes);
db.category = require('./category')(sequelize, DataTypes);
db.galleryImageType = require('./galleryImageType')(sequelize, DataTypes);
db.follower = require('./follower')(sequelize, DataTypes);
db.post = require('./post')(sequelize, DataTypes);
db.postComment = require('./postComment')(sequelize, DataTypes);
db.postLike = require('./postLike')(sequelize, DataTypes);
db.checkin = require('./checkin')(sequelize, DataTypes);
db.notification = require('./notification')(sequelize, DataTypes);


// !Relations
db.prefrence.hasOne(db.interest, { foreignKey: 'id', sourceKey: 'interestId' })
db.user.hasMany(db.prefrence, { foreignKey: 'userId', sourceKey: 'id' })
db.user.hasOne(db.location , {foreignKey :'userId' , sourceKey:'id'});
db.venue.hasOne(db.user, { foreignKey: 'id', sourceKey: 'userId',})
db.venue.hasMany(db.reveiw, { foreignKey: 'venueId', sourceKey: 'id' })
db.reveiw.hasOne(db.user, { foreignKey: 'id', sourceKey: 'userId' })
db.venue.hasMany(db.galleryImages, { foreignKey: 'venueId', sourceKey: 'id' })
db.venue.hasMany(db.galleryImageType, { foreignKey: 'venueId', sourceKey: 'id' })
db.venue.hasMany(db.checkin, { foreignKey: 'venueId', sourceKey: 'id' })
db.galleryImageType.hasMany(db.galleryImages, { foreignKey: 'galleryImageTypeId', sourceKey: 'id' })
db.favoriteVenue.hasOne(db.venue, { foreignKey: 'id', sourceKey: 'venueId' })
db.venue.hasOne(db.category, { foreignKey: 'id', sourceKey: 'categoryId' })
db.user.hasMany(db.follower, {as: 'followers', foreignKey: 'userId', sourceKey: 'id' })
db.follower.hasOne(db.user, { as: 'followerData',foreignKey: 'id', sourceKey: 'followerId' })
db.user.hasMany(db.follower, { as: 'followings',foreignKey: 'followerId', sourceKey: 'id' })
db.follower.hasOne(db.user, { as: 'followingData',foreignKey: 'id', sourceKey: 'userId' })
db.user.hasMany(db.venue, { as: 'myVenues',foreignKey: 'userId', sourceKey: 'id' })
db.user.hasMany(db.favoriteVenue, { as: 'myFavoriteVenues',foreignKey: 'userId', sourceKey: 'id' })
db.post.hasOne(db.user, { foreignKey: 'id', sourceKey: 'userId' })
db.post.hasOne(db.venue, { foreignKey: 'id', sourceKey: 'venueId' })
db.post.hasMany(db.postComment, { foreignKey: 'postId', sourceKey: 'id' })
db.post.hasMany(db.postLike, { foreignKey: 'postId', sourceKey: 'id' })
db.postLike.hasOne(db.user, { foreignKey: 'id', sourceKey: 'userId' })
db.postComment.hasOne(db.user, { foreignKey: 'id', sourceKey: 'userId' })
db.user.hasMany(db.post, { foreignKey: 'userId', sourceKey: 'id' })
db.checkin.hasOne(db.user, { foreignKey: 'id', sourceKey: 'userId' })
db.checkin.hasOne(db.venue, { foreignKey: 'id', sourceKey: 'venueId' })
db.notification.hasOne(db.user, { foreignKey: 'id', sourceKey: 'sentBy' , as: 'sender' })


module.exports = db;