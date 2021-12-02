module.exports= (sequelize ,DataTypes)=>{
    const PostLike = sequelize.define('postLikes', {
      // Model attributes are defined here
      
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      postId:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    });
    PostLike.sync({}).then(()=>{
        console.log("table postLikes is created!!!")
    }).catch((error)=>console.log(error))
      return PostLike;
      // `sequelize.define` also returns the model
      console.log(PostLike === sequelize.models.PostLike); // true
      
}