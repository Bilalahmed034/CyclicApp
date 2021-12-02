module.exports= (sequelize ,DataTypes)=>{
    const Support = sequelize.define('support', {
      // Model attributes are defined here
      
      fullName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false
      },
      message:{
        type:DataTypes.TEXT,
        allowNull:false
      },
      image:{
        type:DataTypes.STRING
      }
    });
    Support.sync({}).then(()=>{
        console.log("table support is created!!!")
    }).catch((error)=>console.log(error))
      return Support;
      // `sequelize.define` also returns the model
      console.log(Support === sequelize.models.Support); // true
      
}