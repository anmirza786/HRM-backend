module.exports = (sequelize, Sequelize) => {
  
    const User = sequelize.define("user", {
      
      email: {
         type: Sequelize.STRING,
         unique: true,
      },
      password: {
         type: Sequelize.STRING
      },
      token: {
         type: Sequelize.STRING
      },
      isAdmin: {
         type: Sequelize.BOOLEAN
      },
      isStaff: {
         type: Sequelize.BOOLEAN
      }  });  
      return User;
  };