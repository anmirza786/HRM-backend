const asyncHandler = require('express-async-handler')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Category = require('../models/category')
const Books = require('../models/books')

const addcategory = async(req,res)=>{
        // json body req data destructuring
        const {
            category_name
        } = req.body;
        console.log(req.body);
        try{
            // check if the category already exists
            const oldcategory = await Category.findOne({ category_name });
            if (oldcategory) {
                return res.status(409).send("Category Already Exist. Please add a unique category name");
            }
            // create a new category 
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
    Category.find(function (err, cats) {
        if (err) {
          console.log(err);
        } else {
          res.json(cats);
        }
      }).catch((err) => console.log(err));
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
    const {sorted_by} = req.query
    if (sorted_by){
        console.log(sorted_by)
    }
    const books = Books.find(function (err, book) {
        if (err) {
            res.json(err);
        } else {
            res.json(book);
        }
      })
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