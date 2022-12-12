

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id:{type:Number},
    email:{type:String, required:true},
    password:{type:String, required:true},
    IP:{type:String}
});


const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}