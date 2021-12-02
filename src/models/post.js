module.exports= (sequelize ,DataTypes)=>{
    const Post = sequelize.define('posts', {
      // Model attributes are defined here
      
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      venueId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      description: {
        type: DataTypes.STRING,
      },
    });
    Post.sync({}).then(()=>{
        console.log("table posts is created!!!")
    }).catch((error)=>console.log(error))
      return Post;
      // `sequelize.define` also returns the model
      console.log(Post === sequelize.models.Post); // true
      
}