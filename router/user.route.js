const { Router } = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { UserModel } = require(".././model/user.model");

const userController =Router();

// FOR SIGNUP CODE

userController.post('/signup',async(req,res)=>{
    const {email, password}=req.body;
    bcrypt.hash(password,5,async function(err,hash){
        if(err){
            res.send("Something went wrong  Please try again!!");
        }
        const user =new UserModel({
            email,
            password:hash,
            IP:req.ip
        })
        try{
            await user.save();
            res.send({"msg" :"Signup Successfully"});
        }
        catch(err){
            console.log(err);
            console.log({"msg":"Try again after sometime"});
        }
    })
})

// Login


userController.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user = await UserModel.findOne({email});
    const hashed_password= user.password;

    bcrypt.compared(password,hashed_password,function(err,result){
        if(err){
            res.send("Something went wrong Please try again")
        }
        if(result){
            const token = jwt.sign({
                userId:user._id
            },process);
            res.send({"msg":"Login successful",token:token});
        }
        else{
            res.send({"msg":"Invalid credentials please login again"})
        }
    })
})


module.exports= {userController};