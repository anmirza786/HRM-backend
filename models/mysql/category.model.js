module.exports = (sequelize, Sequelize) => {
  
    const Category = sequelize.define("category", {
      
      category_name: {
         type: Sequelize.STRING,
         unique: true,
      } });
    
      return Category;
  };