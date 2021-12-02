module.exports= (sequelize ,DataTypes)=>{
    const Review = sequelize.define('reviews', {
      // Model attributes are defined here
      
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      venueId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      rating:{
        type:DataTypes.FLOAT,
        allowNull:false
      },
      message:{
        type:DataTypes.TEXT,
        allowNull:false
      }
    });
    Review.sync({}).then(()=>{
        console.log("table reviews is created!!!")
    }).catch((error)=>console.log(error))
      return Review;
      // `sequelize.define` also returns the model
      console.log(Review === sequelize.models.Review); // true
      
}