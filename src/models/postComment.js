module.exports= (sequelize ,DataTypes)=>{
    const PostComment = sequelize.define('postComments', {
      // Model attributes are defined here
      
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      postId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    PostComment.sync({}).then(()=>{
        console.log("table postComments is created!!!")
    }).catch((error)=>console.log(error))
      return PostComment;
      // `sequelize.define` also returns the model
      console.log(PostComment === sequelize.models.PostComment); // true
      
}