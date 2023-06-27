const express = require("express");
const router = express.Router(); //app.use ka path then ye apna path add krega(router.use) (app.get keval jo likha hi wo path consider krta)

const { body, validationResult } = require('express-validator');
const user = require("../models/userSchema");

var jwt = require("jsonwebtoken");
var JWT_SECRET = "my name is amaan";

//bcrypt encryption
const bcrypt = require("bcrypt");
// const { json } = require("body-parser");/
const saltRounds = 10; //how many times u want to add some random numbers in hashed password''

//  CREATE NEW USER.........................................................

router.post("/createuser",
  [
    body("email", "Enter Valid E-mail ").isEmail(),
    body("name", "Too small name").isLength({ min: 3 }),
    body("password", "Too small Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      //->validator
      return res.status(400).json({success, errors: result.array() });
    }

    try {
      const founded = await user.findOne({ email: req.body.email });
      if (founded) {
        return res.status(400).json({success,error: "Sorry a user with this email already exists" });
      }

      //bcrypt initialization
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt); // different from angela (short)
      const smallLetterEmail=req.body.email.toString().toLowerCase();
      console.log(smallLetterEmail)
      const newUser=await user.create({
        name: req.body.name,
        email: smallLetterEmail,
        password: hash,
      });

      //  res.json(user);/
      
      //jwt code
      const data = {
        newUser: {
          id: newUser.id, //id is unique in db ,document retrieval will be fast so we will send that   ..
        },
      };
     
      
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      success=true
      res.json({ success,authtoken }); //client ko token bhejdo  .. now if kabhi bhi ye same token user wapas dega (login time), toh usse id mil jaegi aur direct login
      //or res.json({authtoken}) ES6 version
    } catch (e) {
      console.log(e.message);
    }

    // console.log(req.body)
    // res.send(req.body)
    // const user1=new user(req.body)
    // user1.save()
  }
);

//login a user


router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(), // no blank password
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;
  try {
    const foundedUser = await user.findOne({ email });
    if (!foundedUser) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    
    const passwordCompare = await bcrypt.compare(password,foundedUser.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    
    const data = {
      foundedUser: {
        id: foundedUser.id          ///here eroor was happening   isleye id undefined thi
              // .id will give id but ._id will give newObject_{id}  so use .id only
        // or id:foundedUser.id
      }
      
    };
    
    
    const authtoken = jwt.sign(data, JWT_SECRET); // Make sure to set a secure JWT_SECRET variable
    success = true;
    const t=res.json({ success,authtoken });
    // console.log(t)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// // //GET  USER DETAILS FROM JWT TOKEN   . logged in user ki detail dega.. jab login hoga toh ek token create hoga.. us yokin ko use krke hum data get krege .................................................................

const fetchDataMiddleWare=require('../middlewares/fetchdataMiddleware')  //import middleware to use it, so that to avoid complexity  
router.get('/getuser', fetchDataMiddleWare,  async (req, res) => {

  try { 
    userId = req.user.id;  //id middleware ne dedi from jwt payload data
    const fuser = await user.findById(userId).select("-password")   // now corresponding to this id we are finding data in database (and wanted to take all data except password)
    console.log(userId)
    res.send(fuser)     //once find send it in browser               // except password we want to get all attributes
  } catch (error) {
    console.error(error.message);      
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router;
