const Sequelize = require("sequelize");
// const mysql = require("mysql")
const sequelize = new Sequelize(process.env.DATABASE_NAME, "root", "root", {
    host: "localhost",
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,     
      min: 0,     
      idle: 10000
    }
  });
const db = {};
  
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);

db.books = require("./books.model")(sequelize, Sequelize);
db.category = require("./category.model")(sequelize, Sequelize);
db.category.hasMany(db.books, {as: 'Books'});
db.books.belongsTo(db.category, {foreignKey: 'category', as: 'Category'});
module.exports = db;


