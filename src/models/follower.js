module.exports= (sequelize ,DataTypes)=>{
    const Follower = sequelize.define('followers', {
      // Model attributes are defined here
      
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      followerId:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    });
    Follower.sync({}).then(()=>{
        console.log("table followers is created!!!")
    }).catch((error)=>console.log(error))
      return Follower;
      // `sequelize.define` also returns the model
      console.log(Follower === sequelize.models.Follower); // true
      
}