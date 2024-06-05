const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');

// You probably noticed a new port variable we’re defining and using in the app.listen statement. This will come in handy when we’re deploying our applications and cannot know in advance which port the hosting service will use.
// Set the port from environment variable or default to 3000
const port = process.env.PORT || "3000";
// const port = process.env.PORT ? process.env.PORT : "3000"; // if theres something there already at the port use that, if not use port 3000
// above is a ternary stating the same as below:
// let port;
// if (process.env.PORT) {
//     port = process.env.PORT;
//   } else {
//     port = 3000;
//   }

const authController = require("./controllers/auth.js");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
// new
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


app.get("/", (req, res) => {
    res.render("index.ejs", { user: req.session.user });
  });

app.get('/vip-lounge', (req, res) =>{
  if(req.session.user){
    res.send(`welcome to the party ${req.session.user.username}`)
  } else{
    res.send('sorry! no guests allowed')
  }
});
















  
// To do this, add the following line in server.js, just below where we’ve defined our home page route:
app.use("/auth", authController);



















app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
