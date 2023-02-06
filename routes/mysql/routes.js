module.exports = app => {  
    const articles = require("../../controllers/mysql/authControllers");
    
    var router = require("express").Router();  // Create a new Article
    router.post("/", articles.articlecreate);  // Retrieve a single Article with id
    router.get("/:id", articles.articlefindOne);  // Update a Article with id
    router.put("/:id", articles.articleupdate);  // Delete a Article with id
    router.delete("/:id", articles.articledelete);  
    app.use('/api/articles', router);
};