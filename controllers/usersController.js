const express = require("express");
const User = require("../models/users.model");
const config =  require("../config")
const jwt=require("jsonwebtoken");


const getUser = (req,res,next) => {
    User.findOne({username: req.params.username},(err,result)=>{
        if(err) res.status(500).json({msg:err});
        res.status(200).json({
            data: result[1],
            username: req.params.username,
            msg: "get user operation",
        })
    })    
}

const getAllUsers = (req,res,next) => {
    User.find({},(err,result)=>{
        if(err) res.status(500).json({msg:err});
        res.status(200).json({
            data: res,
            msg: "get all users operation",
        })
    })    
}

const deleteUser = (req,res,next) => {
    User.findOneAndDelete(
        {username: req.params.username },
        (err,result) => {
            if (err) return res.status(500).json({msg: err});
            const msg = {
                msg: "User Deleted",
                username: req.params.username
            };
            return res.status(200).json(msg);
        }
    );
}

const updatePassword = (req,res,next) =>  {
    User.findOneAndUpdate(
        {username: req.params.username },
        { $set: { password: req.body.password}},
        (err,result) => {
            if (err) return res.status(500).json({msg: err});
            const msg = {
                msg: "password successfully updated",
                username: req.params.username
            };
            return res.status(200).json(msg);
        }
    );
}

const registerUser = (req,res,next) => {
    console.log("inside the register");

    const user = new User ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    user
        .save()
        .then(()=> {
            console.log("user registered");
            res.status(200).json("ok");
        })
        .catch((err) => {
            res.status(403).json({msg: err});
        });
        
}

const loginUser = (req,res,next) => {
    
    User.findOne({username: req.body.username},(err,result)=>{
        if(err) return res.status(500).json({msg:err});
       if(result === null) {
           return res.status(403).json("Username is incorrect")
       }
       if(result.password===req.body.password) {
        // adding JWT token  
         let token = jwt.sign({username:req.body.username},config.key,{
             expiresIn: "24h", // expires in 24 hours
         })
        res.status(200).json({
            token: token,
            msg: "success",

        });
       }
       else {
           return res.status(403).json("password is incorrect");
       }
    })

}
module.exports = {
    getUser,deleteUser,updatePassword,registerUser,loginUser,getAllUsers
}