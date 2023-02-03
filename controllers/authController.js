const asyncHandler = require('express-async-handler')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require('../models/user')

const register = async(req,res)=>{
    if (req.body){
        console.log("User has some data.")
        // json body req data destructuring
        const {
            isAdmin,
            isSraff,
            email,
            password
        } = req.body;
        console.log(req.body);
        try{
            // check if the user already exists
            const oldUser = await User.findOne({ email });
            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }
            encryptedPassword = await bcrypt.hash(password, 10);
            var dt = new Date();
            // create a new user 
            const user = await User.create({
                isAdmin,
                isSraff,
                // convert the email in lower case so if the user enter any of the alphabet in upper it could be converted in the lower case
                email: email.toLowerCase(), 
                password: encryptedPassword
              });
            // Creation of the access / auth token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );
            // save user token in the db
            user.token = token;
        
            // return the user in response that is created
            res.status(201).json(user);
        }
        catch(err){
            console.log(err)
            // res.status(400).send(err);
        }
    }
    else{
        res.status(400).send("Please Enter the Data 🙏");
    }
}
const login = async(req,res)=>{
    try {
        // Get user input
        const { email, password } = req.body;
        console.log(req.body,"login")
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err)
        // res.status(400).send(err);
      }
}
const checkAuthenticated = async(req,res)=>{
    User.findById(req.user.user_id)
    .then((u) => {
      if (!u) {
        return res.status(404).end();
      }
      return res.status(200).json(u);
    })
    .catch((err) => next(err));
}
module.exports = { register,login,checkAuthenticated }