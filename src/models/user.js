module.exports= (sequelize ,DataTypes)=>{
    const User = sequelize.define('users', {
      // Model attributes are defined here
      fullName: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING
        // allowNull defaultValues to true
      },
      email:{
        type: DataTypes.STRING,
      },
      password:{
        type: DataTypes.STRING,
        
      },
      phoneNo:{
        type: DataTypes.STRING
      },
      address:{
        type: DataTypes.STRING
      },
      status:{
        type: DataTypes.INTEGER,
        defaultValue:1
      },
      dateOfBirth:{
        type: DataTypes.DATE,
        
      },
      country:{
        type: DataTypes.STRING
      },
      gender:{
        type: DataTypes.STRING,
        defaultValue:'other'
      },
      image:{
        type: DataTypes.STRING
      },
      bio:{
        type: DataTypes.TEXT
      },
      role:{
        type: DataTypes.STRING,
        defaultValue:'user'
      },
      lastLoginDate:{
        type: DataTypes.DATE,
        
      },
      emailVerified:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      phoneVerified:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      deviceToken:{
        type:DataTypes.STRING
      }
    }, {
      // Other model options go here
    });
    // User.sync({});
    User.sync({}).then(()=>{
        console.log("table users is created!!!")
    }).catch((error)=>console.log(error))
    return User;
    // `sequelize.define` also returns the model
    console.log(User === sequelize.models.User); // true
    }