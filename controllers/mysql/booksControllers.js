const db = require("../../models/mysql/index")
// const Books = require('../../models/books')
const Books = db.books
const Category = db.category;
const Op = db.Sequelize.Op;

const addcategory = async(req,res)=>{
        // json body req data destructuring
        const {
            category_name
        } = req.body;
        console.log(req.body);
        try{
            const oldcategory = await Category.findOne({ where:{ category_name } });
            if (oldcategory) {
                return res.status(409).send("Category Already Exist. Please add a unique category name");
            }
            const category = await Category.create({
                category_name,
              });
        
            // return the category in response that is created
            res.status(201).json(category);
        }
        catch(err){
            res.status(400).send(err);
        }
}
const getallcategories = async(req,res)=>{
    const cat = await Category.findAll()
    res.json(cat)
}
const add_book = async(req,res)=>{
    // json body req data destructuring
    
    const {
        bookname,
        author,
        category,
        published
    } = req.body;
    console.log(req.body,req.headers);

    try{
        const book = await Books.create({
            bookname,
            author,
            category,
            published
          });
    
        res.status(201).json(book);
    }
    catch(err){
        res.status(400).send(err);
    }
}
const getallbooks = async(req,res)=>{
    // Books.belongsToMany(Category,{foreignKey: {name:'category'}});
    // Category.belongsToMany(Books, {foreignKey: {name:'category'}});
    const books = await Books.findAll({
        include: [{
          model: Category, as : "Category",
          attributes: ['id','category_name']
        }],
        attributes: ['id','bookname','author','published']
      })
    res.json(books)
}
const deletebook = async (req, res) => {
    console.log(req.params)
      try {
        const id = req.params.id;
  
        const result = await Books.findByIdAndDelete(id);
  
        res.send(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
module.exports = { addcategory,getallcategories,add_book,getallbooks,deletebook }

