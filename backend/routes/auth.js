const express=require('express')
const User=require("../models/User.js")
const router =express.Router()
const bcrypt = require('bcrypt');
const fetchUser=require("../middleware/fetchUser")

router.use(express.json());

var jwt = require('jsonwebtoken');
const JWT_SECRET="MySecret"



const{body,validationResult}=require('express-validator');





//ROUTE1:Create a User using: POST "/api/auth/createUser"  Doesnot require Auth
router.post('/createuser', [
   body('name', 'Enter a valid name').isLength({ min: 3}),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
 ], async (req, res) => {
   // If there are errors, return Bad request and the errors
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   try {
     // Check whether the user with this email exists already
          let user = await User.findOne({ email: req.body.email });
          if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
          }
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password, salt);
      
          // Create a new user
          user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
          });
          const data = {
            user: {
              id: user._id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
      
          // res.json(authtoken) returning our authoken
     res.json({ authtoken })
 
   }
  catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
   }
 })





 // ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', 

[
   body('email',"Enter a valid email").isEmail(),
   body('password', "Password cannot be blank").exists()
],

async (req,res)=>{


   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {email,password}=req.body;

   try{
      let user=await User.findOne({email:req.body.email})
      if(!user){
        return res.status(400).json({error:"Please try to login using correct credentials"})
      }

      const passwordCompare=bcrypt.compareSync(password,user.password)
      if(!passwordCompare){
        return res.status(400).json({error:"Please try to login using correct credentials"})
      }

      const data = {
        user: {
          id: user._id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken })
   }
   catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
   }
 
})



//ROUTE3:Get logged  in User Details using: POST"/api/auth/getUser" Login required
router.post('/getUser', fetchUser,
async (req,res)=>{
        try {
            let userId=req.user.id
            const user=await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
  }
})




module.exports=router
