const express = require("express");
const router = express.Router();
// Since we want this route to create a new User in the database, we’ll first need to import the User model into this file.
// Add the following at the top of controllers/auth.ejs
const User = require("../models/user.js");
const bcrypt = require('bcrypt');


// /auth/sign-up (/auth is connected in server.js)
router.get('/sign-up', (req, res) => { // router is like app, but just return routes
    res.render('auth/sign-up.ejs');
});



router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });
  





  router.post("/sign-in", async (req, res) => {
    // First, get the user from the database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }
  
    // There is a user! Time to test their password with bcrypt
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }
  
    // There is a user AND they had the correct password. Time to make a session!
    // Avoid storing the password, even in hashed format, in the session
    // If there is other data you want to save to `req.session.user`, do so here!
    req.session.user = {
      username: userInDatabase.username,
    };
  
    res.redirect("/");
  });
  












// created form action='/auth/sign-up, now need to create function handling request
// Now, we need to create the controller function handling this request. Let’s start with a simple res.send response so we can test as we go. Note the use of async, as this function will eventually require a database call.
router.post('/sign-up', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        // To make sure somebody hasn’t already taken the username being submitted, we need to check the database for any existing user with that username.
      return res.send("Username already taken.");
    };
    //  simple comparison of values already submitted through the form
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
      };
    //   Next, add the following lines to the route handler function, beneath our previously written validations:
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    
    // validation logic
    const user = await User.create(req.body);
    req.session.user = {
      username: user.username,
    };
    
    req.session.save(() => {
      res.redirect("/");
    });
    
    console.log(user);
    // if(!user) {
    //     return res.send('Username already exists');
    // }
    res.send(`Thanks for signing up ${user.username}, your form has been accepted.`);
});
// try if catch statement here




router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


  
  
module.exports = router;

// Create controllers
// Since we’re building an authentication app, we should anticipate the need for multiple models in the future. After all, users will want to create and manage resources, not just sign in and sign out of an otherwise useless application.

// So, this means splitting off the routes for authentication into a separate file, so we can have a clean distinction between routes for auth and routes for other models being managed by users. This allows our authentication app to be a highly re-usable, modular code base that provides a starting point for any number of future applications!

// Let’s start by making a controllers directory and auth.js file for the functions that handle incoming requests:

