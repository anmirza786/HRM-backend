
module.exports = (sequelize, Sequelize) => {
    const Books = sequelize.define("books", {
      
      bookname: {
         type: Sequelize.STRING,
         unique: true,
      },
      author: {
         type: Sequelize.STRING
      },
      category: {
         type: Sequelize.INTEGER,
         references: {
            model: 'categories',
            key: 'id'
         }
      },
      published: {
         type: Sequelize.DATE
      }  });
      return Books;
  };

