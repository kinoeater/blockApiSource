const express = require("express");
const User = require("../models/users.model");
const config =  require("../config")
const jwt=require("jsonwebtoken");
const middlewareAuthCheck = require("../middlewareAuthCheck");
const {getUser,deleteUser,updatePassword, registerUser,loginUser,getAllUsers} = require("../controllers/usersController")


const router = express.Router();


router.get("/:username",middlewareAuthCheck.checkToken,getUser);
router.post("/login",loginUser);
router.post("/register",registerUser);
router.patch("/update/:username",middlewareAuthCheck.checkToken,updatePassword);
router.delete("/delete/:username",middlewareAuthCheck.checkToken,deleteUser,loginUser);
router.delete("/getallusers",middlewareAuthCheck.checkToken,deleteUser,getAllUsers);

// router.route("/queryusers").get(middleware.checkToken,(req,res) => {
//     User.find({},(err,result)=>{
      
//         var userMap = {};

//     users.forEach(function(user) {
//       userMap[user._id] = user;
//     });

//     res.send(userMap);
        
//     })
// })




module.exports = router;