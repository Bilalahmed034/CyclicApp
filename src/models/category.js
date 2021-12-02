module.exports= (sequelize ,DataTypes)=>{
    const Category = sequelize.define('categories', {
      // Model attributes are defined here

      name:{
        type:DataTypes.STRING,
        allowNull:false
      },
      image:{
        type:DataTypes.STRING,
        allowNull:false
      }
    });
    Category.sync({}).then(()=>{
        console.log("table categories is created!!!")
    }).catch((error)=>console.log(error))
      return Category;
      // `sequelize.define` also returns the model
      console.log(Category === sequelize.models.Category); // true
      
}